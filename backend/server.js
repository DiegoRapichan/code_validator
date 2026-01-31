// ========================================
// SERVER.JS - Servidor Principal
// ========================================

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// ========================================
// CONFIGURAÇÃO
// ========================================

const app = express();
const PORT = process.env.PORT || 3001;

// ========================================
// MIDDLEWARES
// ========================================

// CORS - permite requisições do frontend
app.use(cors());

// Parse JSON
app.use(express.json());

// Logger de requisições
app.use(morgan('dev'));

// ========================================
// ROTAS
// ========================================

const exercisesRoutes = require('./routes/exercises.routes');

// Rota de health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Code Validator API - Sistema de Validação de Código',
    version: '1.0.0',
    endpoints: {
      exercises: {
        getAll: 'GET /api/exercises',
        getById: 'GET /api/exercises/:id',
        getByCourse: 'GET /api/exercises/course/:course',
        validateCode: 'POST /api/exercises/validate-code'
      }
    }
  });
});

// Rotas de exercícios
app.use('/api/exercises', exercisesRoutes);

// ========================================
// TRATAMENTO DE ERROS
// ========================================

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada'
  });
});

// Erro geral
app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor',
    message: err.message
  });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║     🚀  CODE VALIDATOR API                     ║
║                                                ║
║     ✅  Servidor rodando na porta ${PORT}        ║
║     📡  http://localhost:${PORT}                 ║
║                                                ║
║     Endpoints disponíveis:                     ║
║     • GET  /api/exercises                      ║
║     • GET  /api/exercises/:id                  ║
║     • POST /api/exercises/validate-code        ║
║                                                ║
╚════════════════════════════════════════════════╝
  `);
});

module.exports = app;
