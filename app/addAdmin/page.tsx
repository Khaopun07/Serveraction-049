'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createUser } from '../actions/userActions'; 

type CreateUserInput = {
  username: string;
  fullName: string;
  password: string;
  role?: "user" | "admin";
};

export default function AdmissionForm() {
  const [formData, setFormData] = useState<CreateUserInput>({
    username: '',
    fullName: '',
    password: '',
    role: 'user',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const user = await createUser(formData);
      setMessage(`✅ ${user.fullName} สมัครเรียบร้อยแล้ว!`);
      setFormData({
        username: '',
        fullName: '',
        password: '',
        role: 'user',
      });
    } catch (error: any) {
      setMessage(error.message || '❌ ไม่สามารถบันทึกข้อมูลได้');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px',
    border: '1px solid #FFA500',
    borderRadius: '6px',
    marginBottom: '12px',
    outline: 'none',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FFA500',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
  };

  const backButtonStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FFD580',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '8px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'block',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: '500px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #FFA500',
        borderRadius: '12px',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#FF8C00', marginBottom: '16px' }}>
        📝 สมัครสมาชิกใหม่
      </h2>

      {/* username */}
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
        ชื่อผู้ใช้
      </label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* fullName */}
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
        ชื่อ-นามสกุล
      </label>
      <input
        id="fullName"
        type="text"
        name="fullName"
        placeholder="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* password */}
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
        รหัสผ่าน
      </label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? '⏳ กำลังบันทึก...' : '✅ บันทึกข้อมูล'}
      </button>

      <Link href="/admin" style={backButtonStyle}>
        ⬅️ ย้อนกลับ
      </Link>

      {message && (
        <p
          style={{
            marginTop: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: message.startsWith('✅') ? 'green' : 'red',
          }}
        >
          {message}
        </p>
      )}
    </form>
  );
}
