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
    if (!newHabit.trim()) return;

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
    <div style={{ padding: "24px", background: "#2e2e2e", minHeight: "100vh" }}>
      <h2>Meus Hábitos</h2>

      <form onSubmit={handleCreateHabit}>
        <input
          type="text"
          placeholder="Novo hábito"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {habits.map((habit) => {
          const lastLog = habit.logs?.length
            ? new Date(habit.logs[habit.logs.length - 1].date).toLocaleDateString("pt-BR")
            : null;

          return (
            <li key={habit._id}>
              <div style={{ flex: 1 }}>
                {editingHabit === habit._id ? (
                  <>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <div style={{ marginTop: "8px" }}>
                      <button onClick={() => handleUpdateHabit(habit._id)}>Salvar</button>
                      <button onClick={() => setEditingHabit(null)} style={{ marginLeft: "8px" }}>
                        Cancelar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <strong>{habit.title}</strong>
                    {lastLog && (
                      <p style={{ fontSize: "12px", marginTop: "4px" }}>
                        Última conclusão: {lastLog}
                      </p>
                    )}
                  </>
                )}
              </div>

              {editingHabit !== habit._id && (
                <div className="habit-actions">
                  <button
                    onClick={() => {
                      setEditTitle(habit.title);
                      setEditingHabit(habit._id);
                    }}
                  >
                    Editar
                  </button>
                  <button onClick={() => handleDeleteHabit(habit._id)}>Deletar</button>
                  <button onClick={() => handleLogHabit(habit._id)}>Concluir Hoje</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <button onClick={handleLogout} className="logout-button">
        Sair
      </button>
    </div>
  );
}
