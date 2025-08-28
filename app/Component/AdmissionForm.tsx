'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createStudent } from '../actions/์StudentActions';

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    major: '',
    faculty: '',
    email: '',
    phone: '',
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
      const student = await createStudent(formData);
      setMessage(
        `✅ ${student.firstName} ${student.lastName} สมัครเรียบร้อยแล้ว!`
      );
      setFormData({
        firstName: '',
        lastName: '',
        major: '',
        faculty: '',
        email: '',
        phone: '',
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
        📝 ฟอร์มสมัครนักศึกษาใหม่
      </h2>

      {['firstName', 'lastName', 'major', 'faculty', 'email', 'phone'].map(
        field => (
          <div key={field}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              {field === 'firstName'
                ? 'ชื่อ'
                : field === 'lastName'
                ? 'นามสกุล'
                : field === 'major'
                ? 'สาขาวิชา'
                : field === 'faculty'
                ? 'คณะ'
                : field === 'email'
                ? 'อีเมล'
                : 'เบอร์โทร'}
            </label>
            <input
              id={field}
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={`กรอก${field}`}
              value={formData[field as keyof typeof formData]}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>
        )
      )}

      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? '⏳ กำลังบันทึก...' : '✅ บันทึกข้อมูล'}
      </button>

      <Link href="/" style={backButtonStyle}>
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
