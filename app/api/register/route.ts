import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
    const { username, fullName, password, role } = await req.json()

    if (!username || !fullName || !password) {
        return NextResponse.json({ error: 'username / fullName / password ห้ามว่าง' }, { status: 400 })
    }

    const exists = await prisma.user.findUnique({ where: { username } })
    if (exists) {
        return NextResponse.json({ error: 'username นี้ถูกใช้แล้ว' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: { 
            username, 
            fullName, // เพิ่ม fullName
            password: hashed, 
            role: role === 'admin' ? 'admin' : 'user' 
        },
        select: { id: true, username: true, fullName: true, role: true, createdAt: true, updatedAt: true },
    })

    return NextResponse.json({ user }, { status: 201 })
}
