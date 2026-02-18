"use client"

import React, { useEffect, useState } from 'react'
import Loader from '@/app/componnets/ui/loader';
import AddHouseHelpWorkerForm from '@/app/componnets/house-help-worker/AddHouseHelpWorkerForm';

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
      <Loader />
    );
  }

  return <AddHouseHelpWorkerForm />;
}

export default Page
