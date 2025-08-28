// app/deleteaction/[id]/page.tsx
import { deleteStudent, getStudentById } from "@/app/actions/์StudentActions";
import { redirect } from "next/navigation";

interface DeletePageProps {
  params: { id: string };
}

// ฟอร์มยืนยันการลบ
export default async function DeleteStudentPage({ params }: DeletePageProps) {
  const { id } = params;

  // ดึงข้อมูลนักศึกษา
  const student = await getStudentById(id);

  if (!student) {
    return (
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'red' }}>
          ไม่พบนักศึกษา
        </h1>
      </main>
    );
  }

  // Server Action สำหรับลบ
  async function handleDelete() {
    "use server";
    await deleteStudent(id);
    redirect("/"); // กลับไปหน้าหลักหลังลบ
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#FFF5E6', // สีส้มอ่อน background
    padding: '20px',
  };

  const boxStyle: React.CSSProperties = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    border: '2px solid #FFA500', // ขอบสีส้ม
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#FF8C00', // สีส้มเข้ม
    marginBottom: '12px',
  };

  const messageStyle: React.CSSProperties = {
    color: '#555',
    marginBottom: '20px',
  };

  const deleteButtonStyle: React.CSSProperties = {
    padding: '10px 16px',
    backgroundColor: '#FFA500',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const cancelButtonStyle: React.CSSProperties = {
    padding: '10px 16px',
    backgroundColor: '#FFD580',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginLeft: '10px',
    textDecoration: 'none',
  };

  return (
    <main style={containerStyle}>
      <div style={boxStyle}>
        <h1 style={titleStyle}>ยืนยันการลบข้อมูลนักศึกษา</h1>
        <p style={messageStyle}>
          คุณแน่ใจหรือไม่ว่าต้องการลบ{" "}
          <span style={{ fontWeight: 'bold', color: '#FF8C00' }}>
            {student.firstName} {student.lastName}
          </span>{" "}
          ออกจากระบบ?
        </p>

        <form action={handleDelete} style={{ display: 'flex', justifyContent: 'center' }}>
          <button type="submit" style={deleteButtonStyle}>
            ✅ ยืนยันลบ
          </button>
          <a href="/" style={cancelButtonStyle}>
            ❌ ยกเลิก
          </a>
        </form>
      </div>
    </main>
  );
}
