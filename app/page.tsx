import React from 'react';
import Link from 'next/link';
import { getAllStudents } from './actions/์StudentActions';

export default async function StudentListDisplay() {
  const students = await getAllStudents();

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px',
  };

  const thTdStyle: React.CSSProperties = {
    border: '1px solid #FFA500', // สีส้ม
    padding: '8px',
    textAlign: 'left',
  };

  const headerStyle: React.CSSProperties = {
    color: 'white',
    backgroundColor: '#FFA500', // สีส้ม
    padding: '8px',
  };

  const buttonStyle: React.CSSProperties = {
    display: 'inline-block',
    marginTop: '8px',
    padding: '6px 12px',
    backgroundColor: '#FFA500', // สีส้ม
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
    <main>
      <h1 style={{ color: '#FF8C00' }}>รายชื่อนักศึกษา</h1>

      {/* ปุ่มเพิ่มนักศึกษา */}
      <div>
        <Link href="/addaction" style={buttonStyle}>
          + เพิ่มนักศึกษา
        </Link>
      </div>

      {students.length > 0 ? (
        <table style={tableStyle}>
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
            {students.map(student => (
              <tr key={student.id}>
                <td style={thTdStyle}>{student.id}</td>
                <td style={thTdStyle}>{student.firstName} {student.lastName}</td>
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
                  <Link href={`/editaction/${student.id}`} style={linkStyle}>
                    แก้ไข
                  </Link>
                  <Link href={`/Deleteaction/${student.id}`} style={linkStyle}>
                    ลบ
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>ไม่มีข้อมูลนักศึกษา</p>
      )}
    </main>
  );
}
