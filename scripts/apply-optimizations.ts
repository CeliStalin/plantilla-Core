import { libraryConfig } from '../optimization.config';
import { writeFileSync, readFileSync } from 'fs';
import path from 'path';

// Función para generar .dockerignore basado en la configuración
function generateDockerignore() {
  const patterns = libraryConfig.docker.excludeFromContext;
  const content = patterns.join('\n');
  
  writeFileSync(path.join(__dirname, '..', '.dockerignore'), content);
  console.log('✅ .dockerignore generado correctamente');
}

// Función para actualizar package.json con las dependencias correctas
function updatePackageJson() {
  const pkgPath = path.join(__dirname, '..', 'package.json');
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));

  // Asegurar que peerDependencies exista
  if (!pkg.peerDependencies) pkg.peerDependencies = {};

  // Mover dependencias a peerDependencies según configuración
  libraryConfig.peerDependencies.forEach(dep => {
    const depName = dep.replace(/\/.*$/, ''); // Manejar casos como @types/*
    
    Object.keys(pkg.dependencies || {}).forEach(pkgDep => {
      if (pkgDep === depName || (dep.includes('*') && pkgDep.startsWith(depName))) {
        // Mover de dependencies a peerDependencies
        pkg.peerDependencies[pkgDep] = pkg.dependencies[pkgDep];
        delete pkg.dependencies[pkgDep];
      }
    });
  });

  // Guardar cambios
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log('✅ package.json actualizado según optimización');
}

// Función principal
function applyOptimizations() {
  console.log('🚀 Aplicando optimizaciones de la biblioteca');
  
  generateDockerignore();
  updatePackageJson();
  
  console.log('✅ Todas las optimizaciones aplicadas correctamente');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  applyOptimizations();
}
