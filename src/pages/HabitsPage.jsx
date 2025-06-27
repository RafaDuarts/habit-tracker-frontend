import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function HabitsPage() {
  const { token, logout } = useAuth();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [editingHabit, setEditingHabit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error("Erro ao buscar hábitos:", error);
    }
  };

  const handleCreateHabit = async (e) => {
    e.preventDefault();
    if (!newHabit) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/habits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newHabit }),
      });

      if (!response.ok) throw new Error("Erro ao criar hábito");

      setNewHabit("");
      fetchHabits();
    } catch (error) {
      alert("Erro ao criar hábito");
    }
  };

  const handleDeleteHabit = async (id) => {
    if (!confirm("Deseja realmente excluir este hábito?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHabits();
    } catch (error) {
      alert("Erro ao deletar hábito");
    }
  };

  const handleUpdateHabit = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/habits/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle }),
      });
      setEditingHabit(null);
      fetchHabits();
    } catch (error) {
      alert("Erro ao atualizar hábito");
    }
  };

  const handleLogHabit = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/habits/${id}/log`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHabits();
    } catch (error) {
      alert("Erro ao registrar conclusão");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "24px", background: "#333", color: "white", minHeight: "100vh" }}>
      <h2>Meus Hábitos</h2>

      <form onSubmit={handleCreateHabit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Novo hábito"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>Adicionar</button>
      </form>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {habits.map((habit) => (
          <li key={habit._id} style={{ marginBottom: "16px", background: "#222", padding: "12px", borderRadius: "6px" }}>
            {editingHabit === habit._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ padding: "6px", width: "200px" }}
                />
                <button onClick={() => handleUpdateHabit(habit._id)} style={{ marginLeft: "6px" }}>
                  Salvar
                </button>
                <button onClick={() => setEditingHabit(null)} style={{ marginLeft: "4px" }}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <strong>{habit.title}</strong>
                <div style={{ marginTop: "6px" }}>
                  <button onClick={() => {
                    setEditTitle(habit.title);
                    setEditingHabit(habit._id);
                  }}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteHabit(habit._id)} style={{ marginLeft: "6px" }}>
                    Deletar
                  </button>
                  <button onClick={() => handleLogHabit(habit._id)} style={{ marginLeft: "6px" }}>
                    Concluir Hoje
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "32px",
          padding: "12px 20px",
          background: "crimson",
          border: "none",
          borderRadius: "8px",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
          maxWidth: "300px"
        }}
      >
        Sair
      </button>
    </div>
  );
}
