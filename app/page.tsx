"use client";
import React, { useState, useEffect } from "react";
import Loader from "@/app/componnets/ui/loader";
import LoginForm from "./componnets/login/LoginForm";
import { useRouter } from "next/navigation";

function Page() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); 
    router.push("/login");
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Loader/>
    );
  }

  return <></>;
}

export default Page;
