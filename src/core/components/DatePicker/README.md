# DatePicker Component

Un componente de selección de fechas interactivo con calendario desplegable, diseñado para integrarse perfectamente con el sistema de diseño Core.

## Características

- 🗓️ **Calendario interactivo** con navegación por meses
- 📅 **Navegación rápida** por mes y año para búsqueda eficiente
- 🎨 **Diseño consistente** con el tema del proyecto
- 📱 **Responsive** y accesible
- 🌙 **Soporte para modo oscuro**
- ⚡ **Fácil de usar** con API intuitiva
- 🔒 **Validación de fechas** con rangos personalizables
- 🚀 **Formato de fecha limpio** sin palabras innecesarias
- 📊 **Navegación por rangos** de 12 años con botones de navegación

## Uso Básico

```tsx
import DatePicker from '@/core/components/DatePicker';

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

## Props

| Prop | Tipo | Por defecto | Descripción |
|------|------|-------------|-------------|
| `value` | `Date` | `undefined` | Fecha seleccionada |
| `onChange` | `(date: Date) => void` | `undefined` | Callback cuando se selecciona una fecha |
| `placeholder` | `string` | `'Seleccionar fecha'` | Texto placeholder del input |
| `label` | `string` | `undefined` | Etiqueta del campo |
| `disabled` | `boolean` | `false` | Deshabilita el componente |
| `className` | `string` | `''` | Clases CSS adicionales |
| `minDate` | `Date` | `undefined` | Fecha mínima permitida |
| `maxDate` | `Date` | `undefined` | Fecha máxima permitida |

## Funcionalidades de Navegación

### Navegación por Mes
- Haz clic en el mes/año en el header para abrir la vista de meses
- Selecciona cualquier mes para navegar rápidamente
- Usa las flechas para navegar entre años

### Navegación por Año
- Desde la vista de meses, haz clic en el año para abrir la vista de años
- Selecciona cualquier año para navegar rápidamente
- Navega entre rangos de años usando las flechas (9 años por vista)
- Navegación completa: Desde 1900 hasta el año actual
- Indicadores visuales: Las flechas se deshabilitan en los límites del rango

### Navegación por Día
- Vista principal del calendario
- Navega entre meses usando las flechas
- Selecciona cualquier día disponible

## Ejemplos

### DatePicker Básico
```tsx
<DatePicker 
  label="Fecha"
  onChange={(date) => console.log(date)}
/>
```

### Con Valor Inicial
```tsx
<DatePicker 
  label="Fecha de nacimiento"
  value={new Date('1990-01-01')}
  onChange={(date) => console.log(date)}
/>
```

### Con Rango de Fechas
```tsx
<DatePicker 
  label="Fecha de reserva"
  minDate={new Date()}
  maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
  onChange={(date) => console.log(date)}
/>
```

### Deshabilitado
```tsx
<DatePicker 
  label="Fecha deshabilitada"
  disabled={true}
  value={new Date()}
  onChange={(date) => console.log(date)}
/>
```

## Formato de Fecha

El componente muestra las fechas en formato español sin la palabra "DE":
- **Antes**: "12 de marzo de 2022"
- **Ahora**: "12/03/2022"

## Estilos

El componente utiliza CSS modules y sigue las convenciones de diseño del proyecto:

- **Colores primarios**: `#04A59B`
- **Bordes**: `2px solid #e5e7eb` (normal), `2px solid #04A59B` (focus)
- **Sombras**: `0 10px 25px rgba(0, 0, 0, 0.15)` (dropdown)
- **Transiciones**: `all 0.2s ease-in-out`

### Vistas de Navegación

- **Vista de Meses**: Grid de 3x4 meses
- **Vista de Años**: Grid de 3x3 años (9 años por vista)
- **Vista de Calendario**: Vista tradicional de días

## Accesibilidad

- Soporte completo para navegación por teclado
- ARIA labels apropiados
- Focus management
- Screen reader friendly
- Navegación intuitiva entre vistas

## Compatibilidad

- React 16.8+
- TypeScript 4.0+
- Navegadores modernos (Chrome, Firefox, Safari, Edge)

## Contribución

Para contribuir al componente:

1. Asegúrate de seguir las convenciones de código del proyecto
2. Añade tests para nuevas funcionalidades
3. Actualiza la documentación según sea necesario
4. Verifica la accesibilidad y responsividad 