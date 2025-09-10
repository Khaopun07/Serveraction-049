'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-orange-500 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">ระบบจัดการนักศึกษา</h1>
        <nav className="space-x-4">
          { }
          {/* Navigation links */}
          <Link href="/login" className="hover:underline">
            Logout
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow p-6">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} ระบบจัดการนักศึกษา. สงวนลิขสิทธิ์.
      </footer>
    </div>
  );
}
