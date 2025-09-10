'use server';

import { NextRequest, NextResponse } from 'next/server';
import { updateUserServer } from '@/app/actions/userActions';

export async function POST(req: NextRequest) {
  try {
    const { userId, newPassword } = await req.json();

    if (!userId || !newPassword) {
      return NextResponse.json(
        { error: 'กรุณากรอกข้อมูลให้ครบ' },
        { status: 400 }
      );
    }

    // ใช้ฟังก์ชัน updateUserServer hash password ให้เอง
    await updateUserServer(userId, { password: newPassword });

    return NextResponse.json({ message: 'เปลี่ยนรหัสผ่านสำเร็จ' });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาด' },
      { status: 500 }
    );
  }
}
