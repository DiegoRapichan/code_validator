// ========================================
// BANCO DE EXERCÍCIOS COM TEST CASES
// ========================================

/**
 * Estrutura de um exercício:
 * - id: identificador único
 * - title: título do exercício
 * - description: descrição detalhada
 * - difficulty: 'beginner' | 'intermediate' | 'advanced'
 * - course: 'PYTHON' | 'JAVASCRIPT' | 'SQL' | etc
 * - starterCode: código inicial para o aluno
 * - testCases: array de casos de teste
 *   - name: nome descritivo do teste
 *   - input: entrada (stdin)
 *   - expectedOutput: saída esperada
 *   - hidden: se true, aluno não vê o teste (evita hardcode)
 * - hints: array de dicas progressivas
 * - points: pontos ganhos ao completar
 */

const exercisesWithTests = [
  // ========================================
  // EXERCÍCIOS PYTHON
  // ========================================
  {
    id: 'python_001',
    title: 'Soma de Dois Números',
    description: `
Crie um programa que leia dois números inteiros e imprima a soma deles.

**Entrada:**
Dois números inteiros, um por linha.

**Saída:**
A soma dos dois números.

**Exemplo:**
Entrada:
3
5

Saída:
8
    `,
    difficulty: 'beginner',
    course: 'PYTHON',
    starterCode: `# Leia os dois números
a = int(input())
b = int(input())

# Calcule a soma e imprima o resultado
# Seu código aqui
`,
    testCases: [
      {
        name: 'Teste 1: Números positivos pequenos',
        input: '3\n5',
        expectedOutput: '8',
        hidden: false
      },
      {
        name: 'Teste 2: Números positivos grandes',
        input: '1000\n2000',
        expectedOutput: '3000',
        hidden: false
      },
      {
        name: 'Teste 3: Com número negativo',
        input: '-10\n25',
        expectedOutput: '15',
        hidden: true
      },
      {
        name: 'Teste 4: Zeros',
        input: '0\n0',
        expectedOutput: '0',
        hidden: true
      }
    ],
    hints: [
      'Use o operador + para somar',
      'A função int() já converte a entrada para inteiro',
      'Use print() para mostrar o resultado'
    ],
    points: 10
  },

  {
    id: 'python_002',
    title: 'Média de Três Notas',
    description: `
Calcule a média de três notas fornecidas pelo usuário.

**Entrada:**
Três números (notas), um por linha.

**Saída:**
A média com 2 casas decimais.

**Exemplo:**
Entrada:
8.5
7.0
9.5

Saída:
8.33
    `,
    difficulty: 'beginner',
    course: 'PYTHON',
    starterCode: `# Leia as três notas
nota1 = float(input())
nota2 = float(input())
nota3 = float(input())

# Calcule a média e imprima com 2 casas decimais
# Seu código aqui
`,
    testCases: [
      {
        name: 'Teste 1: Notas normais',
        input: '8.5\n7.0\n9.5',
        expectedOutput: '8.33',
        hidden: false
      },
      {
        name: 'Teste 2: Notas inteiras',
        input: '10\n8\n6',
        expectedOutput: '8.00',
        hidden: false
      },
      {
        name: 'Teste 3: Todas iguais',
        input: '7.5\n7.5\n7.5',
        expectedOutput: '7.50',
        hidden: true
      },
      {
        name: 'Teste 4: Com zero',
        input: '0\n5\n10',
        expectedOutput: '5.00',
        hidden: true
      }
    ],
    hints: [
      'A média é a soma dividida por 3',
      'Use format() ou f-string para formatar com 2 casas: {:.2f}',
      'float() converte para número decimal'
    ],
    points: 15
  },

  {
    id: 'python_003',
    title: 'Par ou Ímpar',
    description: `
Verifique se um número é par ou ímpar.

**Entrada:**
Um número inteiro.

**Saída:**
"PAR" ou "IMPAR"

**Exemplo:**
Entrada:
4

Saída:
PAR
    `,
    difficulty: 'beginner',
    course: 'PYTHON',
    starterCode: `# Leia o número
numero = int(input())

# Verifique se é par ou ímpar
# Seu código aqui
`,
    testCases: [
      {
        name: 'Teste 1: Número par',
        input: '4',
        expectedOutput: 'PAR',
        hidden: false
      },
      {
        name: 'Teste 2: Número ímpar',
        input: '7',
        expectedOutput: 'IMPAR',
        hidden: false
      },
      {
        name: 'Teste 3: Zero',
        input: '0',
        expectedOutput: 'PAR',
        hidden: true
      },
      {
        name: 'Teste 4: Número negativo par',
        input: '-8',
        expectedOutput: 'PAR',
        hidden: true
      },
      {
        name: 'Teste 5: Número negativo ímpar',
        input: '-3',
        expectedOutput: 'IMPAR',
        hidden: true
      }
    ],
    hints: [
      'Use o operador % (módulo) para verificar o resto da divisão por 2',
      'Se numero % 2 == 0, é par',
      'Lembre-se de imprimir em MAIÚSCULAS'
    ],
    points: 10
  },

  // ========================================
  // EXERCÍCIOS JAVASCRIPT
  // ========================================
  {
    id: 'js_001',
    title: 'Dobro de um Número',
    description: `
Crie uma função que retorna o dobro de um número.

**Função esperada:**
function dobro(n) { ... }

**Exemplo:**
dobro(5) => 10
dobro(3) => 6
    `,
    difficulty: 'beginner',
    course: 'JAVASCRIPT',
    starterCode: `function dobro(n) {
  // Seu código aqui
  
}

// Não modifique abaixo
module.exports = dobro;
`,
    testCases: [
      {
        name: 'Teste 1: Número positivo',
        input: '5',
        expectedOutput: '10',
        hidden: false
      },
      {
        name: 'Teste 2: Número zero',
        input: '0',
        expectedOutput: '0',
        hidden: false
      },
      {
        name: 'Teste 3: Número negativo',
        input: '-3',
        expectedOutput: '-6',
        hidden: true
      },
      {
        name: 'Teste 4: Número decimal',
        input: '2.5',
        expectedOutput: '5',
        hidden: true
      }
    ],
    hints: [
      'Multiplique o número por 2',
      'Use return para retornar o resultado'
    ],
    points: 10
  },

  {
    id: 'js_002',
    title: 'Encontrar o Maior Número',
    description: `
Crie uma função que retorna o maior número de um array.

**Função esperada:**
function encontrarMaior(arr) { ... }

**Exemplo:**
encontrarMaior([3, 7, 2, 9, 1]) => 9
encontrarMaior([10, 5, 8]) => 10
    `,
    difficulty: 'intermediate',
    course: 'JAVASCRIPT',
    starterCode: `function encontrarMaior(arr) {
  // Seu código aqui
  
}

// Não modifique abaixo
module.exports = encontrarMaior;
`,
    testCases: [
      {
        name: 'Teste 1: Array simples',
        input: '[3, 7, 2, 9, 1]',
        expectedOutput: '9',
        hidden: false
      },
      {
        name: 'Teste 2: Array com negativos',
        input: '[-5, -2, -10, -1]',
        expectedOutput: '-1',
        hidden: false
      },
      {
        name: 'Teste 3: Todos iguais',
        input: '[5, 5, 5, 5]',
        expectedOutput: '5',
        hidden: true
      },
      {
        name: 'Teste 4: Um único elemento',
        input: '[42]',
        expectedOutput: '42',
        hidden: true
      }
    ],
    hints: [
      'Você pode usar Math.max() com spread operator',
      'Ou fazer um loop comparando cada elemento',
      'return Math.max(...arr) é uma solução elegante'
    ],
    points: 20
  },

  {
    id: 'js_003',
    title: 'Contar Vogais',
    description: `
Crie uma função que conta quantas vogais existem em uma string.

**Função esperada:**
function contarVogais(texto) { ... }

**Exemplo:**
contarVogais("hello") => 2
contarVogais("programming") => 3
    `,
    difficulty: 'intermediate',
    course: 'JAVASCRIPT',
    starterCode: `function contarVogais(texto) {
  // Seu código aqui
  
}

// Não modifique abaixo
module.exports = contarVogais;
`,
    testCases: [
      {
        name: 'Teste 1: Palavra simples',
        input: '"hello"',
        expectedOutput: '2',
        hidden: false
      },
      {
        name: 'Teste 2: Palavra mais longa',
        input: '"programming"',
        expectedOutput: '3',
        hidden: false
      },
      {
        name: 'Teste 3: Maiúsculas',
        input: '"AEIOU"',
        expectedOutput: '5',
        hidden: true
      },
      {
        name: 'Teste 4: Sem vogais',
        input: '"xyz"',
        expectedOutput: '0',
        hidden: true
      },
      {
        name: 'Teste 5: String vazia',
        input: '""',
        expectedOutput: '0',
        hidden: true
      }
    ],
    hints: [
      'As vogais são: a, e, i, o, u (minúsculas e maiúsculas)',
      'Converta a string para minúsculas primeiro',
      'Use um loop ou método de array como filter'
    ],
    points: 20
  }
];

// ========================================
// FUNÇÕES AUXILIARES
// ========================================

/**
 * Busca um exercício pelo ID
 */
function getExerciseById(id) {
  return exercisesWithTests.find(ex => ex.id === id);
}

/**
 * Lista exercícios por curso
 */
function getExercisesByCourse(course) {
  return exercisesWithTests.filter(ex => ex.course === course);
}

/**
 * Lista exercícios por dificuldade
 */
function getExercisesByDifficulty(difficulty) {
  return exercisesWithTests.filter(ex => ex.difficulty === difficulty);
}

/**
 * Lista todos os exercícios (sem código/testes, só metadados)
 */
function getAllExercisesMetadata() {
  return exercisesWithTests.map(ex => ({
    id: ex.id,
    title: ex.title,
    difficulty: ex.difficulty,
    course: ex.course,
    points: ex.points
  }));
}

// ========================================
// EXPORTS
// ========================================

module.exports = {
  exercisesWithTests,
  getExerciseById,
  getExercisesByCourse,
  getExercisesByDifficulty,
  getAllExercisesMetadata
};
