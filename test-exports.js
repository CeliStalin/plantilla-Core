// Archivo de prueba para verificar exportaciones
import * as ConsaludCore from './src/core/index.ts';

console.log('Exportaciones disponibles:', Object.keys(ConsaludCore));

// Verificar si DatePicker está disponible
if (ConsaludCore.DatePicker) {
  console.log('✅ DatePicker está disponible');
} else {
  console.log('❌ DatePicker NO está disponible');
}

// Verificar otros componentes
console.log('Button disponible:', !!ConsaludCore.Button);
console.log('Card disponible:', !!ConsaludCore.Card);
console.log('Layout disponible:', !!ConsaludCore.Layout); 