"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/app/componnets/ui/loader";
import LoginForm from "@/app/componnets/login/LoginForm";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";

function Page() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth(false);
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      router.push('/dashboard');
      return;
    }

    // ⏳ Simulate loading (e.g., fetching user/auth state)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1.5 sec loader, adjust as needed
    return () => clearTimeout(timer);
  }, [isAuthenticated, router]);

  if (loading) {
    //  Show same loader here
    return (
      <Loader/>
    );
  }

  return <LoginForm />;
}

export default Page;
