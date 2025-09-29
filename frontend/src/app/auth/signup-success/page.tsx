"use client";

import Link from "next/link";
import AuthLayout from "../auth-layout";

export default function SignupSuccessPage() {
  return (
    <AuthLayout title="">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Signup Successful!</h1>
        <p className="mb-6">Your account has been created successfully.</p>
        <p>
          <Link href="/auth/login" className="text-blue-600 underline">
            Login with your account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
