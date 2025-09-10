'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserById, updateUserServer } from '@/app/actions/userActions';
import { useParams, useRouter } from 'next/navigation';

type CreateUserInput = {
  username: string;
  fullName: string;
  password?: string;
  role: 'user' | 'admin';
};

export default function EditUserForm() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<CreateUserInput>>({
    username: '',
    fullName: '',
    password: '',
    role: 'user',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(id as string);
        if (!user) {
          setMessage('❌ ไม่พบข้อมูลผู้ใช้');
          return;
        }
        setFormData({
          username: user.username,
          fullName: user.fullName,
          password: '', // ไม่โหลดรหัสผ่านเก่า
          role: user.role as 'user' | 'admin',
        });
      } catch {
        setMessage('❌ ไม่สามารถโหลดข้อมูลผู้ใช้');
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await updateUserServer(id as string, formData);
      setMessage('✅ แก้ไขข้อมูลเรียบร้อยแล้ว!');
      setTimeout(() => router.push('/admin'), 1500);
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
        ✏️ แก้ไขข้อมูลผู้ใช้
      </h2>

      {/* Username */}
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>ชื่อผู้ใช้</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="กรอกชื่อผู้ใช้"
        value={formData.username || ''}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Full Name */}
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>ชื่อ-นามสกุล</label>
      <input
        id="fullName"
        type="text"
        name="fullName"
        placeholder="กรอกชื่อ-นามสกุล"
        value={formData.fullName || ''}
        onChange={handleChange}
        required
        style={inputStyle}
      />

      {/* Password */}
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>รหัสผ่าน (ถ้าต้องการเปลี่ยน)</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="กรอกรหัสผ่านใหม่"
        value={formData.password || ''}
        onChange={handleChange}
        style={inputStyle}
      />

      {/* Role */}
      <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>สิทธิ์ผู้ใช้</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="user">ผู้ใช้ทั่วไป</option>
        <option value="admin">ผู้ดูแลระบบ</option>
      </select>

      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? '⏳ กำลังบันทึก...' : '✅ บันทึกการแก้ไข'}
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
