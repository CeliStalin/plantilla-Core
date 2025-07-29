# DatePicker - Uso Externo

## Instalación

```bash
npm install @consalud/core
```

## Importación

```tsx
// Forma 1: Importación directa (recomendada)
import { DatePicker } from '@consalud/core';

// Forma 2: Importación con alias
import * as ConsaludCore from '@consalud/core';
// Luego usar: <ConsaludCore.DatePicker />

// Forma 3: Importación específica
import { DatePicker, DatePickerProps } from '@consalud/core';
```

## Uso Básico

```tsx
import React, { useState } from 'react';
import { DatePicker } from '@consalud/core';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      label="Fecha de nacimiento"
      placeholder="Seleccionar fecha"
    />
  );
}
```

### Uso con Alias (como en tu caso)

```tsx
import React, { useState } from 'react';
import * as ConsaludCore from '@consalud/core';

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <ConsaludCore.DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      label="Fecha de nacimiento"
      placeholder="Seleccionar fecha"
    />
  );
}
```

## Props Disponibles

| Prop | Tipo | Por defecto | Descripción |
|------|------|-------------|-------------|
| `value` | `Date \| null` | `undefined` | Fecha seleccionada (puede ser null para indicar sin selección) |
| `onChange` | `(date: Date \| null) => void` | `undefined` | Callback cuando se selecciona una fecha (recibe null si se limpia) |
| `placeholder` | `string` | `'Seleccionar fecha'` | Texto placeholder del input |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `disabled` | `boolean` | `false` | Deshabilita el componente |
| `className` | `string` | `''` | Clases CSS adicionales |
| `minDate` | `Date` | `undefined` | Fecha mínima permitida |
| `maxDate` | `Date` | `undefined` | Fecha máxima permitida |
| `error` | `boolean` | `false` | Indica si el campo tiene un error de validación |

## Características

### 🗓️ **Navegación Completa**
- **Vista de días**: Navegación por meses
- **Vista de meses**: Selección rápida de mes
- **Vista de años**: Navegación por rangos de 9 años (1900 - año actual)

### 📅 **Ordenamiento de Años**
- **Orden**: Del año actual hacia atrás (más reciente → más antiguo)
- **Ejemplo**: 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016

### 🎨 **Diseño**
- **Tema**: Consistente con el sistema de diseño Core
- **Responsive**: Adaptable a diferentes tamaños de pantalla
- **Modo oscuro**: Soporte automático para temas oscuros

## Ejemplos de Uso

### DatePicker Básico
```tsx
<DatePicker 
  label="Fecha"
  onChange={(date) => console.log('Fecha seleccionada:', date)}
/>
```

### Con Valor Inicial
```tsx
<DatePicker 
  label="Fecha de nacimiento"
  value={new Date('1990-01-01')}
  onChange={(date) => console.log('Fecha seleccionada:', date)}
/>
```

### Con Estado Null
```tsx
<DatePicker 
  label="Fecha opcional"
  value={null}
  onChange={(date) => console.log('Fecha seleccionada:', date)}
/>
```

### Con Rango de Fechas
```tsx
<DatePicker 
  label="Fecha de reserva"
  minDate={new Date()}
  maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
  onChange={(date) => console.log('Fecha seleccionada:', date)}
/>
```

### Deshabilitado
```tsx
<DatePicker 
  label="Fecha deshabilitada"
  disabled={true}
  value={new Date()}
  onChange={(date) => console.log('Fecha seleccionada:', date)}
/>
```

### Con Estado de Error
```tsx
<DatePicker 
  label="Fecha de nacimiento"
  value={selectedDate}
  onChange={setSelectedDate}
  error={!!errors.fechaNacimiento}
/>
```

### Con Error y Mensaje Personalizado
```tsx
<div>
  <DatePicker 
    label="Fecha de nacimiento"
    value={selectedDate}
    onChange={setSelectedDate}
    error={!!errors.fechaNacimiento}
  />
  {errors.fechaNacimiento && (
    <div className="datepicker-error-message">
      {errors.fechaNacimiento.message}
    </div>
  )}
</div>
```

## Navegación

### Vista de Días
- Usa las flechas para navegar entre meses
- Haz clic en el header para abrir la vista de meses

### Vista de Meses
- Selecciona cualquier mes para navegar rápidamente
- Haz clic en el año para abrir la vista de años

### Vista de Años
- **Flecha derecha (›)**: Años más recientes
- **Flecha izquierda (‹)**: Años más antiguos
- **Rango**: Desde 1900 hasta el año actual
- **Visualización**: 9 años por vista en grid 3x3

## Estilos CSS

El componente incluye sus propios estilos. Si necesitas personalizar:

```css
/* Personalizar colores */
.datepicker-container {
  --datepicker-primary-color: #04A59B;
  --datepicker-border-color: #e5e7eb;
  --datepicker-text-color: #374151;
}

/* Personalizar tamaños */
.datepicker-dropdown {
  --datepicker-width: 280px;
  --datepicker-border-radius: 8px;
}
```

## Accesibilidad

- ✅ Navegación por teclado
- ✅ ARIA labels apropiados
- ✅ Focus management
- ✅ Screen reader friendly
- ✅ Indicadores visuales para estados

## Compatibilidad

- React 18+
- TypeScript 4.0+
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

## Dependencias

El componente no requiere dependencias adicionales más allá de React y las que ya están incluidas en `@consalud/core`. 