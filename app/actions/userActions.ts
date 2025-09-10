'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export interface CreateUserInput {
  username: string;
  fullName: string;
  password: string;
  role?: 'user' | 'admin';
}

// ✅ ดึงผู้ใช้ทั้งหมด
export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });
    return users;
  } catch (error: any) {
    console.error('Error fetching users:', error.message);
    throw new Error('Failed to fetch users');
  }
}

// ✅ ดึงผู้ใช้ตาม ID
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) throw new Error('User not found');
    return user;
  } catch (error: any) {
    console.error('Error fetching user:', error.message);
    throw new Error('Failed to fetch user');
  }
}

// ✅ สร้างผู้ใช้ใหม่
export async function createUser(data: CreateUserInput) {
  try {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        fullName: data.fullName,
        password: data.password, // แนะนำ: hash ก่อนบันทึก
        role: data.role || 'user',
      },
    });
    return user;
  } catch (error: any) {
    console.error('Error creating user:', error.message);
    throw new Error('Failed to create user');
  }
}

// ✅ อัปเดตข้อมูลผู้ใช้ (เข้ารหัสรหัสผ่านถ้ามีการเปลี่ยน)
export async function updateUserServer(id: string, data: Partial<CreateUserInput>) {
  const updateData: Partial<CreateUserInput> = {
    username: data.username,
    fullName: data.fullName,
    role: data.role,
  };

  if (data.password && data.password.trim() !== '') {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    updateData.password = hashedPassword;
  }

  return prisma.user.update({
    where: { id: Number(id) },
    data: updateData,
  });
}

// ✅ ลบผู้ใช้
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    return { message: 'User deleted successfully' };
  } catch (error: any) {
    console.error('Error deleting user:', error.message);
    throw new Error('Failed to delete user');
  }
}
