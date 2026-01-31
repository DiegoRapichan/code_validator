// ========================================
// APP.JSX - Exemplo de Uso
// ========================================

import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import "./App.css";

function App() {
  // ========================================
  // STATE
  // ========================================

  const [selectedExercise, setSelectedExercise] = useState("python_001");
  const [userId] = useState("user_demo_123"); // Em produção, pegar do auth

  // ========================================
  // LISTA DE EXERCÍCIOS DISPONÍVEIS
  // ========================================

  const exercises = [
    {
      id: "python_001",
      name: "Python: Soma de Dois Números",
      course: "PYTHON",
    },
    { id: "python_002", name: "Python: Média de Três Notas", course: "PYTHON" },
    { id: "python_003", name: "Python: Par ou Ímpar", course: "PYTHON" },
    {
      id: "js_001",
      name: "JavaScript: Dobro de um Número",
      course: "JAVASCRIPT",
    },
    {
      id: "js_002",
      name: "JavaScript: Encontrar o Maior",
      course: "JAVASCRIPT",
    },
    { id: "js_003", name: "JavaScript: Contar Vogais", course: "JAVASCRIPT" },
  ];

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="App">
      {/* HEADER */}
      <header className="app-header">
        <div className="header-content">
          <h1>💻 Code Validator</h1>
          <p>Sistema de Validação de Código - CODE VALIDATOR</p>
        </div>
      </header>

      {/* EXERCISE SELECTOR */}
      <div className="exercise-selector">
        <label htmlFor="exercise-select">Escolha um exercício:</label>
        <select
          id="exercise-select"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
        >
          {exercises.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.name}
            </option>
          ))}
        </select>
      </div>

      {/* CODE EDITOR */}
      <CodeEditor
        key={selectedExercise} // Force re-render quando trocar exercício
        exerciseId={selectedExercise}
        userId={userId}
      />

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          Desenvolvido por <strong>Diego Rapichan</strong> 💻
        </p>
        <p>Sistema de Validação de Código- CODE VALIDATOR - 2026</p>
      </footer>
    </div>
  );
}

export default App;
