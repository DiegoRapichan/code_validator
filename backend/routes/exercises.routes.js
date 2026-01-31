// ========================================
// ROUTES - EXERCISES
// Rotas da API de exercícios
// ========================================

const express = require('express');
const router = express.Router();
const { validateExercise } = require('../services/code-execution.service');
const { 
  getAllExercisesMetadata, 
  getExerciseById,
  getExercisesByCourse,
  getExercisesByDifficulty
} = require('../data/exercises-with-tests');

// ========================================
// GET /api/exercises
// Lista todos os exercícios (só metadados)
// ========================================

router.get('/', (req, res) => {
  try {
    const exercises = getAllExercisesMetadata();
    res.json({
      success: true,
      count: exercises.length,
      exercises: exercises
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// GET /api/exercises/:id
// Busca um exercício específico
// ========================================

router.get('/:id', (req, res) => {
  try {
    const exercise = getExerciseById(req.params.id);
    
    if (!exercise) {
      return res.status(404).json({
        success: false,
        error: 'Exercício não encontrado'
      });
    }
    
    // Remove testes ocultos da resposta
    const exerciseWithVisibleTests = {
      ...exercise,
      testCases: exercise.testCases.filter(t => !t.hidden).map(t => ({
        name: t.name,
        input: t.input,
        expectedOutput: t.expectedOutput
      }))
    };
    
    res.json({
      success: true,
      exercise: exerciseWithVisibleTests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// GET /api/exercises/course/:course
// Lista exercícios por curso
// ========================================

router.get('/course/:course', (req, res) => {
  try {
    const exercises = getExercisesByCourse(req.params.course.toUpperCase());
    res.json({
      success: true,
      course: req.params.course,
      count: exercises.length,
      exercises: exercises
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// POST /api/exercises/validate-code
// Valida código do usuário
// ========================================

router.post('/validate-code', async (req, res) => {
  try {
    const { userId, exerciseId, code, language } = req.body;
    
    // Validação dos dados
    if (!userId || !exerciseId || !code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Campos obrigatórios: userId, exerciseId, code, language'
      });
    }
    
    console.log(`\n🚀 Nova submissão de código:`);
    console.log(`   User: ${userId}`);
    console.log(`   Exercise: ${exerciseId}`);
    console.log(`   Language: ${language}`);
    
    // Executa validação
    const result = await validateExercise(userId, exerciseId, code, language);
    
    res.json(result);
    
  } catch (error) {
    console.error('❌ Erro na validação:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// EXPORTS
// ========================================

module.exports = router;
