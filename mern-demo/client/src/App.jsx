import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ studentId: '', name: '', email: '' });

 const API_URL = 'http://localhost:5000/api/students';

  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Loi lay danh sach sinh vien:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setForm({ studentId: '', name: '', email: '' });
      fetchStudents();
    } catch (err) {
      console.error("Loi them sinh vien:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (err) {
      console.error("Loi xoa sinh vien:", err);
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', color: '#fff' }}>
      <h1>Quan Ly Sinh Vien (MERN Stack)</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          placeholder="MSSV" 
          value={form.studentId} 
          onChange={e => setForm({...form, studentId: e.target.value})} 
          required 
        />
        <input 
          placeholder="Ho Ten" 
          value={form.name} 
          onChange={e => setForm({...form, name: e.target.value})} 
          required 
        />
        <input 
          placeholder="Email" 
          value={form.email} 
          onChange={e => setForm({...form, email: e.target.value})} 
          required 
        />
        <button type="submit">Them Sinh Vien</button>
      </form>

      <h2>Danh Sach Sinh Vien</h2>
      <ul>
        {students.map(s => (
          <li key={s._id} style={{ marginBottom: '10px' }}>
            <b>{s.studentId}</b> - {s.name} ({s.email}) {' '}
            <button onClick={() => handleDelete(s._id)}>Xoa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;