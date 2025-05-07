"use client";

import React, { useState } from "react";
import { Button } from "./button";

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

export function PasswordProtection({ onAuthenticated }: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234") {
      localStorage.setItem("authenticated", "true");
      onAuthenticated();
    } else {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleLogin = () => {
    if (password === "1234") {
      localStorage.setItem("authenticated", "true");
      onAuthenticated();
    } else {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Moonlight</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#39d4e7]"
            placeholder="비밀번호를 입력하세요"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="w-full">
          <Button onClick={handleLogin} className="w-full">
            로그인
          </Button>
        </div>
      </form>
    </div>
  );
}
