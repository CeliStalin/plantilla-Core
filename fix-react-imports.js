const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Encuentra todos los archivos TSX
const files = glob.sync('src/**/*.tsx');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Si el archivo no importa React explícitamente pero usa JSX
  if (!content.includes('import React') && content.includes('<')) {
    // Si ya importa desde react pero no importa React
    if (content.includes('import {') && content.includes('} from "react"')) {
      // Añadir React a una importación existente
      const newContent = content.replace(
        /import \{([^}]*)\} from "react"/,
        'import React, {$1} from "react"'
      );
      fs.writeFileSync(file, newContent);
      console.log(`Added React to existing import in ${file}`);
    } else if (content.includes('import {') && content.includes(`} from 'react'`)) {
      // Versión con comillas simples
      const newContent = content.replace(
        /import \{([^}]*)\} from 'react'/,
        "import React, {$1} from 'react'"
      );
      fs.writeFileSync(file, newContent);
      console.log(`Added React to existing import in ${file}`);
    } else if (content.includes('from "react"') || content.includes(`from 'react'`)) {
      // Otro tipo de importación desde react
      console.log(`Check manually: ${file} has react import but might need React`);
    } else {
      // Añadir importación de React al principio del archivo
      const newContent = `import React from 'react';\n${content}`;
      fs.writeFileSync(file, newContent);
      console.log(`Added React import to ${file}`);
    }
  }
});

console.log('React import check completed!');