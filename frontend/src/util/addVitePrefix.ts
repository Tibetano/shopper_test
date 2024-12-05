import fs from 'fs';
import path from 'path';

const __dirname: string = path.resolve();
const envPath: string = path.join(__dirname, '.env');

(function addVitePrefix() {

    const envContent: string = fs.readFileSync(envPath, 'utf8');

    const updatedEnvContent: string = envContent
    .split('\n')
    .map((line: string) => {
        if (line.trim() === '' || line.startsWith('#')) {
        return line;
        }
        const [key, ...rest]: string[] = line.split('=');
        const newKey: string = key.startsWith('VITE_') ? key : `VITE_${key}`;
        return `${newKey}=${rest.join('=')}`;
    })
    .join('\n');

    fs.writeFileSync(envPath, updatedEnvContent, 'utf8');
    console.log('Prefixo VITE_ adicionado com sucesso às variáveis do .env!');

})();

