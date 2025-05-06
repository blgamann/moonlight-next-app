"use client";

import { Palette, Laptop } from "lucide-react";
import type { Version } from "@/lib/types";

interface VersionTimelineProps {
  versions: Version[];
  selectedVersion: Version | null;
  onSelectVersion: (version: Version) => void;
}

// 버전 번호를 분석하여 [major, minor, patch] 형태로 반환하는 함수
const parseVersionNumber = (versionNumber: string): number[] => {
  const parts = versionNumber.split(".");
  return parts.map((part) => Number.parseInt(part, 10) || 0);
};

// 두 버전 사이에 주요 변경이 있는지 확인하는 함수
const hasMajorChange = (prevVersion: string, nextVersion: string): boolean => {
  const prev = parseVersionNumber(prevVersion);
  const next = parseVersionNumber(nextVersion);

  // major 또는 minor 버전이 변경된 경우
  return prev[0] !== next[0] || prev[1] !== next[1];
};

export default function VersionTimeline({
  versions,
  selectedVersion,
  onSelectVersion,
}: VersionTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
      <div className="space-y-8">
        {versions.map((version, index) => {
          // 디자인 및 개발 프롬프트 개수 계산
          const designPrompts = version.prompts.filter(
            (p) => p.type === "design"
          ).length;
          const devPrompts = version.prompts.filter(
            (p) => p.type === "development"
          ).length;

          // 현재 버전과 다음 버전 사이에 주요 변경이 있는지 확인
          const nextVersion =
            index > 0 ? versions[index - 1].versionNumber : null;
          const showDivider =
            nextVersion && hasMajorChange(version.versionNumber, nextVersion);

          return (
            <div key={version.id}>
              <div className="relative pl-10">
                {index > 0 && showDivider && (
                  <div className="absolute -top-4 left-0 right-0">
                    <hr className="border-t border-gray-300 border-dashed" />
                  </div>
                )}
                <div
                  className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedVersion?.id === version.id
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
                <button
                  onClick={() => onSelectVersion(version)}
                  className={`text-left block w-full ${
                    selectedVersion?.id === version.id
                      ? "font-medium"
                      : "text-gray-600"
                  }`}
                >
                  <div className="bg-gray-50 p-3 rounded-md hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">
                          v{version.versionNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(version.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                          <Palette className="w-5 h-5 text-cyan-600" />
                          <span>{designPrompts}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full">
                          <Laptop className="w-5 h-5 text-cyan-600" />
                          <span>{devPrompts}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
