"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { Version } from "@/lib/types";

interface AddVersionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVersion: (version: Version) => void;
}

export default function AddVersionModal({
  isOpen,
  onClose,
  onAddVersion,
}: AddVersionModalProps) {
  const [versionNumber, setVersionNumber] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!versionNumber.trim()) {
      setError("버전 번호를 입력해주세요.");
      return;
    }

    const newVersion: Version = {
      id: Date.now().toString(),
      versionNumber,
      siteUrl: siteUrl.trim() || undefined,
      prompts: [],
      createdAt: new Date().toISOString(),
    };

    onAddVersion(newVersion);

    // Reset form
    setVersionNumber("");
    setSiteUrl("");
    setError("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Version</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="version">버전 번호</Label>
              <Input
                id="version"
                placeholder="예: 1.0.0"
                value={versionNumber}
                onChange={(e) => setVersionNumber(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">사이트 링크 (선택사항)</Label>
              <Input
                id="url"
                placeholder="https://example.com"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button type="submit">추가</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
