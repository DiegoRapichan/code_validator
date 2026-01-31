// ========================================
// CODE EXECUTION SERVICE
// Serviço para executar e validar código
// ========================================

const { VM } = require("vm2");
const { spawn } = require("child_process");
const { getExerciseById } = require("../data/exercises-with-tests");

// ========================================
// CONSTANTES
// ========================================

const TIMEOUT_MS = 5000; // 5 segundos máximo de execução

// ========================================
// FUNÇÃO PRINCIPAL: VALIDAR EXERCÍCIO
// ========================================

/**
 * Valida o código do usuário contra os test cases do exercício
 *
 * @param {string} userId - ID do usuário
 * @param {string} exerciseId - ID do exercício
 * @param {string} code - Código enviado pelo usuário
 * @param {string} language - Linguagem (python, javascript)
 * @returns {Promise<Object>} Resultado da validação
 */
async function validateExercise(userId, exerciseId, code, language) {
  console.log(`\n🔍 Validando exercício ${exerciseId} para usuário ${userId}`);
  console.log(`📝 Linguagem: ${language}`);

  // Busca o exercício no banco de dados
  const exercise = getExerciseById(exerciseId);

  if (!exercise) {
    throw new Error(`Exercício ${exerciseId} não encontrado`);
  }

  // Array para armazenar resultados de cada teste
  const results = [];
  let passedTests = 0;

  // Executa cada test case
  for (const testCase of exercise.testCases) {
    console.log(`\n📋 Executando: ${testCase.name}`);

    try {
      // Executa o código com o input do test case
      const output = await executeCode(code, testCase.input, language);

      // Compara o output com o esperado
      const passed = compareOutput(output, testCase.expectedOutput);

      if (passed) {
        passedTests++;
        console.log(`✅ PASSOU`);
      } else {
        console.log(`❌ FALHOU`);
        console.log(`   Esperado: "${testCase.expectedOutput}"`);
        console.log(`   Recebido: "${output}"`);
      }

      // Adiciona resultado (sem revelar input/output de testes ocultos)
      results.push({
        name: testCase.name,
        passed: passed,
        hidden: testCase.hidden,
        // Só mostra detalhes se não for teste oculto
        input: testCase.hidden ? null : testCase.input,
        expectedOutput: testCase.hidden ? null : testCase.expectedOutput,
        actualOutput: testCase.hidden ? null : output,
        error: null,
      });
    } catch (error) {
      console.log(`❌ ERRO: ${error.message}`);

      results.push({
        name: testCase.name,
        passed: false,
        hidden: testCase.hidden,
        input: testCase.hidden ? null : testCase.input,
        expectedOutput: testCase.hidden ? null : testCase.expectedOutput,
        actualOutput: null,
        error: error.message,
      });
    }
  }

  // Calcula score
  const totalTests = exercise.testCases.length;
  const score = Math.round((passedTests / totalTests) * 100);
  const allPassed = passedTests === totalTests;

  console.log(`\n📊 Resultado Final:`);
  console.log(`   Score: ${score}%`);
  console.log(`   Testes passados: ${passedTests}/${totalTests}`);

  return {
    success: true,
    score: score,
    allPassed: allPassed,
    passedTests: passedTests,
    totalTests: totalTests,
    results: results,
    points: allPassed ? exercise.points : 0,
  };
}

// ========================================
// EXECUTAR CÓDIGO
// ========================================

/**
 * Executa código na linguagem especificada
 */
async function executeCode(code, input, language) {
  if (language === "python") {
    return executePython(code, input);
  } else if (language === "javascript") {
    return executeJavaScript(code, input);
  } else {
    throw new Error(`Linguagem ${language} não suportada`);
  }
}

// ========================================
// EXECUTAR PYTHON
// ========================================

/**
 * Executa código Python em um processo isolado
 */
function executePython(code, input) {
  return new Promise((resolve, reject) => {
    // Spawn processo Python
    const python = spawn("python3", ["-c", code]);

    let output = "";
    let errorOutput = "";

    // Timer de timeout
    const timeout = setTimeout(() => {
      python.kill();
      reject(new Error("Timeout: código demorou mais de 5 segundos"));
    }, TIMEOUT_MS);

    // Captura stdout (saída normal)
    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    // Captura stderr (erros)
    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    // Quando o processo terminar
    python.on("close", (code) => {
      clearTimeout(timeout);

      if (code !== 0) {
        // Erro na execução
        reject(new Error(errorOutput || "Erro ao executar código Python"));
      } else {
        // Sucesso - retorna output limpo
        resolve(output.trim());
      }
    });

    // Envia o input para stdin
    if (input) {
      python.stdin.write(input);
    }
    python.stdin.end();
  });
}

// ========================================
// EXECUTAR JAVASCRIPT
// ========================================

/**
 * Executa código JavaScript em sandbox isolado (VM2)
 */
function executeJavaScript(code, input) {
  return new Promise((resolve, reject) => {
    try {
      // Cria VM isolado
      const vm = new VM({
        timeout: TIMEOUT_MS,
        sandbox: {
          console: {
            log: () => {},
          },
          // ← ADICIONA ISTO:
          module: {
            exports: {},
          },
          exports: {},
        },
      });

      // Para exercícios de função (JavaScript)
      // O código deve exportar uma função

      // Prepara o código para execução
      let fullCode = code;

      // Se tem input, precisa processar
      if (input) {
        // Para JavaScript, o input geralmente é um argumento da função
        // Parse do input (pode ser número, string, array, etc)
        const parsedInput = parseJavaScriptInput(input);

        // Adiciona código para executar a função com o input
        fullCode += `\n\nconst fn = module.exports;\nconst result = fn(${parsedInput});\nresult;`;
      }

      // Executa o código
      const result = vm.run(fullCode);

      // Converte resultado para string
      const output = String(result);

      resolve(output);
    } catch (error) {
      reject(new Error(`Erro JavaScript: ${error.message}`));
    }
  });
}

// ========================================
// HELPERS
// ========================================

/**
 * Parse input para JavaScript
 * Converte string de input em formato JavaScript válido
 */
function parseJavaScriptInput(input) {
  // Remove espaços e quebras de linha extras
  input = input.trim();

  // Se já parece JSON válido (array, objeto), retorna direto
  if (input.startsWith("[") || input.startsWith("{")) {
    return input;
  }

  // Se é string, adiciona aspas
  if (input.startsWith('"') || input.startsWith("'")) {
    return input;
  }

  // Se é número, retorna direto
  if (!isNaN(input)) {
    return input;
  }

  // Caso contrário, trata como string
  return `"${input}"`;
}

/**
 * Compara output esperado com output recebido
 * Remove espaços extras, quebras de linha, etc
 */
function compareOutput(actual, expected) {
  // Normaliza ambos: trim, lowercase, remove espaços extras
  const normalize = (str) => {
    return String(str).trim().toLowerCase().replace(/\s+/g, " ");
  };

  return normalize(actual) === normalize(expected);
}

// ========================================
// EXPORTS
// ========================================

module.exports = {
  validateExercise,
  executeCode,
  executePython,
  executeJavaScript,
};
