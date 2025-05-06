"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkAuth } from "@/lib/db";

interface PasswordProtectionProps {
  onAuthenticate: (success: boolean) => void;
}

export default function PasswordProtection({
  onAuthenticate,
}: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const isAuthenticated = await checkAuth(password);
      if (isAuthenticated) {
        onAuthenticate(true);
      } else {
        setError("비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("인증 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Version History</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
            <Button type="submit" className="w-full">
              접속하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
