import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = 'https://mern-backend-dung237030.onrender.com/api/students';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId || !name || !email) return;

    try {
      if (editingId) {
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, name, email }),
        });
        if (response.ok) {
          setEditingId(null);
        }
      } else {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, name, email }),
        });
        if (!response.ok) {
          console.error('Lỗi khi thêm sinh viên');
        }
      }

      setStudentId('');
      setName('');
      setEmail('');
      fetchStudents();
    } catch (error) {
      console.error('Lỗi:', error);
    }
  };

  const handleEdit = (sv) => {
    setEditingId(sv._id);
    setStudentId(sv.studentId);
    setName(sv.name);
    setEmail(sv.email);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) return;
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchStudents();
      }
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Quản Lý Sinh Viên</h1>
      </header>

      <form onSubmit={handleSubmit} className="form-group">
        <input 
          type="text" 
          placeholder="Mã số sinh viên" 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Họ và tên" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <button type="submit" style={{ background: editingId ? '#ffc107' : '#4f46e5', color: '#fff' }}>
          {editingId ? 'Cập Nhật' : 'Thêm Sinh Viên'}
        </button>
        {editingId && (
          <button 
            type="button" 
            style={{ background: '#6c757d', color: '#fff', marginLeft: '5px' }} 
            onClick={() => { 
              setEditingId(null); 
              setStudentId(''); 
              setName(''); 
              setEmail(''); 
            }}
          >
            Hủy
          </button>
        )}
      </form>

      <div className="table-container">
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
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map((sv, index) => (
                <tr key={sv._id || index}>
                  <td>{index + 1}</td>
                  <td><span className="badge">{sv.studentId}</span></td>
                  <td className="font-semibold">{sv.name}</td>
                  <td>{sv.email}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(sv)} 
                      style={{ marginRight: '5px', padding: '5px 10px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Sửa
                    </button>
                    <button 
                      onClick={() => handleDelete(sv._id)} 
                      style={{ padding: '5px 10px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Xóa
                    </button>
                  </td>
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