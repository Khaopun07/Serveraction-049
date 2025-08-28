'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStudentById, updateStudent } from '../../actions/์StudentActions'; 
import { useParams, useRouter } from 'next/navigation';

export default function EditStudentForm() {
  const { id } = useParams();
  const router = useRouter();

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

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const student = await getStudentById(id as string);
        setFormData({
          firstName: student.firstName,
          lastName: student.lastName,
          major: student.major,
          faculty: student.faculty,
          email: student.email,
          phone: student.phone,
        });
      } catch {
        setMessage('❌ ไม่พบข้อมูลนักศึกษา');
      }
    };
    if (id) fetchStudent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await updateStudent(id as string, formData);
      setMessage('✅ แก้ไขข้อมูลเรียบร้อยแล้ว!');
      setTimeout(() => router.push('/'), 1500);
    } catch (error: any) {
      setMessage(error.message || '❌ ไม่สามารถแก้ไขข้อมูลได้');
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
        border: '2px solid #FFA500',
        borderRadius: '12px',
        backgroundColor: 'white',
      }}
    >
      <h2 style={{ textAlign: 'center', color: '#FF8C00', marginBottom: '16px', fontSize: '22px', fontWeight: 'bold' }}>
        ✏️ แก้ไขข้อมูลนักศึกษา
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
        {loading ? '⏳ กำลังบันทึก...' : '✅ บันทึกการแก้ไข'}
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
