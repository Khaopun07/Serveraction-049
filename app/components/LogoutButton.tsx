'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      style={{
        padding: '8px 16px',
        backgroundColor: '#FF6347',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginBottom: '16px',
      }}
    >
      ⏏️ ออกจากระบบ
    </button>
  );
}
