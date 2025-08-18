# 🧪 Prova Prática – Desenvolvedor Front-End

## 🚀 Para começar

O primeiro passo é **criar uma cópia deste repositório na sua conta particular do GitHub**.  
⚠️ **Atenção:** fazer uma cópia é diferente de realizar um **clone** ou um **fork**. Não utilize a opção *Fork*.

### Como criar a cópia do repositório

1. Acesse [https://github.com/new](https://github.com/new) (página de criação de repositório no GitHub).
2. Defina o nome do repositório na sua conta como `prova-frontend-bonifiq`.
3. Escolha se deseja deixar o repositório privado.
4. Após criar o repositório, clone este repositório da prova na sua máquina:
   ```bash
   git clone <url-deste-repositorio>
   ```
5. Entre na pasta clonada:
   ```bash
   cd <nome-da-pasta>
   ```
6. Remova o vínculo com o repositório original:
   ```bash
   git remote remove origin
   ```
7. Adicione o repositório que você criou na sua conta como origem:
   ```bash
   git remote add origin <url-do-seu-repositorio>
   ```
8. Envie os arquivos para o seu repositório:
   ```bash
   git push -u origin main
   ```
   (ou `master`, dependendo do nome da sua branch principal)

📌 **Importante:**  
- O código deve estar na branch **main** ou **master** do seu repositório.  
- **NÃO** faça *Fork* deste repositório.  

---

## 🧠 Objetivo

Avaliar a capacidade do candidato em desenvolver e integrar um widget em uma página web, consumindo dados de uma API e utilizando tecnologias modernas como React.

---

## 📋 Instruções Gerais

Você deve entregar:

1. Um arquivo JavaScript que será incluído em qualquer site para carregar um widget contendo um iFrame.
2. Um projeto React utilizando o framework Vite + TypeScript com a página a ser carregada no widget.
3. As instruções de como executar e testar a solução.

---

## ✅ Requisitos

### 1. JavaScript para inserir o widget (arquivo externo)

Desenvolva um script JS que:

- Cria um botão flutuante fixo no canto inferior direito da tela (como um botão de chat).
- Ao clicar no botão, um iFrame deve aparecer com o conteúdo da aplicação React.
- O botão deve permitir abrir/fechar o widget.
- O script deve ser facilmente incorporado via `<script src="..."></script>` em qualquer site.

> 💡 O `window.loggedUserId` estará definido na página principal com o valor do ID do usuário logado (por exemplo: `window.loggedUserId = 2`).

---

### 2. Aplicação React

Você deverá criar uma aplicação que será exibida dentro do iFrame. Essa aplicação deve:

- Ao carregar, ler o valor de `window.parent.loggedUserId` via `postMessage`.
- Usar esse ID para fazer uma requisição `GET` para:
  `https://jsonplaceholder.typicode.com/users/<ID>`
- Exibir na tela os seguintes dados do usuário retornado:
  - Nome
  - E-mail
- Usar o mesmo ID para fazer uma requisição `GET` para:
  `https://jsonplaceholder.typicode.com/posts?userId=<ID>`
- Exibir na tela os posts realizados pelo usuário contendo:
  - Título (`title`)
  - Conteúdo (`body`)

> ⚠️ Importante: a aplicação React precisa funcionar mesmo rodando em um iFrame hospedado em outro domínio.

---

### 3. Design & UX

- O widget pode ser simples, mas deve ser utilizável em desktop e mobile.
- O widget deve cobrir no máximo **320px de largura** e **600px de altura**.
- Sinta-se livre para utilizar bibliotecas com componentes prontos ou de estilização.
- Deve haver um botão de **fechar** dentro do próprio widget.

---

## 🧪 Critérios de Avaliação

| Critério                          | Peso |
|----------------------------------|------|
| Funcionalidade completa          | 40%  |
| Organização do código            | 20%  |
| Uso adequado de React e JS       | 20%  |
| UX e comportamento do widget     | 10%  |
| Clareza nas instruções de uso    | 10%  |

---

## 🚀 Extras (não obrigatórios, mas contam pontos)

- Adicionar tratamento de erro caso o ID do usuário seja inválido.
- Fazer loading enquanto a API é chamada.
- Testes unitários

---

## 👾 Exemplos

![Aviato example](imgs/01.gif)
![Classimax example](imgs/02.gif)
![Shop example](imgs/03.gif)

---

## 📦 Entrega

Oba! Terminou tudinho? Agora faça o seguinte:

1. Verifique se o código está na branch **main/master** do repositório que você criou.  
2. Dê acesso aos usuários **`sandercamargo`** e **`jgabrielfes-bonifiq`** no GitHub.

A gente te responde em breve, ok?

---

Boa sorte! 🍀
