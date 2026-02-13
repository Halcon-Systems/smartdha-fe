"use client"

import React, { useEffect, useState } from 'react'
import About from '../../componnets/About'
import Loader from '../../componnets/ui/loader';
import Dashboard from '@/app/componnets/dashboard/Dashboard';

const Page = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ⏳ Simulate loading (e.g., fetching user/auth state)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1.5 sec loader, adjust as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    //  Show same loader here
    return (
      <Loader/>
    );
  }

  return <Dashboard />;
}

export default Page