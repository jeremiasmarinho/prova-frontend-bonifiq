📦 Widget Bonifiq

Widget em React + TypeScript que roda dentro de um iFrame.
Ele consome a API pública JSONPlaceholder
para exibir informações de um usuário e seus posts.
A comunicação com a página host é feita via window.postMessage, de onde o widget obtém o window.loggedUserId.

🚀 Funcionalidades

Lê o userId do host via postMessage.

Busca os dados do usuário em:

https://jsonplaceholder.typicode.com/users/:id

Busca os posts do usuário em:

https://jsonplaceholder.typicode.com/posts?userId=:id

Exibe:

Nome e email do usuário.

Lista de posts (título + corpo).

Possui botão flutuante para abrir/fechar o widget.

Responsivo (limite fixo 320x600px, compatível com desktop e mobile).

Testes cobrindo cenários:

✅ Sucesso (usuário e posts carregados).

❌ Erro (falha nas requisições).

⚠️ Sem userId (instrução exibida).

🛠️ Tecnologias

React 19

TypeScript

Vite

TailwindCSS

Vitest

Testing Library

📂 Estrutura de Pastas
src/
├── components/ # Componentes reutilizáveis
│ ├── CloseButton.tsx
│ ├── ErrorAlert.tsx
│ ├── Loader.tsx
│ ├── PostsList.tsx
│ └── UserInfo.tsx
│
├── constants/ # Valores fixos da aplicação
│ └── index.ts
│
├── hooks/ # Hooks customizados
│ └── useUserId.ts
│
├── services/ # Serviços externos (API)
│ └── api.ts
│
├── test/ # Testes unitários
│ ├── App.error.test.tsx
│ ├── App.noUserId.test.tsx
│ ├── App.success.test.tsx
│ ├── helpers.ts
│ └── setup.ts
│
├── App.tsx # Composição principal do widget
├── App.css
├── index.css
├── main.tsx
├── types.ts # Tipos (User, Post)
└── vite-env.d.ts

⚡ Como rodar o projeto
Instalar dependências
npm install

Rodar localmente
npm run dev

Acesse em: http://localhost:5173

Rodar testes
npm run test

🔗 Uso no Host
Local

Na página host, adicione o script widget.js com a URL local da app:

<script src="./widget.js" data-app-url="http://localhost:5173"></script>
<script>
  // Exemplo: ID fornecido pelo host
  window.loggedUserId = 1;
</script>

Produção (via CDN ou build)

Após rodar o build:

npm run build

Será gerada a pasta dist/ com os arquivos finais.
Você pode publicar em um servidor ou em uma CDN (como Vercel, Netlify ou AWS S3).

Exemplo de uso em produção:

<!-- URL final do script publicado (exemplo via CDN ou servidor próprio) -->
<script src="https://meu-cdn.com/widget-bonifiq/widget.js" data-app-url="https://meu-cdn.com/widget-bonifiq/"></script>
<script>
  // Host define o ID do usuário logado
  window.loggedUserId = 1;
</script>

Esse script cuidará de:

Injetar o botão flutuante.

Criar o iFrame apontando para o widget.

Enviar o loggedUserId automaticamente via postMessage.

🎨 Decisões de Design

O widget tem tamanho fixo (320x600px) para evitar ocupar espaço demais.

Apenas o conteúdo interno (<main>) pode rolar, evitando scroll externo.

Comunicação entre host e widget via postMessage, garantindo compatibilidade entre domínios diferentes.

Arquitetura organizada em components, hooks, services, constants e test para facilitar manutenção e evolução.
