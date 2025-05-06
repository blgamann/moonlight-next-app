"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Palette, Laptop } from "lucide-react";
import { ExternalLink } from "lucide-react";
import AddVersionModal from "@/components/add-version-modal";
import VersionTimeline from "@/components/version-timeline";
import type { Version } from "@/lib/types";
import { getVersions, addVersion, addPrompt, deletePrompt } from "@/lib/db";

export default function VersionHistory() {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPrompt, setNewPrompt] = useState("");
  const [newReflection, setNewReflection] = useState(""); // 느낀점 상태 추가
  const [activeTab, setActiveTab] = useState("design");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadVersions() {
      setIsLoading(true);
      try {
        const loadedVersions = await getVersions();
        setVersions(loadedVersions);

        // Select the first version if available
        if (loadedVersions.length > 0) {
          setSelectedVersion(loadedVersions[0]);
        }
      } catch (error) {
        console.error("Error loading versions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadVersions();
  }, []);

  const handleAddVersion = async (newVersionData: Omit<Version, "id">) => {
    try {
      const newVersion = await addVersion(newVersionData);
      if (newVersion) {
        const updatedVersions = [newVersion, ...versions];
        setVersions(updatedVersions);
        setSelectedVersion(newVersion);
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error("Error adding version:", error);
    }
  };

  const handleSelectVersion = (version: Version) => {
    setSelectedVersion(version);
  };

  const handleAddPrompt = async () => {
    if (!newPrompt.trim() || !selectedVersion) return;

    const promptData = {
      content: newPrompt,
      type: activeTab as "design" | "development",
      reflection: newReflection.trim() || undefined, // 느낀점 추가
      createdAt: new Date().toISOString(),
    };

    try {
      const newPrompt = await addPrompt(selectedVersion.id, promptData);
      if (newPrompt) {
        const updatedVersions = versions.map((version) => {
          if (version.id === selectedVersion.id) {
            return {
              ...version,
              prompts: [...version.prompts, newPrompt],
            };
          }
          return version;
        });

        setVersions(updatedVersions);

        // Update selected version
        const updatedVersion = updatedVersions.find(
          (v) => v.id === selectedVersion.id
        );
        if (updatedVersion) {
          setSelectedVersion(updatedVersion);
        }

        setNewPrompt("");
        setNewReflection(""); // 느낀점 초기화
      }
    } catch (error) {
      console.error("Error adding prompt:", error);
    }
  };

  const handleDeletePrompt = async (promptId: string) => {
    if (!selectedVersion) return;

    // Ask for confirmation before deleting
    if (window.confirm("정말로 이 프롬프트를 삭제하시겠습니까?")) {
      try {
        const success = await deletePrompt(promptId, selectedVersion.id);
        if (success) {
          const updatedVersions = versions.map((version) => {
            if (version.id === selectedVersion.id) {
              return {
                ...version,
                prompts: version.prompts.filter((p) => p.id !== promptId),
              };
            }
            return version;
          });

          setVersions(updatedVersions);

          // Update selected version
          const updatedVersion = updatedVersions.find(
            (v) => v.id === selectedVersion.id
          );
          if (updatedVersion) {
            setSelectedVersion(updatedVersion);
          }
        }
      } catch (error) {
        console.error("Error deleting prompt:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">moonlight</h1>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddModalOpen(true)}>
              Add new version
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 container mx-auto">
        <aside className="w-96 border-r p-6">
          <h2 className="text-xl font-semibold mb-6">version history</h2>
          <VersionTimeline
            versions={versions}
            selectedVersion={selectedVersion}
            onSelectVersion={handleSelectVersion}
          />
        </aside>

        <main className="flex-1 p-6">
          {selectedVersion ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">
                    v{selectedVersion.versionNumber}{" "}
                    <span className="text-gray-500 text-base ml-2">
                      {new Date(selectedVersion.createdAt).toLocaleDateString()}
                    </span>
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <Palette className="w-5 h-5 text-cyan-600" />
                    <span>
                      {
                        selectedVersion.prompts.filter(
                          (p) => p.type === "design"
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                    <Laptop className="w-5 h-5 text-cyan-600" />
                    <span>
                      {
                        selectedVersion.prompts.filter(
                          (p) => p.type === "development"
                        ).length
                      }
                    </span>
                  </div>
                  {selectedVersion.siteUrl && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a
                        href={selectedVersion.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        사이트 링크 <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <Tabs
                defaultValue="design"
                className="w-full"
                onValueChange={(value) => setActiveTab(value)}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="design">디자인 프롬프트</TabsTrigger>
                  <TabsTrigger value="development">개발 프롬프트</TabsTrigger>
                </TabsList>

                <TabsContent value="design" className="space-y-4">
                  {selectedVersion.prompts
                    .filter((prompt) => prompt.type === "design")
                    .map((prompt, index) => (
                      <div
                        key={prompt.id}
                        className="p-4 border rounded-md bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium mb-2">
                            프롬프트 #{index + 1}
                          </h3>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePrompt(prompt.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        <p className="whitespace-pre-wrap">{prompt.content}</p>
                        {prompt.reflection && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                              느낀점
                            </h4>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {prompt.reflection}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="development" className="space-y-4">
                  {selectedVersion.prompts
                    .filter((prompt) => prompt.type === "development")
                    .map((prompt, index) => (
                      <div
                        key={prompt.id}
                        className="p-4 border rounded-md bg-gray-50"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium mb-2">
                            프롬프트 #{index + 1}
                          </h3>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePrompt(prompt.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        <p className="whitespace-pre-wrap">{prompt.content}</p>
                        {prompt.reflection && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                              느낀점
                            </h4>
                            <p className="text-sm text-gray-700 whitespace-pre-wrap">
                              {prompt.reflection}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                </TabsContent>
              </Tabs>

              <div className="mt-8">
                <h3 className="font-medium mb-2">
                  새 {activeTab === "design" ? "디자인" : "개발"} 프롬프트 추가
                </h3>
                <div className="space-y-4">
                  <Textarea
                    placeholder={`AI에게 한 질문이나 얻은 인사이트를 입력하세요...`}
                    value={newPrompt}
                    onChange={(e) => setNewPrompt(e.target.value)}
                    rows={5}
                  />

                  {/* 느낀점 입력란 추가 */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      느낀점 (선택사항)
                    </h4>
                    <Textarea
                      placeholder="이 프롬프트에 대한 느낀점이나 메모를 입력하세요..."
                      value={newReflection}
                      onChange={(e) => setNewReflection(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleAddPrompt}>추가하기</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p>버전을 선택하거나 새 버전을 추가하세요</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsAddModalOpen(true)}
              >
                새 버전 추가
              </Button>
            </div>
          )}
        </main>
      </div>

      <AddVersionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVersion={handleAddVersion}
      />
    </div>
  );
}
