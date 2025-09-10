'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import React, { useState } from 'react';

interface HeaderProps {
  session: {
    user: {
      id: string;
      username: string;
      role: string;
    };
  } | null;
}

export default function Header({ session }: HeaderProps) {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.user.id, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('เปลี่ยนรหัสผ่านสำเร็จ ✅');
        setNewPassword('');
      } else {
        setMessage(`เกิดข้อผิดพลาด: ${data.error}`);
      }
    } catch (err) {
      setMessage('เกิดข้อผิดพลาด');
    }
  };

  return (
    <header className="bg-orange-500 text-white p-4 shadow-md flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 className="text-lg font-bold">ระบบจัดการนักศึกษา</h1>

      <div className="flex flex-col md:flex-row md:items-center mt-2 md:mt-0">
        {session ? (
          <>
            <div className="flex items-center">
              <span className="mr-4">สวัสดี, {session.user.username}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="mr-2 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                ⏏️ Logout
              </button>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
              >
                เปลี่ยนรหัสผ่าน
              </button>
            </div>

            {showPasswordForm && (
              <form
                onSubmit={handleChangePassword}
                className="mt-2 md:mt-0 flex flex-col md:flex-row items-start md:items-center"
              >
                <input
                  type="password"
                  placeholder="รหัสผ่านใหม่"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border p-2 rounded mr-0 md:mr-2 mb-2 md:mb-0"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  บันทึก
                </button>
                {message && (
                  <p className="mt-2 md:mt-0 md:ml-2 text-green-200">{message}</p>
                )}
              </form>
            )}
          </>
        ) : (
          <div className="flex items-center">
            <Link href="/login" className="mr-4 hover:underline">
              Login
            </Link>
            <Link href="/register" className="hover:underline">
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
