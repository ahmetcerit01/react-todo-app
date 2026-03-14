import { useState, useEffect } from "react";

function App() {

  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id) => {
    const newText = prompt("Yeni görev:");
    if (!newText) return;

    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "80px auto",
      padding: "30px",
      background: "#1e293b",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      color: "white"
    }}>

      <h1 style={{
        textAlign: "center",
        marginBottom: "30px",
        color: "#22d3ee"
      }}>
        Todo Manager
      </h1>

      <div style={{ display: "flex", gap: "10px" }}>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Yeni görev..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "none"
          }}
        />

        <button
          onClick={addTodo}
          style={{
            background: "#22d3ee",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Ekle
        </button>

      </div>

      <ul style={{ marginTop: "30px", listStyle: "none", padding: 0 }}>

        {todos.map(todo => (

          <li key={todo.id} style={{
            background: "#334155",
            marginBottom: "10px",
            padding: "12px",
            borderRadius: "6px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>

              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />

              <span style={{
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? 0.5 : 1
              }}>
                {todo.text}
              </span>

            </div>

            <div style={{ display: "flex", gap: "8px" }}>

              <button
                onClick={() => updateTodo(todo.id)}
                style={{
                  background: "#15bdfa",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Güncelle
              </button>

              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  background: "#ef4444",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  color: "white"
                }}
              >
                Sil
              </button>

            </div>

          </li>

        ))}

      </ul>

    </div>
  );
}

export default App;