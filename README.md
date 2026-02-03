# 🛠️ Code Validator

Plataforma web moderna para validação automática de código com suporte a **JavaScript** e **Python**, oferecendo feedback em tempo real e interface intuitiva.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://www.javascript.com)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-2C2255?style=for-the-badge&logo=visualstudiocode&logoColor=white)](https://microsoft.github.io/monaco-editor/)

> Editor de código online com validação automática, syntax highlighting e suporte multi-linguagem.

---

## 🎯 Sobre o Projeto

**Code Validator** é uma plataforma web que permite aos desenvolvedores escrever, validar e testar código diretamente no navegador, sem necessidade de instalar ferramentas localmente.

### Por que usar?

- ✅ **Validação em tempo real** - Feedback instantâneo sobre erros de sintaxe
- ✅ **Multi-linguagem** - Suporte para JavaScript e Python (mais linguagens em breve)
- ✅ **Interface profissional** - Editor Monaco (mesmo do VS Code)
- ✅ **Sem instalação** - Roda 100% no navegador
- ✅ **Syntax highlighting** - Cores e indentação automáticas
- ✅ **Ideal para aprendizado** - Perfeito para estudantes testarem código rapidamente

---

## ✨ Funcionalidades

### 📝 Editor de Código
- ✅ **Monaco Editor integrado** (engine do VS Code)
- ✅ **Syntax highlighting** avançado
- ✅ **Auto-complete** e sugestões inteligentes
- ✅ **Indentação automática**
- ✅ **Múltiplas linguagens** (JavaScript, Python)
- ✅ **Temas** (claro e escuro)

### 🔍 Validação
- ✅ **Validação em tempo real**
- ✅ **Detecção de erros de sintaxe**
- ✅ **Mensagens de erro claras**
- ✅ **Sugestões de correção**
- ✅ **Análise estática de código**

### 🎨 Interface
- ✅ **Design moderno e responsivo**
- ✅ **Painel de resultados**
- ✅ **Seletor de linguagem**
- ✅ **Botões de ação rápida**
- ✅ **Feedback visual de status**

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React** - Biblioteca UI
- **Monaco Editor** - Editor de código (VS Code)
- **Tailwind CSS** - Estilização moderna
- **Vite** - Build tool rápido

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Child Process** - Execução de código Python
- **ESLint** - Validação JavaScript

### Ferramentas
- **Axios** - Cliente HTTP
- **React Icons** - Ícones
- **CORS** - Controle de acesso

---

## 📦 Instalação e Uso

### Pré-requisitos

- Node.js 18+
- Python 3.8+ (para validação Python)
- npm ou yarn

### Backend

1. **Clone o repositório**
```bash
git clone https://github.com/DiegoRapichan/code_validator.git
cd code_validator/backend
```

2. **Instale dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente**
```bash
cp .env.example .env
```

`.env`:
```env
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

4. **Inicie o servidor**
```bash
npm run dev
```

Backend rodando em `http://localhost:3001`

---

### Frontend

1. **Entre na pasta frontend**
```bash
cd ../frontend
```

2. **Instale dependências**
```bash
npm install
```

3. **Configure variáveis de ambiente**
```bash
cp .env.example .env
```

`.env`:
```env
VITE_API_URL=http://localhost:3001
```

4. **Inicie o app**
```bash
npm run dev
```

Frontend rodando em `http://localhost:5173`

---

## 🎮 Como Usar

### Passo 1: Selecione a Linguagem
Escolha entre **JavaScript** ou **Python** no seletor superior.

### Passo 2: Escreva o Código
Digite ou cole seu código no editor Monaco.

**Exemplo JavaScript:**
```javascript
function soma(a, b) {
  return a + b;
}

console.log(soma(5, 3)); // 8
```

**Exemplo Python:**
```python
def soma(a, b):
    return a + b

print(soma(5, 3))  # 8
```

### Passo 3: Valide
Clique em **"Validar Código"** e veja o resultado:

- ✅ **Código válido** - Mensagem de sucesso em verde
- ❌ **Código inválido** - Erros detalhados em vermelho

---

## 📚 API Endpoints

### Base URL
```
http://localhost:3001/api
```

### Validar JavaScript
```http
POST /api/validate/javascript
Content-Type: application/json

{
  "code": "function soma(a, b) { return a + b; }"
}
```

**Resposta (200):**
```json
{
  "valid": true,
  "message": "Código JavaScript válido!",
  "errors": []
}
```

**Resposta (400):**
```json
{
  "valid": false,
  "message": "Erros encontrados no código",
  "errors": [
    {
      "line": 1,
      "column": 10,
      "message": "Unexpected token }"
    }
  ]
}
```

### Validar Python
```http
POST /api/validate/python
Content-Type: application/json

{
  "code": "def soma(a, b):\n    return a + b"
}
```

---

## 🗂️ Estrutura do Projeto

```
code_validator/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── validatorController.js
│   │   ├── routes/
│   │   │   └── validatorRoutes.js
│   │   ├── utils/
│   │   │   ├── jsValidator.js
│   │   │   └── pyValidator.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── LanguageSelector.jsx
│   │   │   └── ResultPanel.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🚀 Roadmap (Próximas Features)

### Em Desenvolvimento
- [ ] Suporte a mais linguagens (TypeScript, PHP, Ruby)
- [ ] Execução de código (não só validação)
- [ ] Salvar snippets de código
- [ ] Compartilhamento de código via link
- [ ] Histórico de validações

### Planejado
- [ ] Autenticação de usuários
- [ ] Biblioteca de snippets pública
- [ ] Temas customizáveis
- [ ] Integração com GitHub
- [ ] API pública para desenvolvedores
- [ ] Suporte a testes unitários

---

## 🎨 Screenshots

### Interface Principal
   ![Interface Principal](docs/screenshots/interface.png)

### Interface Responsiva - Dispositivos Móveis
  ![Interface Responsiva - Dispositivos Móveis](docs/screenshots/interface-Responsiva-dispositivo-movel.png)  

### Seleção de Exercícios
   ![Seleção de Exercícios](docs/screenshots/selecao-exercicios.png)  

### Mensagem de Erro de Resolução
   ![Mensagem de Erro de Resolução](docs/screenshots/mensagem-erro.png)     

### Mensagem de Acerto de Resolução
   ![Mensagem de Acerto de Resolução](docs/screenshots/mensagem-acerto.png)        


---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

### Ideias de Contribuição
- Adicionar suporte a novas linguagens
- Melhorar mensagens de erro
- Otimizar performance
- Adicionar testes automatizados
- Melhorar UI/UX

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

**Diego Rapichan**

- GitHub: [@DiegoRapichan](https://github.com/DiegoRapichan)
- LinkedIn: [Diego Rapichan](https://www.linkedin.com/in/diego-rapichan)
- Email: direrapichan@gmail.com

---

## 🙏 Agradecimentos

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Editor de código
- [React](https://reactjs.org) - Biblioteca UI
- [Node.js](https://nodejs.org) - Runtime backend

---

⭐ **Se este projeto foi útil, considere dar uma estrela!**

---

**Desenvolvido por Diego Rapichan**
