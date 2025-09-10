import React from 'react';
import Link from 'next/link';
import { getAllStudents } from '../actions/์StudentActions';
import Header from '@/app/Header';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function StudentListDisplay() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const students = await getAllStudents();

  return (
    <>
      {/* Header พร้อม Logout */}
      <Header session={session} />

      <main className="p-6">
        <h1 style={{ color: '#FF8C00', marginBottom: '16px', fontSize: '1.5rem' }}>รายชื่อนักศึกษา</h1>

        {/* ปุ่มเพิ่มนักศึกษา */}
        <div>
          <Link
            href="/addaction"
            style={{
              display: 'inline-block',
              marginTop: '8px',
              padding: '6px 12px',
              backgroundColor: '#FFA500',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
            }}
          >
            + เพิ่มนักศึกษา
          </Link>
        </div>

        {students.length > 0 ? (
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '16px',
            }}
          >
            <thead>
              <tr>
                <th style={{ backgroundColor: '#FFA500', color: 'white', padding: '8px' }}>ID</th>
                <th style={{ backgroundColor: '#FFA500', color: 'white', padding: '8px' }}>ชื่อ-นามสกุล</th>
                <th style={{ backgroundColor: '#FFA500', color: 'white', padding: '8px' }}>สาขาวิชา</th>
                <th style={{ backgroundColor: '#FFA500', color: 'white', padding: '8px' }}>คณะ</th>
                <th style={{ backgroundColor: '#FFA500', color: 'white', padding: '8px' }}>อีเมล</th>
                <th style={{ backgroundColor: '#FFA500', color: 'white', padding: '8px' }}>เบอร์โทร</th>
                <th style={{ backgroundColor: '#FFA500', color: 'white', padding: '8px' }}>วันที่สมัคร</th>
                <th style={{ backgroundColor: '#FFA500', color: 'white', padding: '8px' }}>การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td style={{ border: '1px solid #FFA500', padding: '8px' }}>{student.id}</td>
                  <td style={{ border: '1px solid #FFA500', padding: '8px' }}>
                    {student.firstName} {student.lastName}
                  </td>
                  <td style={{ border: '1px solid #FFA500', padding: '8px' }}>{student.major}</td>
                  <td style={{ border: '1px solid #FFA500', padding: '8px' }}>{student.faculty}</td>
                  <td style={{ border: '1px solid #FFA500', padding: '8px' }}>
                    <a href={`mailto:${student.email}`} style={{ color: '#FFA500', textDecoration: 'none' }}>
                      {student.email}
                    </a>
                  </td>
                  <td style={{ border: '1px solid #FFA500', padding: '8px' }}>{student.phone}</td>
                  <td style={{ border: '1px solid #FFA500', padding: '8px' }}>
                    {new Date(student.createdAt).toLocaleDateString('th-TH')}
                  </td>
                  <td style={{ border: '1px solid #FFA500', padding: '8px' }}>
                    <Link href={`/editaction/${student.id}`} style={{ color: '#FFA500', marginRight: '8px' }}>
                      แก้ไข
                    </Link>
                    <Link href={`/Deleteaction/${student.id}`} style={{ color: '#FFA500' }}>
                      ลบ
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: '16px' }}>ไม่มีข้อมูลนักศึกษา</p>
        )}
      </main>
    </>
  );
}
