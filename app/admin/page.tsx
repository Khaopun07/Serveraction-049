import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Link from 'next/link';
import { getAllStudents } from '@/app/actions/์StudentActions';
import { getAllUsers } from '@/app/actions/userActions';
import Header from '../Header';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/login');
  }

  const students = await getAllStudents();
  const users = await getAllUsers();

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px',
  };

  const thTdStyle: React.CSSProperties = {
    border: '1px solid #FFA500',
    padding: '8px',
    textAlign: 'left',
  };

  const headerStyle: React.CSSProperties = {
    color: 'white',
    backgroundColor: '#FFA500',
    padding: '8px',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    marginTop: '8px',
    padding: '6px 12px',
    backgroundColor: '#FFA500',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '4px',
  };

  const linkStyle: React.CSSProperties = {
    color: '#FFA500',
    textDecoration: 'none',
    marginRight: '8px',
  };

  return (
    <>
      {/* Header พร้อม Logout */}
      <Header session={session} />

      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Area</h1>
        <p>ผู้ใช้: {session.user.username}</p>
        <p>บทบาท: {session.user.role}</p>
        <p className="text-sm text-gray-600 mt-2 mb-4">
          หน้านี้สําหรับผู้ดูแลระบบเท่านั้น
        </p>

        {/* Section นักศึกษา */}
        <section>
          <h2 className="text-xl font-semibold mb-2">รายชื่อนักศึกษา</h2>
          <Link href="/addStudent" style={buttonStyle}>
            + เพิ่มนักศึกษา
          </Link>

          {students.length > 0 ? (
            <table style={tableStyle} className="mt-4">
              <thead>
                <tr>
                  <th style={headerStyle}>ID</th>
                  <th style={headerStyle}>ชื่อ-นามสกุล</th>
                  <th style={headerStyle}>สาขาวิชา</th>
                  <th style={headerStyle}>คณะ</th>
                  <th style={headerStyle}>อีเมล</th>
                  <th style={headerStyle}>เบอร์โทร</th>
                  <th style={headerStyle}>วันที่สมัคร</th>
                  <th style={headerStyle}>การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td style={thTdStyle}>{student.id}</td>
                    <td style={thTdStyle}>
                      {student.firstName} {student.lastName}
                    </td>
                    <td style={thTdStyle}>{student.major}</td>
                    <td style={thTdStyle}>{student.faculty}</td>
                    <td style={thTdStyle}>
                      <a href={`mailto:${student.email}`} style={linkStyle}>
                        {student.email}
                      </a>
                    </td>
                    <td style={thTdStyle}>{student.phone}</td>
                    <td style={thTdStyle}>
                      {new Date(student.createdAt).toLocaleDateString('th-TH')}
                    </td>
                    <td style={thTdStyle}>
                      <Link href={`/editStudent/${student.id}`} style={linkStyle}>
                        แก้ไข
                      </Link>
                      <Link href={`/deleteStudent/${student.id}`} style={linkStyle}>
                        ลบ
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4">ไม่มีข้อมูลนักศึกษา</p>
          )}
        </section>

        {/* Section ผู้ใช้ */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-2">รายชื่อผู้ใช้</h2>
          <Link href="/addAdmin" style={buttonStyle}>
            + เพิ่มผู้ใช้
          </Link>

          {users.length > 0 ? (
            <table style={tableStyle} className="mt-4">
              <thead>
                <tr>
                  <th style={headerStyle}>ID</th>
                  <th style={headerStyle}>Username</th>
                  <th style={headerStyle}>ชื่อเต็ม</th>
                  <th style={headerStyle}>บทบาท</th>
                  <th style={headerStyle}>วันที่สร้าง</th>
                  <th style={headerStyle}>การจัดการ</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={thTdStyle}>{user.id}</td>
                    <td style={thTdStyle}>{user.username}</td>
                    <td style={thTdStyle}>{user.fullName}</td>
                    <td style={thTdStyle}>{user.role}</td>
                    <td style={thTdStyle}>
                      {new Date(user.createdAt).toLocaleDateString('th-TH')}
                    </td>
                    <td style={thTdStyle}>
                      <Link href={`/editAdmin/${user.id}`} style={linkStyle}>
                        แก้ไข
                      </Link>
                      <Link href={`/deleteAdmin/${user.id}`} style={linkStyle}>
                        ลบ
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4">ไม่มีข้อมูลผู้ใช้</p>
          )}
        </section>
      </main>
    </>
  );
}
