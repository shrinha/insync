import { ReactNode } from "react";
import "@/styles/shadcn.css";

export default function AuthLayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="shadcn min-h-screen flex flex-col justify-center items-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-xl shadow-lg border border-border">
        <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
}
