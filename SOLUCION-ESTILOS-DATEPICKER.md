# 🔧 Solución Rápida: DatePicker sin Estilos

## Problema
El DatePicker se muestra desbordado o sin estilos en la aplicación externa.

## ✅ Solución Inmediata

### **Paso 1: Importar estilos en tu aplicación externa**

En tu archivo principal (`App.tsx`, `main.tsx` o `index.tsx`):

```tsx
// Agregar esta línea al inicio del archivo
import '@consalud/core/index.css';
```

### **Paso 2: Verificar que funciona**

```tsx
import React, { useState } from 'react';
import { DatePicker } from '@consalud/core';
import '@consalud/core/index.css'; // ← ESTA LÍNEA ES CRÍTICA

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      label="Fecha de nacimiento"
      placeholder="DD/MM/AAAA"
      maxDate={new Date()}
      disabled={false}
      error={!!errors.fechaNacimiento}
    />
  );
}
```

## 🔍 Verificaciones

### **1. Verificar que los estilos se cargan**
```bash
# En tu aplicación externa
ls node_modules/@consalud/core/dist/index.css
```

### **2. Verificar que el archivo existe**
El archivo debe contener algo como:
```css
/* ================================================
   CONSALUD CORE STYLES
   ================================================ */

/* Importar estilos de componentes */
@import '../components/DatePicker/DatePicker.styles.css';
```

### **3. Verificar en el navegador**
- Abrir DevTools (F12)
- Ir a la pestaña "Network"
- Buscar archivos CSS
- Verificar que `@consalud/core/index.css` se carga

## 🚨 Si aún no funciona

### **Opción A: Importar estilos específicos**
```tsx
import '@consalud/core/dist/src/core/components/DatePicker/DatePicker.styles.css';
```

### **Opción B: Usar estilos inline**
```tsx
<DatePicker
  value={selectedDate}
  onChange={setSelectedDate}
  label="Fecha de nacimiento"
  style={{
    '--datepicker-width': '280px',
    '--datepicker-border-radius': '8px'
  } as React.CSSProperties}
/>
```

### **Opción C: Configurar Vite/Webpack**

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

## 📋 Checklist de Verificación

- [ ] ✅ Importar `@consalud/core/index.css` en el archivo principal
- [ ] ✅ Verificar que el archivo CSS existe en `node_modules`
- [ ] ✅ Verificar que se carga en el navegador (DevTools > Network)
- [ ] ✅ Verificar que no hay errores en la consola
- [ ] ✅ Verificar que el DatePicker tiene el formato correcto

## 🆘 Si nada funciona

1. **Limpiar cache:**
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

2. **Reinstalar la librería:**
   ```bash
   npm uninstall @consalud/core
   npm install @consalud/core
   ```

3. **Verificar versión:**
   ```bash
   npm list @consalud/core
   ```

## 📞 Contacto

Si el problema persiste:
1. Verificar la versión de `@consalud/core` (debe ser 1.0.0 o superior)
2. Revisar la consola del navegador para errores
3. Verificar que todas las dependencias estén actualizadas

---

**Nota:** Los estilos del DatePicker están incluidos en el paquete desde la versión 1.0.0. Asegúrate de tener la versión más reciente. 