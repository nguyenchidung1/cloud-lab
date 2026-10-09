import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [mssv, setMssv] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [email, setEmail] = useState('');

  // Lấy danh sách sinh viên từ backend
  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Thêm sinh viên mới
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mssv || !hoTen || !email) return;

    try {
      const response = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mssv, hoTen, email }),
      });

      if (response.ok) {
        setMssv('');
        setHoTen('');
        setEmail('');
        fetchStudents();
      }
    } catch (error) {
      console.error('Lỗi khi thêm sinh viên:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Quản Lý Sinh Viên</h1>
        <p>MERN Stack - Minimalist</p>
      </header>

      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          placeholder="Mã số sinh viên"
          value={mssv}
          onChange={(e) => setMssv(e.target.value)}
        />
        <input
          type="text"
          placeholder="Họ và tên"
          value={hoTen}
          onChange={(e) => setHoTen(e.target.value)}
        />
        <input
          type="email"
          placeholder="Địa chỉ Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Thêm Sinh Viên</button>
      </form>

      <div className="list-container">
        <h2>Danh Sách Sinh Viên</h2>
        {students.length === 0 ? (
          <p className="empty-text">Chưa có dữ liệu sinh viên nào.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>MSSV</th>
                <th>Họ và Tên</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((sv, index) => (
                <tr key={sv._id || index}>
                  <td>{index + 1}</td>
                  <td><span className="badge">{sv.mssv}</span></td>
                  <td className="font-semibold">{sv.hoTen}</td>
                  <td>{sv.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;