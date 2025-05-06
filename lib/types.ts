export interface Prompt {
  id: string
  content: string
  type: "design" | "development"
  reflection?: string // 느낀점 필드 추가 (선택 사항)
  createdAt: string
}

export interface Version {
  id: string
  versionNumber: string
  siteUrl?: string
  prompts: Prompt[]
  createdAt: string
}
