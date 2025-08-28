import React from "react";
import AdmissionForm from "../Component/AdmissionForm";

export default function AddActionPage() {
  return (
    <main className="p-8 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          แบบฟอร์มสมัครนักศึกษาใหม่
        </h1>

        {/* ฟอร์มสมัคร */}
        <AdmissionForm />
      </div>
    </main>
  );
}
