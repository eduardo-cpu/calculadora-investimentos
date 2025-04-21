# Calculadora de Investimentos

Este projeto é uma calculadora de investimentos desenvolvida em React, utilizando Tailwind CSS para estilização. O objetivo é permitir que os usuários insiram um valor de investimento, um período de tempo e uma taxa de juros, e visualizem o crescimento do investimento ao longo do tempo, juntamente com o impacto da inflação.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

- **public/**: Contém arquivos públicos, incluindo o ícone do site e o HTML principal.
- **src/**: Contém todos os componentes React, hooks personalizados, serviços e utilitários.
  - **components/**: Componentes divididos em subpastas para melhor organização.
    - **Calculator/**: Componentes relacionados à lógica da calculadora.
    - **Charts/**: Componentes para exibir gráficos.
    - **Layout/**: Componentes para o layout geral da aplicação.
    - **UI/**: Componentes reutilizáveis de interface do usuário.
  - **hooks/**: Contém hooks personalizados para lógica de cálculo.
  - **services/**: Funções para manipulação de dados de inflação.
  - **utils/**: Funções utilitárias para cálculos e formatação.
- **.eslintrc.json**: Configurações do ESLint.
- **.gitignore**: Arquivos e pastas a serem ignorados pelo Git.
- **package.json**: Dependências e scripts do projeto.
- **postcss.config.js**: Configuração do PostCSS.
- **tailwind.config.js**: Configuração do Tailwind CSS.
- **vite.config.js**: Configuração do Vite.

## Funcionalidades

- **Cálculo de Investimentos**: Permite ao usuário inserir um valor, tempo e taxa de juros para calcular o valor final do investimento.
- **Gráficos**: Exibe gráficos que mostram o crescimento do investimento, a inflação ao longo dos anos e a divisão entre o valor investido e os juros ganhos.
- **Impacto da Inflação**: Calcula e exibe como a inflação pode afetar o valor futuro do investimento.

## Como Executar

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd calculadora-investimentos
   ```
3. Instale as dependências:
   ```
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
5. Acesse a aplicação em `http://localhost:3001` (ou a porta indicada no terminal quando o servidor iniciar).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.