// ========================================
// CODE EDITOR COMPONENT
// Editor de código com validação automática
// ========================================

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "./CodeEditor.css";

const API_URL = "http://localhost:3001/api/exercises";

// ========================================
// COMPONENTE PRINCIPAL
// ========================================

function CodeEditor({ exerciseId, userId }) {
  // ========================================
  // STATE
  // ========================================

  const [exercise, setExercise] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);

  // ========================================
  // CARREGAR EXERCÍCIO
  // ========================================

  useEffect(() => {
    loadExercise();
  }, [exerciseId]);

  const loadExercise = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/${exerciseId}`);

      if (response.data.success) {
        const ex = response.data.exercise;
        setExercise(ex);
        setCode(ex.starterCode);
        setLanguage(ex.course.toLowerCase());
      }
    } catch (error) {
      console.error("Erro ao carregar exercício:", error);
      alert("Erro ao carregar exercício!");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // EXECUTAR CÓDIGO
  // ========================================

  const executeCode = async () => {
    if (!code.trim()) {
      alert("Por favor, escreva algum código!");
      return;
    }

    try {
      setExecuting(true);
      setResult(null);

      console.log("Enviando código para validação...");

      const response = await axios.post(`${API_URL}/validate-code`, {
        userId: userId,
        exerciseId: exerciseId,
        code: code,
        language: language,
      });

      console.log("Resultado recebido:", response.data);

      setResult(response.data);

      // Se passou em tudo, mostra animação de sucesso
      if (response.data.allPassed) {
        celebrateSuccess();
      }
    } catch (error) {
      console.error("Erro ao executar código:", error);
      setResult({
        success: false,
        error: error.response?.data?.error || error.message,
      });
    } finally {
      setExecuting(false);
    }
  };

  // ========================================
  // ANIMAÇÃO DE SUCESSO
  // ========================================

  const celebrateSuccess = () => {
    // Adiciona classe de animação
    const container = document.querySelector(".code-editor-container");
    if (container) {
      container.classList.add("celebrate");

      // Remove depois de 2 segundos
      setTimeout(() => {
        container.classList.remove("celebrate");
      }, 2000);
    }
  };

  // ========================================
  // MOSTRAR PRÓXIMA DICA
  // ========================================

  const showNextHint = () => {
    if (exercise && exercise.hints) {
      if (currentHint < exercise.hints.length - 1) {
        setCurrentHint(currentHint + 1);
      }
      setShowHints(true);
    }
  };

  // ========================================
  // RENDER: LOADING
  // ========================================

  if (loading) {
    return (
      <div className="code-editor-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Carregando exercício...</p>
        </div>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="code-editor-container">
        <div className="error">
          <p>❌ Exercício não encontrado</p>
        </div>
      </div>
    );
  }

  // ========================================
  // RENDER: EDITOR
  // ========================================

  return (
    <div className="code-editor-container">
      {/* HEADER */}
      <div className="exercise-header">
        <div className="exercise-info">
          <h2>{exercise.title}</h2>
          <div className="exercise-meta">
            <span className={`badge badge-${exercise.difficulty}`}>
              {exercise.difficulty === "beginner" && "🟢 Iniciante"}
              {exercise.difficulty === "intermediate" && "🟡 Intermediário"}
              {exercise.difficulty === "advanced" && "🔴 Avançado"}
            </span>
            <span className="points">⭐ {exercise.points} pontos</span>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="exercise-description">
        <h3>📋 Descrição</h3>
        <pre>{exercise.description}</pre>
      </div>

      {/* MAIN CONTENT */}
      <div className="editor-content">
        {/* LEFT: EDITOR */}
        <div className="editor-section">
          <div className="editor-header">
            <h3>💻 Editor de Código</h3>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <Editor
            height="400px"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            theme="vs-dark"
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />

          <div className="editor-actions">
            <button
              onClick={executeCode}
              disabled={executing}
              className="btn-execute"
            >
              {executing ? "⏳ Executando..." : "▶ Executar Código"}
            </button>

            <button onClick={showNextHint} className="btn-hint">
              💡 Dica
            </button>
          </div>

          {/* HINTS */}
          {showHints && exercise.hints && (
            <div className="hints-section">
              <h4>💡 Dicas</h4>
              {exercise.hints.slice(0, currentHint + 1).map((hint, index) => (
                <div key={index} className="hint-item">
                  <strong>Dica {index + 1}:</strong> {hint}
                </div>
              ))}
              {currentHint < exercise.hints.length - 1 && (
                <button onClick={showNextHint} className="btn-more-hints">
                  Ver próxima dica
                </button>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: RESULTS */}
        <div className="results-section">
          <h3>📊 Resultados</h3>

          {!result && (
            <div className="no-results">
              <p>Clique em "Executar Código" para testar sua solução</p>
              <p className="tip">
                💡 Seu código será testado contra múltiplos casos de teste
              </p>
            </div>
          )}

          {result && result.success && (
            <div className="results-content">
              {/* SCORE */}
              <div
                className={`score-card ${result.allPassed ? "success" : "partial"}`}
              >
                <div className="score-value">{result.score}%</div>
                <div className="score-label">
                  {result.allPassed ? "🎉 Parabéns!" : "Continue tentando!"}
                </div>
                <div className="score-details">
                  {result.passedTests} de {result.totalTests} testes passaram
                </div>
                {result.allPassed && (
                  <div className="points-earned">
                    +{result.points} pontos ganhos! ⭐
                  </div>
                )}
              </div>

              {/* TEST RESULTS */}
              <div className="test-results">
                <h4>Testes:</h4>
                {result.results.map((test, index) => (
                  <div
                    key={index}
                    className={`test-item ${test.passed ? "passed" : "failed"}`}
                  >
                    <div className="test-header">
                      <span className="test-status">
                        {test.passed ? "✅" : "❌"}
                      </span>
                      <span className="test-name">{test.name}</span>
                    </div>

                    {/* Só mostra detalhes se não for teste oculto */}
                    {!test.hidden && (
                      <div className="test-details">
                        {test.input && (
                          <div className="test-detail">
                            <strong>Input:</strong>
                            <code>{test.input}</code>
                          </div>
                        )}
                        {test.expectedOutput && (
                          <div className="test-detail">
                            <strong>Esperado:</strong>
                            <code>{test.expectedOutput}</code>
                          </div>
                        )}
                        {test.actualOutput && (
                          <div className="test-detail">
                            <strong>Recebido:</strong>
                            <code>{test.actualOutput}</code>
                          </div>
                        )}
                        {test.error && (
                          <div className="test-error">
                            <strong>Erro:</strong> {test.error}
                          </div>
                        )}
                      </div>
                    )}

                    {test.hidden && (
                      <div className="test-hidden">
                        🔒 Teste oculto (detalhes não exibidos)
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {result && !result.success && (
            <div className="error-result">
              <h4>❌ Erro</h4>
              <p>{result.error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
