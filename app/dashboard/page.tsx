"use client";

import Navbar from "@/components/general/navbar";
import { useUser } from "@clerk/nextjs";
import React from "react";

const Dashboard = () => {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome back,{" "}
            {user?.firstName ?? user?.emailAddresses[0].emailAddress}!
            🙌
          </h1>
          <p className="text-gray-600">
            Here&apos;s what happening with your boards today
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
