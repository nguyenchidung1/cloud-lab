import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [mssv, setMssv] = useState('');
  const [hoTen, setHoTen] = useState('');
  const [email, setEmail] = useState('');

  // Thay bằng link Backend API của Dũng trên Render (đừng để dấu / ở cuối)
  const API_URL = 'https://mern-backend-dung237030.onrender.com/api/students';

  // Lấy danh sách sinh viên từ Backend
  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
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
    if (!mssv || !hoTen || !email) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mssv, hoTen, email }),
      });

      if (response.ok) {
        setMssv('');
        setHoTen('');
        setEmail('');
        fetchStudents(); // Tải lại danh sách
      } else {
        alert('Thêm sinh viên thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi thêm:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Quản Lý Sinh Viên</h1>
        <p className="subtitle">MERN Stack - Nền tảng hiện đại</p>

        {/* Form thêm sinh viên */}
        <form onSubmit={handleSubmit} className="student-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Mã số sinh viên (MSSV)"
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
          </div>
          <button type="submit" className="btn-submit">Thêm Sinh Viên</button>
        </form>

        {/* Bảng danh sách sinh viên */}
        <div className="table-container">
          <h2 className="section-title">Danh Sách Sinh Viên</h2>
          {students.length === 0 ? (
            <p className="empty-text">Chưa có dữ liệu sinh viên nào.</p>
          ) : (
            <table className="student-table">
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
    </div>
  );
}

export default App;