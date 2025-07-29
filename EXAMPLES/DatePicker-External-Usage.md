# Ejemplo de Uso Externo del DatePicker

## Instalación

```bash
# En tu aplicación externa
npm install @consalud/core
```

## Ejemplo Completo

```tsx
// App.tsx
import React, { useState } from 'react';
import { DatePicker } from '@consalud/core';
import '@consalud/core/index.css'; // Importar estilos

function App() {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [reservationDate, setReservationDate] = useState<Date | null>(null);
  const [appointmentDate, setAppointmentDate] = useState<Date | null>(null);

  const handleBirthDateChange = (date: Date | null) => {
    setBirthDate(date);
    console.log('Fecha de nacimiento seleccionada:', date?.toLocaleDateString('es-ES') || 'Sin fecha');
  };

  const handleReservationChange = (date: Date | null) => {
    setReservationDate(date);
    console.log('Fecha de reserva seleccionada:', date?.toLocaleDateString('es-ES') || 'Sin fecha');
  };

  const handleAppointmentChange = (date: Date | null) => {
    setAppointmentDate(date);
    console.log('Fecha de cita seleccionada:', date?.toLocaleDateString('es-ES') || 'Sin fecha');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Ejemplo de DatePicker</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          label="Fecha de Nacimiento"
          value={birthDate}
          onChange={handleBirthDateChange}
          placeholder="Selecciona tu fecha de nacimiento"
        />
        {birthDate && (
          <p>Fecha seleccionada: {birthDate.toLocaleDateString('es-ES')}</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          label="Fecha de Reserva"
          value={reservationDate}
          onChange={handleReservationChange}
          minDate={new Date()} // Solo fechas futuras
          maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)} // Máximo 1 año
          placeholder="Selecciona fecha de reserva"
        />
        {reservationDate && (
          <p>Fecha de reserva: {reservationDate.toLocaleDateString('es-ES')}</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          label="Fecha de Cita"
          value={appointmentDate}
          onChange={handleAppointmentChange}
          disabled={false}
          className="custom-datepicker"
        />
        {appointmentDate && (
          <p>Fecha de cita: {appointmentDate.toLocaleDateString('es-ES')}</p>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>Características del DatePicker:</h3>
        <ul>
          <li>✅ Navegación por días, meses y años</li>
          <li>✅ Rango de años desde 1900 hasta el actual</li>
          <li>✅ Ordenamiento del más reciente al más antiguo</li>
          <li>✅ Validación de fechas mínimas y máximas</li>
          <li>✅ Soporte para modo oscuro</li>
          <li>✅ Totalmente accesible</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
```

## Estilos Personalizados

```css
/* styles.css */
.custom-datepicker {
  --datepicker-primary-color: #007bff;
  --datepicker-border-color: #dee2e6;
  --datepicker-text-color: #495057;
}

.custom-datepicker .datepicker-input {
  border-radius: 12px;
  border: 2px solid var(--datepicker-border-color);
  transition: all 0.3s ease;
}

.custom-datepicker .datepicker-input:focus {
  border-color: var(--datepicker-primary-color);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.custom-datepicker .datepicker-dropdown {
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

## TypeScript

```tsx
// types.ts
import { DatePickerProps } from '@consalud/core';

interface FormData {
  birthDate: Date | null;
  reservationDate: Date | null;
  appointmentDate: Date | null;
}

// Uso con tipos
const DatePickerWithTypes: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    birthDate: null,
    reservationDate: null,
    appointmentDate: null
  });

  const handleDateChange = (field: keyof FormData) => (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: date
    }));
  };

  return (
    <div>
      <DatePicker
        label="Fecha de Nacimiento"
        value={formData.birthDate}
        onChange={handleDateChange('birthDate')}
      />
      
      <DatePicker
        label="Fecha de Reserva"
        value={formData.reservationDate}
        onChange={handleDateChange('reservationDate')}
        minDate={new Date()}
      />
    </div>
  );
};
```

## Integración con Formularios

```tsx
// FormExample.tsx
import React from 'react';
import { DatePicker } from '@consalud/core';
import { useForm, Controller } from 'react-hook-form';

interface FormInputs {
  birthDate: Date | null;
  appointmentDate: Date | null;
}

const FormExample: React.FC = () => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();

  const onSubmit = (data: FormInputs) => {
    console.log('Datos del formulario:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="birthDate"
        control={control}
        rules={{ required: 'La fecha de nacimiento es requerida' }}
        render={({ field, fieldState }) => (
          <div>
            <DatePicker
              label="Fecha de Nacimiento"
              value={field.value}
              onChange={field.onChange}
              placeholder="Selecciona tu fecha de nacimiento"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <div className="datepicker-error-message">
                {fieldState.error.message}
              </div>
            )}
          </div>
        )}
      />

      <Controller
        name="appointmentDate"
        control={control}
        rules={{ required: 'La fecha de cita es requerida' }}
        render={({ field, fieldState }) => (
          <div>
            <DatePicker
              label="Fecha de Cita"
              value={field.value}
              onChange={field.onChange}
              minDate={new Date()}
              placeholder="Selecciona fecha de cita"
              error={!!fieldState.error}
            />
            {fieldState.error && (
              <div className="datepicker-error-message">
                {fieldState.error.message}
              </div>
            )}
          </div>
        )}
      />

      <button type="submit">Enviar Formulario</button>
    </form>
  );
};
```