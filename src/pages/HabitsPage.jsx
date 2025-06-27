import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

export default function HabitsPage() {
  const { token, logout } = useAuth();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch(`${apiUrl}/habits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      const response = await fetch(`${apiUrl}/habits`, {
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
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
        {habits.map((habit) => (
          <li key={habit._id}>{habit.title}</li>
        ))}
      </ul>

      <button onClick={handleLogout} style={{ marginTop: "16px" }}>
        Sair
      </button>
    </div>
  );
}
