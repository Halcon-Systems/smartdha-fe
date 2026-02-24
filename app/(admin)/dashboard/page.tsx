"use client"

import React, { useEffect, useState } from 'react'
import About from '../../componnets/About'
import Loader from '../../componnets/ui/loader';
import Dashboard from '@/app/componnets/dashboard/Dashboard';
import { useAuth } from '@/app/hooks/useAuth';

const Page = () => {
  const { isAuthenticated, loading, user } = useAuth(true);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login automatically
  }

  return <Dashboard />;
}

export default Page