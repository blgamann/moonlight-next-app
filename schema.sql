-- 버전 테이블
CREATE TABLE versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version_number TEXT NOT NULL,
  site_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 프롬프트 테이블
CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version_id UUID REFERENCES versions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('design', 'development')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 이미 prompts 테이블이 존재한다면 reflection 컬럼 추가
ALTER TABLE IF EXISTS prompts ADD COLUMN IF NOT EXISTS reflection TEXT;

-- 변경 내역 테이블
CREATE TABLE change_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action TEXT NOT NULL CHECK (action IN ('create', 'update', 'delete')),
  entity_type TEXT NOT NULL CHECK (entity_type IN ('version', 'prompt')),
  entity_id UUID NOT NULL,
  version_id UUID REFERENCES versions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 인덱스 생성
CREATE INDEX idx_prompts_version_id ON prompts(version_id);
CREATE INDEX idx_change_logs_version_id ON change_logs(version_id);
CREATE INDEX idx_change_logs_entity_id ON change_logs(entity_id);
