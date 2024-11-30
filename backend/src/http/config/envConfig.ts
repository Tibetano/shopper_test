import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(function Config() {
  try {
    // Caminhos dos arquivos .env
    const rootEnvPath = path.resolve(__dirname, '../../../../.env');
    const backendEnvPath = path.resolve(__dirname, '../../../.env');

    if (!fs.existsSync(rootEnvPath)) {
      console.log("Não achou o rootEnvPath!");
      throw new Error(`Arquivo .env não encontrado na pasta root: ${rootEnvPath}`);
    }

    if (!fs.existsSync(backendEnvPath)) {
      console.log("Não achou o backendEnvPath!");
      throw new Error(`Arquivo .env não encontrado na pasta backend: ${backendEnvPath}`);
    }

    // Leia o conteúdo dos arquivos .env
    const rootEnvContent = fs.readFileSync(rootEnvPath, 'utf-8');
    const backendEnvContent = fs.readFileSync(backendEnvPath, 'utf-8');

    // Função para transformar o conteúdo do arquivo .env em um objeto { chave: valor }
    const parseEnv = (content: string) =>
      content
        .split('\n')
        .filter((line) => line.trim() && !line.startsWith('#')) // Ignorar linhas vazias e comentários
        .reduce((acc, line) => {
          const [key, ...value] = line.split('=');
          acc[key.trim()] = value.join('=').trim(); // Suporta valores com '='
          return acc;
        }, {} as Record<string, string>);

    const rootEnv = parseEnv(rootEnvContent);
    const backendEnv = parseEnv(backendEnvContent);

    // Variáveis que precisam ser atualizadas ou adicionadas
    const updates: string[] = [];
    const updatesLog: string[] = []; // Para log no console

    // Verificar cada variável do rootEnv
    for (const [key, value] of Object.entries(rootEnv)) {
      if (!(key in backendEnv)) {
        // Variável está ausente no backend .env
        updates.push(`${key}=${value}`);
        updatesLog.push(`Adicionada: ${key}`);
      } else if (backendEnv[key] !== value) {
        // Variável existe, mas o valor está desatualizado
        updates.push(`${key}=${value}`);
        updatesLog.push(`Atualizada: ${key} (de "${backendEnv[key]}" para "${value}")`);
      }
    }

    if (updates.length === 0) {
      console.log("Todas as variáveis do root já estão presentes e atualizadas no backend. Nenhuma mesclagem necessária.");
      return;
    }

    console.log("Alterações realizadas:");
    updatesLog.forEach((log) => console.log(`- ${log}`));

    // Atualizar o backend .env com as alterações
    const mergedEnvContent = backendEnvContent
      .split('\n')
      .filter((line) => line.trim() && !updates.some((update) => line.startsWith(update.split('=')[0] + '=')))
      .concat(updates)
      .join('\n');

    fs.writeFileSync(backendEnvPath, mergedEnvContent, 'utf-8');

    console.log(`Os arquivos .env foram atualizados com sucesso!`);
  } catch (error) {
    console.error(`Erro ao mesclar arquivos .env: ${error.message}`);
  }
})();
