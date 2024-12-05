import fs from 'fs';
import path from 'path';


const __dirname = path.resolve(); 
const envPath = path.join(__dirname, '.env');

const envContent = fs.readFileSync(envPath, 'utf8');

const updatedEnvContent = envContent
  .split('\n')
  .map(line => {
    if (line.trim() === '' || line.startsWith('#')) {
      return line;
    }
    const [key, ...rest] = line.split('=');
    const newKey = key.startsWith('VITE_') ? key : `VITE_${key}`;
    return `${newKey}=${rest.join('=')}`;
  })
  .join('\n');

fs.writeFileSync(envPath, updatedEnvContent, 'utf8');
console.log('Prefixo VITE_ adicionado com sucesso às variáveis do .env!');
