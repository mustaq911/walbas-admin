"use client";
import React, { useEffect, useState } from 'react';
import AppContent from '@/components/admin/content/app-content';
import Cookies from 'js-cookie';
import { toast } from 'sonner';

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = Cookies.get('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.warn('No username found in cookies'); // Debug log
      toast.error('User not authenticated. Please log in.');
      // Optionally redirect to login if no username is found
      // window.location.href = '/login';
    }
  }, []);

  return (
    <AppContent title="Dashboard">
      {username ? (
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Welcome, {username}!</h2>
          {/* <p className="mt-2 text-muted-foreground">We&#39;re glad to have you back!</p> */}
        </div>
      ) : (
        <div className="p-6">
          <p className="text-muted-foreground">Loading user information...</p>
        </div>
      )}
    </AppContent>
  );
}