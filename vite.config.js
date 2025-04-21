import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // Define explicitamente o diretório raiz
  publicDir: 'public', // Define explicitamente o diretório público
  base: '/calculadora-investimentos/', // Nome do seu repositório no GitHub
  server: {
    port: 3002,
    host: '0.0.0.0', // Configuração mais explícita para permitir acesso externo
    open: true,      // Abre o navegador automaticamente
    strictPort: false // Permite tentar portas alternativas se a 3002 estiver ocupada
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild', // Usando esbuild em vez de terser
    sourcemap: false,
  }
});