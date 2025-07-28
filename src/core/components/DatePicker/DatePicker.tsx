import React, { useState, useRef, useEffect } from 'react';
import './DatePicker.styles.css';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  label,
  disabled = false,
  className = '',
  minDate,
  maxDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(value || null);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const [viewMode, setViewMode] = useState<'calendar' | 'month' | 'year'>('calendar');
  const [currentYearRange, setCurrentYearRange] = useState(() => {
    const currentYear = new Date().getFullYear();
    // Comenzar desde el año actual, mostrando 9 años hacia atrás
    return Math.max(1900, currentYear - 8);
  });
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Cerrar el datepicker cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setViewMode('calendar');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Actualizar cuando cambia el valor externo
  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      setCurrentMonth(value);
    }
  }, [value]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getMonthName = (date: Date): string => {
    const month = date.toLocaleDateString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const getDaysInMonth = (date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();
    
    const days: Date[] = [];
    
    // Añadir días del mes anterior para completar la primera semana
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }
    
    // Añadir todos los días del mes
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    // Añadir días del mes siguiente para completar la última semana
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === currentMonth.getMonth() &&
           date.getFullYear() === currentMonth.getFullYear();
  };

  const isDisabled = (date: Date): boolean => {
    if (disabled) return true;
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const handleDateSelect = (date: Date) => {
    if (isDisabled(date)) return;
    
    setSelectedDate(date);
    setCurrentDate(date);
    setIsOpen(false);
    setViewMode('calendar');
    onChange?.(date);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    if (viewMode === 'month') {
      setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1));
    } else if (viewMode === 'year') {
      // Navegar hacia años más antiguos (disminuir el rango)
      setCurrentYearRange(prev => Math.max(1900, prev - 9));
    }
  };

  const handleNextYear = () => {
    if (viewMode === 'month') {
      setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1));
    } else if (viewMode === 'year') {
      const currentYear = new Date().getFullYear();
      // Navegar hacia años más recientes (aumentar el rango)
      setCurrentYearRange(prev => {
        const nextRange = prev + 9;
        return nextRange <= currentYear ? nextRange : prev;
      });
    }
  };

  const handleMonthSelect = (month: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1));
    setViewMode('calendar');
  };

  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setViewMode('month');
  };

  const handleInputClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setViewMode('calendar');
      }
    }
  };

  const handleHeaderClick = () => {
    if (viewMode === 'calendar') {
      setViewMode('month');
    } else if (viewMode === 'month') {
      setViewMode('year');
      // Comenzar desde el año actual cuando se abre la vista de años
      const currentYear = new Date().getFullYear();
      setCurrentYearRange(Math.max(1900, currentYear - 8));
    }
  };

  const handleBackClick = () => {
    if (viewMode === 'year') {
      setViewMode('month');
    } else if (viewMode === 'month') {
      setViewMode('calendar');
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Generar 9 años del rango actual (desde currentYearRange hasta currentYearRange + 8)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 9 }, (_, i) => currentYearRange + i).reverse();
  

  const renderCalendarView = () => (
    <>
      <div className="datepicker-weekdays">
        {weekDays.map(day => (
          <div key={day} className="datepicker-weekday">
            {day}
          </div>
        ))}
      </div>
      
      <div className="datepicker-days">
        {days.map((day, index) => (
          <button
            key={index}
            type="button"
            className={`datepicker-day ${
              !isCurrentMonth(day) ? 'datepicker-day-other-month' : ''
            } ${
              selectedDate && isSameDay(day, selectedDate) ? 'datepicker-day-selected' : ''
            } ${
              isDisabled(day) ? 'datepicker-day-disabled' : ''
            }`}
            onClick={() => handleDateSelect(day)}
            disabled={isDisabled(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
    </>
  );

  const renderMonthView = () => (
    <div className="datepicker-months">
      {months.map((month, index) => (
        <button
          key={month}
          type="button"
          className={`datepicker-month ${
            currentMonth.getMonth() === index ? 'datepicker-month-selected' : ''
          }`}
          onClick={() => handleMonthSelect(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );

  const renderYearView = () => (
    <div className="datepicker-years">
      {years.map(year => (
        <button
          key={year}
          type="button"
          className={`datepicker-year ${
            currentMonth.getFullYear() === year ? 'datepicker-year-selected' : ''
          }`}
          onClick={() => handleYearSelect(year)}
        >
          {year}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`datepicker-container ${className}`} ref={datePickerRef}>
      {label && (
        <label className="datepicker-label">
          {label}
        </label>
      )}
      <div className="datepicker-input-container">
        <input
          type="text"
          className="datepicker-input"
          value={selectedDate ? formatDate(selectedDate) : ''}
          placeholder={placeholder}
          readOnly
          disabled={disabled}
          onClick={handleInputClick}
        />
        <button
          type="button"
          className="datepicker-icon"
          onClick={handleInputClick}
          disabled={disabled}
        >
          📅
        </button>
      </div>
      
      {isOpen && (
        <div className="datepicker-dropdown">
          <div className="datepicker-header">
            <button
              type="button"
              className="datepicker-nav-button"
              onClick={viewMode === 'calendar' ? handlePrevMonth : viewMode === 'month' ? handlePrevYear : handlePrevYear}
              disabled={viewMode === 'year' && currentYearRange <= 1900}
            >
              ‹
            </button>
            <button
              type="button"
              className="datepicker-month-year"
              onClick={handleHeaderClick}
            >
              {viewMode === 'calendar' && getMonthName(currentMonth)}
              {viewMode === 'month' && currentMonth.getFullYear()}
              {viewMode === 'year' && `${currentYearRange + 8} - ${currentYearRange}`}
            </button>
            <button
              type="button"
              className="datepicker-nav-button"
              onClick={viewMode === 'calendar' ? handleNextMonth : viewMode === 'month' ? handleNextYear : handleNextYear}
              disabled={viewMode === 'year' && currentYearRange + 8 >= new Date().getFullYear()}
            >
              ›
            </button>
          </div>
          
          {viewMode === 'calendar' && renderCalendarView()}
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'year' && renderYearView()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;