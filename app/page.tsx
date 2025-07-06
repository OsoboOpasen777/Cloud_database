"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [kpiData, setKpiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/kpi?select=*`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );
        const data = await response.json();
        setKpiData(data);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      }
      setLoading(false);
    }

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const filtered = kpiData.filter((item: any) =>
    item.metric_name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>📊 KPI Dashboard</h1>
      <input
        style={{ padding: 8, margin: "12px 0", width: 300 }}
        placeholder="Фильтр по метрике..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {loading ? (
        <p>Загрузка данных...</p>
      ) : filtered.length === 0 ? (
        <p>Нет данных</p>
      ) : (
        <div style={{ display: "grid", gap: 16 }}>
          {filtered.map((item: any) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 16,
                boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{item.metric_name}</h2>
              <p style={{ fontSize: 20 }}>{item.metric_value}</p>
              <p style={{ color: "#777" }}>{item.updated_at?.split("T")[0]}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
