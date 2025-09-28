"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../auth-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/homeButton";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

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
      setError("Network error");
    }
  };

  return (
    <AuthLayout title="Create your account">
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button className="w-full" onClick={handleSignup}>
          Sign Up
        </Button>
      </div>
    </AuthLayout>
  );
}
