# Troubleshooting del DatePicker

## Problemas Comunes y Soluciones

### 1. Error: "Property 'DatePicker' does not exist"

**Síntoma:**
```typescript
Property 'DatePicker' does not exist on type 'typeof import("@consalud/core")'
```

**Solución:**
1. **Reconstruir la librería:**
   ```bash
   npm run build
   ```

2. **Reinstalar en tu app externa:**
   ```bash
   npm uninstall @consalud/core
   npm install @consalud/core
   ```

3. **Verificar importación:**
   ```tsx
   // ✅ Correcto
   import { DatePicker } from '@consalud/core';
   
   // ✅ También correcto
   import * as ConsaludCore from '@consalud/core';
   <ConsaludCore.DatePicker />
   ```

### 2. Error: "Type 'Date | null' is not assignable to type 'Date | undefined'"

**Síntoma:**
```typescript
Type 'Date | null' is not assignable to type 'Date | undefined'
```

**Solución:**
- ✅ **RESUELTO**: Los tipos ya están estandarizados para usar `Date | null`
- Usar `Date | null` en tu aplicación:
  ```tsx
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  ```

### 3. Error: "Property 'error' does not exist"

**Síntoma:**
```typescript
Property 'error' does not exist on type 'DatePickerProps'
```

**Solución:**
- ✅ **RESUELTO**: La prop `error` ya está disponible
- Usar directamente:
  ```tsx
  <DatePicker
    error={!!errors.fechaNacimiento}
    // ... otras props
  />
  ```

### 4. **NUEVO**: DatePicker se ve desbordado o sin estilos

**Síntoma:**
- El DatePicker aparece sin estilos
- Los días se muestran en una línea continua
- El calendario no tiene formato de grid

**Solución:**

#### **Opción 1: Importar estilos manualmente (Recomendado)**
```tsx
// En tu archivo principal (App.tsx o index.tsx)
import '@consalud/core/index.css';
```

#### **Opción 2: Importar estilos específicos del DatePicker**
```tsx
// Si solo necesitas los estilos del DatePicker
import '@consalud/core/dist/src/core/components/DatePicker/DatePicker.styles.css';
```

#### **Opción 3: Verificar que los estilos se cargan**
```tsx
// En tu componente
import { DatePicker } from '@consalud/core';
import '@consalud/core/index.css'; // Asegúrate de que esta línea esté presente

function MyComponent() {
  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      label="Fecha de nacimiento"
    />
  );
}
```

#### **Opción 4: Usar estilos inline como fallback**
```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  label="Fecha de nacimiento"
  className="custom-datepicker"
  style={{
    '--datepicker-width': '280px',
    '--datepicker-border-radius': '8px'
  } as React.CSSProperties}
/>
```

### 5. Verificación de Instalación

**Comandos para verificar:**
```bash
# 1. Verificar que la librería está instalada
npm list @consalud/core

# 2. Verificar archivos de distribución
ls node_modules/@consalud/core/dist/

# 3. Verificar que los estilos existen
ls node_modules/@consalud/core/dist/index.css
ls node_modules/@consalud/core/dist/src/core/components/DatePicker/

# 4. Limpiar cache si es necesario
npm cache clean --force
rm -rf node_modules
npm install
```

### 6. Configuración de TypeScript

**tsconfig.json recomendado:**
```json
{
  "compilerOptions": {
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node"
  }
}
```

### 7. Configuración de Vite/Webpack

**vite.config.ts:**
```ts
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['@consalud/core']
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "@consalud/core/index.css";`
      }
    }
  }
});
```

**webpack.config.js:**
```js
module.exports = {
  resolve: {
    alias: {
      '@consalud/core': path.resolve(__dirname, 'node_modules/@consalud/core')
    }
  }
};
```

## Pasos de Verificación Rápida

1. **✅ Verificar importación:**
   ```tsx
   import { DatePicker } from '@consalud/core';
   ```

2. **✅ Verificar estilos:**
   ```tsx
   import '@consalud/core/index.css';
   ```

3. **✅ Verificar tipos:**
   ```tsx
   const [date, setDate] = useState<Date | null>(null);
   ```

4. **✅ Verificar uso:**
   ```tsx
   <DatePicker
     value={date}
     onChange={setDate}
     error={!!errors.date}
   />
   ```

## Contacto y Soporte

Si los problemas persisten:
1. Verificar la versión de `@consalud/core`
2. Revisar la consola del navegador para errores
3. Verificar que todas las dependencias estén actualizadas 