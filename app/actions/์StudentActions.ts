'use server';

// import PrismaClient จาก generated folder
import { PrismaClient } from '@prisma/client'; // ✅ ปรับ path ตามโครงสร้างโปรเจกต์จริง

const prisma = new PrismaClient();

export interface CreateStudentInput {
  firstName: string;
  lastName: string;
  major: string;
  faculty: string;
  email: string;
  phone: string;
}

// ✅ ฟังก์ชันสร้างนักศึกษา
export async function createStudent(data: CreateStudentInput) {
  try {
    const student = await prisma.student.create({ data });
    return student;
  } catch (error: any) {
    console.error('Error creating student:', error.message);
    throw new Error('Failed to create student');
  }
}

// ✅ ฟังก์ชันดึงนักศึกษาทั้งหมด
export async function getAllStudents() {
  try {
    const students = await prisma.student.findMany();
    return students;
  } catch (error: any) {
    console.error('Error fetching students:', error.message);
    throw new Error('Failed to fetch students');
  }
}

// ✅ ฟังก์ชันดึงข้อมูลนักศึกษาตาม ID
export async function getStudentById(id: string) {
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
    });
    if (!student) throw new Error('Student not found');
    return student;
  } catch (error: any) {
    console.error('Error fetching student:', error.message);
    throw new Error('Failed to fetch student');
  }
}

// ✅ ฟังก์ชันอัปเดตข้อมูลนักศึกษา
export async function updateStudent(id: string, data: Partial<CreateStudentInput>) {
  try {
    const student = await prisma.student.update({
      where: { id: Number(id) },
      data,
    });
    return student;
  } catch (error: any) {
    console.error('Error updating student:', error.message);
    throw new Error('Failed to update student');
  }
}

// ✅ ฟังก์ชันลบนักศึกษา (optional)
export async function deleteStudent(id: string) {
  try {
    await prisma.student.delete({
      where: { id: Number(id) },
    });
    return { message: 'Student deleted successfully' };
  } catch (error: any) {
    console.error('Error deleting student:', error.message);
    throw new Error('Failed to delete student');
  }
}
