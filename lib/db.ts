import { supabase } from "./supabase";
import type { Version, Prompt } from "./types";

// 버전 목록 가져오기
export async function getVersions() {
  try {
    const { data, error } = await supabase
      .from("versions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching versions:", error);
      // 로컬 스토리지에서 데이터 가져오기
      const savedVersions = localStorage.getItem("versions");
      return savedVersions ? JSON.parse(savedVersions) : [];
    }

    // 각 버전에 대한 프롬프트 가져오기
    const versionsWithPrompts = await Promise.all(
      data.map(async (version) => {
        try {
          const { data: prompts, error: promptsError } = await supabase
            .from("prompts")
            .select("*")
            .eq("version_id", version.id)
            .order("created_at", { ascending: true });

          if (promptsError) {
            console.error("Error fetching prompts:", promptsError);
            return {
              ...version,
              prompts: [],
            };
          }

          // 프롬프트 데이터 형식 변환
          const formattedPrompts = prompts.map((p) => ({
            id: p.id,
            content: p.content,
            type: p.type,
            reflection: p.reflection, // 느낀점 필드 추가
            createdAt: p.created_at,
          }));

          return {
            id: version.id,
            versionNumber: version.version_number,
            siteUrl: version.site_url,
            createdAt: version.created_at,
            prompts: formattedPrompts,
          };
        } catch (err) {
          console.error("Error processing version:", err);
          return {
            ...version,
            prompts: [],
          };
        }
      })
    );

    return versionsWithPrompts;
  } catch (err) {
    console.error("Unexpected error in getVersions:", err);
    // 로컬 스토리지에서 데이터 가져오기
    const savedVersions = localStorage.getItem("versions");
    return savedVersions ? JSON.parse(savedVersions) : [];
  }
}

// 새 버전 추가
export async function addVersion(version: Omit<Version, "id">) {
  try {
    // 버전 추가
    const { data, error } = await supabase
      .from("versions")
      .insert({
        version_number: version.versionNumber,
        site_url: version.siteUrl,
        created_at: version.createdAt,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding version:", error);
      // 로컬 스토리지에 저장
      const savedVersions = localStorage.getItem("versions") || "[]";
      const versions = JSON.parse(savedVersions);
      const newVersion = {
        id: Date.now().toString(),
        versionNumber: version.versionNumber,
        siteUrl: version.siteUrl,
        createdAt: version.createdAt,
        prompts: [],
      };
      localStorage.setItem(
        "versions",
        JSON.stringify([newVersion, ...versions])
      );
      return newVersion;
    }

    return {
      id: data.id,
      versionNumber: data.version_number,
      siteUrl: data.site_url,
      createdAt: data.created_at,
      prompts: [],
    };
  } catch (err) {
    console.error("Unexpected error in addVersion:", err);
    // 로컬 스토리지에 저장
    const savedVersions = localStorage.getItem("versions") || "[]";
    const versions = JSON.parse(savedVersions);
    const newVersion = {
      id: Date.now().toString(),
      versionNumber: version.versionNumber,
      siteUrl: version.siteUrl,
      createdAt: version.createdAt,
      prompts: [],
    };
    localStorage.setItem("versions", JSON.stringify([newVersion, ...versions]));
    return newVersion;
  }
}

// 프롬프트 추가
export async function addPrompt(versionId: string, prompt: Omit<Prompt, "id">) {
  try {
    const { data, error } = await supabase
      .from("prompts")
      .insert({
        version_id: versionId,
        content: prompt.content,
        type: prompt.type,
        reflection: prompt.reflection, // 느낀점 필드 추가
        created_at: prompt.createdAt,
      })
      .select()
      .single();

    if (error) {
      console.error("Error adding prompt:", error);
      // 로컬 스토리지에 저장
      const savedVersions = localStorage.getItem("versions") || "[]";
      const versions = JSON.parse(savedVersions);
      const newPrompt = {
        id: Date.now().toString(),
        content: prompt.content,
        type: prompt.type,
        reflection: prompt.reflection, // 느낀점 필드 추가
        createdAt: prompt.createdAt,
      };

      const updatedVersions = versions.map((v: Version) => {
        if (v.id === versionId) {
          return {
            ...v,
            prompts: [...v.prompts, newPrompt],
          };
        }
        return v;
      });

      localStorage.setItem("versions", JSON.stringify(updatedVersions));
      return newPrompt;
    }

    return {
      id: data.id,
      content: data.content,
      type: data.type,
      reflection: data.reflection, // 느낀점 필드 추가
      createdAt: data.created_at,
    };
  } catch (err) {
    console.error("Unexpected error in addPrompt:", err);
    // 로컬 스토리지에 저장
    const savedVersions = localStorage.getItem("versions") || "[]";
    const versions = JSON.parse(savedVersions);
    const newPrompt = {
      id: Date.now().toString(),
      content: prompt.content,
      type: prompt.type,
      reflection: prompt.reflection, // 느낀점 필드 추가
      createdAt: prompt.createdAt,
    };

    const updatedVersions = versions.map((v: Version) => {
      if (v.id === versionId) {
        return {
          ...v,
          prompts: [...v.prompts, newPrompt],
        };
      }
      return v;
    });

    localStorage.setItem("versions", JSON.stringify(updatedVersions));
    return newPrompt;
  }
}

// 프롬프트 삭제
export async function deletePrompt(promptId: string, versionId: string) {
  try {
    const { error } = await supabase
      .from("prompts")
      .delete()
      .eq("id", promptId);

    if (error) {
      console.error("Error deleting prompt:", error);
      // 로컬 스토리지에서 삭제
      const savedVersions = localStorage.getItem("versions") || "[]";
      const versions = JSON.parse(savedVersions);

      const updatedVersions = versions.map((v: Version) => {
        if (v.id === versionId) {
          return {
            ...v,
            prompts: v.prompts.filter((p: Prompt) => p.id !== promptId),
          };
        }
        return v;
      });

      localStorage.setItem("versions", JSON.stringify(updatedVersions));
      return true;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error in deletePrompt:", err);
    // 로컬 스토리지에서 삭제
    const savedVersions = localStorage.getItem("versions") || "[]";
    const versions = JSON.parse(savedVersions);

    const updatedVersions = versions.map((v: Version) => {
      if (v.id === versionId) {
        return {
          ...v,
          prompts: v.prompts.filter((p: Prompt) => p.id !== promptId),
        };
      }
      return v;
    });

    localStorage.setItem("versions", JSON.stringify(updatedVersions));
    return true;
  }
}

export async function checkAuth(password: string) {
  return password === "1234";
}
