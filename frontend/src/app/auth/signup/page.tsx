"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../auth-layout";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/homeButton";
import { Eye, EyeOff } from "@/components/ui/showPassIcon";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  let passwordAriaLabel = "Show password";
  if (showPassword) passwordAriaLabel = "Hide password";

  let confirmPasswordAriaLabel = "Show confirm password";
  if (showConfirmPassword) confirmPasswordAriaLabel = "Hide confirm password";

  const handleSignup = async () => {
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard"); // redirect after signup
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Network error");
    }
  };

  return (
    <AuthLayout title="">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="text-sm font-semibold text-muted-foreground">Insync</div>
          <h1 className="text-4xl font-semibold mt-4 text-foreground">Create your account</h1>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-md">
          <div className="space-y-4">
            <Button asChild variant="default" size="default" className="w-full bg-white text-black">
              <a href="/api/auth/google" role="button" aria-label="Continue with Google">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 48 48"
                  className="inline-block"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
                Continue with Google
              </a>
            </Button>

            <div className="flex items-center text-muted-foreground text-sm">
              <div className="flex-1 h-px bg-border" />
              <div className="px-3">or</div>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">Email address</label>
              <Input
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer hover:opacity-70 transition-opacity"
                  aria-label={passwordAriaLabel}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground block mb-2">Confirm password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label={confirmPasswordAriaLabel}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="w-full" onClick={handleSignup}>
              Sign Up
            </Button>
          </div>
        </div>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
