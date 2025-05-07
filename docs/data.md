## Data

### **books** (책 정보)

---

Naver 도서 API를 통해 얻은 책 정보는 다음 두 가지 경우에 books 테이블에 저장됩니다. 단, 모든 경우에서 해당 책 정보가 테이블에 없을 때만 새로 저장됩니다:

1. **책에 대한 첫 질문/답변 활동 시**: 사용자가 시스템 기본 질문을 포함한 첫 답변을 작성하거나, 저자/출판사가 해당 책에 대한 첫 질문을 생성할 때.
2. **사용자가 서재에 책을 추가할 때**: 사용자가 자신의 서재에 특정 책을 처음 추가할 때.

즉, 시스템에서 특정 책과 관련된 첫 활동이 발생할 때 해당 책의 정보가 books 테이블에 등록됩니다.

---

**columns:**

- id (PK)
- isbn
- title
- author
- image
- publisher
- created_at
- updated_at

---

**제약 조건:**

- isbn 컬럼은 UNIQUE 제약 조건을 가집니다.

### **profiles** (사용자 프로필)

---

Supabase Authentication 기능을 활용하여 사용자 인증을 처리합니다. profiles 테이블은 인증된 사용자의 추가 정보를 저장합니다.

---

**columns:**

- id (PK)
- name
- image (NULLABLE)
- bio (NULLABLE)
- created_at
- updated_at

### authors (저자)

---

**columns:**

- id
- name
- image (NULLABLE)
- bio (NULLABLE)
- created_at
- updated_at

### publishers (출판사)

---

**columns:**

- id
- name
- image (NULLABLE)
- bio (NULLABLE)
- created_at
- updated_at

### **shelves** (사용자 서재)

---

책이 books 테이블에 존재하지 않는 경우, 먼저 해당 책 정보를 books 테이블에 저장한 후 book_id를 받아와 저장합니다.

---

**columns:**

- profile_id (FK)
- book_id (FK)
- added_at

---

**제약 조건:**

- PRIMARY KEY (profile_id, book_id) - 복합 기본 키

### **questions** (책에 대한 질문)

---

책에 대한 질문은 시스템, 저자, 또는 출판사가 생성할 수 있습니다:

- **시스템 기본 질문**: 모든 책에 대해 "%BOOK_TITLE%을 읽고 느낀 점을 공유해주세요." 형식의 기본 질문이 제공될 수 있습니다. 이 질문은 사용자가 해당 책에 대한 첫 답변을 작성할 때 questions 테이블에 자동으로 생성됩니다. 이때 creator_type은 'SYSTEM'이 되며, creator_id는 NULL입니다. question_text에는 "%BOOK_TITLE%을 읽고 느낀 점을 공유해주세요."라는 템플릿 문자열이 저장됩니다.
- **저자/출판사 질문**: 저자나 출판사가 직접 질문을 작성할 수 있습니다.

---

**columns:**

- id (PK)
- book_id (FK)
- question_text
- creator_type - 질문 생성 주체 유형 (예: 'SYSTEM', 'AUTHOR', 'PUBLISHER')
- creator_id - 질문 생성 주체 ID
  - creator_type이 'AUTHOR'일 경우: authors.id 참조
  - creator_type이 'PUBLISHER'일 경우: publishers.id 참조
  - creator_type이 'SYSTEM'일 경우: NULL
- created_at
- updated_at

---

제약 사항:

- (애플리케이션 레벨) creator_id는 creator_type에 따라 authors 또는 publishers 테이블을 참조해야 합니다.

### **answers** (질문에 대한 답변)

---

답변이 시스템 질문에 대한 첫 답변인 경우, 해당 시스템 질문이 questions 테이블에 자동으로 등록되며 답변도 answers 테이블에 저장됩니다.

---

**columns:**

- id (PK)
- question_id (FK)
- profile_id (FK)
- title
- answer_text
- created_at
- updated_at

### **profile_interests** (프로필 관심)

---

사용자가 다른 사용자의 프로필에 관심을 표현한 기록을 저장합니다. 관심 표현 자체는 상대방에게 알림을 보내지 않습니다.

---

**columns:**

- id (PK) - 고유 식별자
- source_profile_id (FK) - 관심을 표현한 사용자
- target_profile_id (FK) - 관심을 받은 사용자 (프로필 주인)
- created_at
- canceled_at (소프트 딜리트)

---

제약 조건:

- UNIQUE (source_profile_id, target_profile_id, canceled_at IS NULL) - 동일 사용자가 동일 프로필에 대해 활성화된 관심을 중복 표현할 수 없음 (단, 취소된 후 다시 표현하는 것은 새로운 레코드로 가능)
- CHECK (source_profile_id != target_profile_id) - 자기 자신에게 관심을 표현할 수 없음

---

### **answer_interests** (답변 관심)

---

**columns:**

- id (PK)
- profile_id (FK) - 관심을 표현한 사용자
- answer_id (FK) - 관심을 받은 답변
- created_at
- canceled_at (소프트 딜리트)

---

제약 조건:

- UNIQUE (profile_id, answer_id, canceled_at IS NULL) - 동일 사용자가 동일 답변에 대해 활성화된 관심을 중복 표현할 수 없음

### mutual_profile_interests (상호 프로필 관심 관계)

---

두 사용자가 서로의 프로필에 관심을 표현하여 '상호 관심' 상태가 된 관계를 기록합니다. 이 관계가 성립될 때 양쪽 사용자에게 "상호 관심 알림"이 전송됩니다. 한쪽이 프로필 관심을 취소하면 이 관계는 해소됩니다.

---

**columns:**

- id (PK)
- user_a_id (FK) - 사용자 1 (ID가 더 작은 사용자)
- user_b_id (FK) - 사용자 2 (ID가 더 큰 사용자)
- established_at - 상호 관심 관계 성립 시각
- dissolved_at (NULLABLE) - 상호 관심 관계 해소 시각 (예: 한쪽이 관심 취소)

---

**제약 조건:**

- UNIQUE (user_a_id, user_b_id, dissolved_at IS NULL) - 동일한 두 사용자 간에 활성화된 상호 관심 관계는 하나만 존재합니다. (해소 후 재성립 시 새 레코드 생성)
- CHECK (user_a_id < user_b_id) - 데이터 중복 방지 및 조회를 위한 ID 순서 강제 (UUID 비교 방식에 따라 조정 필요). 또는 애플리케이션 레벨에서 ID 순서 정렬 후 저장

---

**로직:**

- A가 B에게 profile_interests 표현 + B가 A에게 이미 활성 profile_interests 표현 상태 → 이 테이블에 레코드 생성 (established_at 기록), 알림 발생.
- A가 B에 대한 profile_interests 취소 (기존 상호 관심 상태) → 이 테이블의 해당 레코드에 dissolved_at 업데이트.

### soullinks (소울링크 띄우기)

---

상호 프로필 관심 상태인 사용자들이 서로에게 '소울링크'를 띄운 기록을 저장합니다. 소울링크 띄우기 자체는 상대방에게 알림을 보내지 않습니다. 상호 프로필 관심 관계가 해소되면, 해당 사용자들 간의 활성화된 소울링크는 자동으로 취소(무효화)됩니다.

---

**columns:**

- id (PK, BIGSERIAL) - 고유 식별자
- sender_profile_id (FK, BIGINT, profiles.id 참조) - 소울링크를 보낸 사용자
- receiver_profile_id (FK, BIGINT, profiles.id 참조) - 소울링크를 받은 사용자
- created_at (TIMESTAMPTZ, 기본값 now()) - 소울링크 띄운 시각
- canceled_at (TIMESTAMPTZ, NULL 가능) - 소울링크 취소 시각 (소프트 딜리트)

---

**제약 조건:**

- UNIQUE (sender_profile_id, receiver_profile_id, canceled_at IS NULL) - 동일 사용자가 동일 대상에게 활성화된 소울링크를 중복으로 띄울 수 없습니다. (취소 후 다시 띄울 시 새 레코드 생성)
- CHECK (sender_profile_id != receiver_profile_id) - 자기 자신에게 소울링크를 띄울 수 없습니다.
- **애플리케이션 레벨 제약:** 소울링크는 mutual_profile_interests 테이블에 두 사용자 간 활성화된(dissolved_at IS NULL) 관계가 존재할 때만 띄울 수 있습니다.

---

**로직:**

- mutual_profile_interests 관계가 해소되면, 해당 사용자들 간의 활성화된(canceled_at IS NULL) soul_links 레코드들은 canceled_at이 업데이트되어야 합니다.

### soulmates (소울메이트 관계)

---

양쪽 사용자 모두 서로에게 활성화된 소울링크를 띄워 '소울메이트'가 된 관계를 기록합니다. 관계 성립 시 양쪽 사용자에게 "소울메이트 알림"이 전송됩니다. 소울링크 중 하나라도 취소되거나, 선행 관계인 상호 프로필 관심이 해소되어 소울링크가 무효화되면 소울메이트 관계도 해제됩니다. 또한, 소울메이트 간 특정 활동(예: 소울메이트 검색, DM 등)이 장기간 없을 경우 last_interaction_at을 기준으로 자동 해제될 수 있습니다.

---

- id (BIGSERIAL, PK) - 고유 식별자
- user_a_id (FK)
- user_b_id (FK)
- established_at (TIMESTAMPTZ, DEFAULT now()) - 소울메이트 관계 성립 시각
- last_interaction_at  - 마지막 상호작용 시각 (소울메이트 간 검색, DM 등의 활동 시 업데이트)
- disbanded_at (NULLABLE) - 소울메이트 관계 해제 시각 (자동 또는 수동/연쇄 해제)

---

**제약 조건:**

- UNIQUE (user_a_id, user_b_id, disbanded_at IS NULL) - 동일한 두 사용자 간에 활성화된 소울메이트 관계는 하나만 존재합니다. (해제 후 재성립 시 새 레코드 생성)
- CHECK (user_a_id < user_b_id) - 데이터 중복 방지 및 조회를 위한 ID 순서 강제 (UUID 비교 방식에 따라 조정 필요). 또는 애플리케이션 레벨에서 ID 순서 정렬 후 저장.

---

**로직:**

- A가 B에게 활성 soullinks 보냄 + B가 A에게 이미 활성 soullinks 보낸 상태 → 이 테이블에 레코드 생성 (established_at, last_interaction_at 기록), 알림 발생.
- A 또는 B의 soullinks 중 하나라도 취소되거나, 또는 mutual_profile_interests 관계 해소로 인해 soul_links가 연쇄적으로 취소되면 → 이 테이블의 해당 레코드에 disbanded_at 업데이트.
- 소울메이트 간 특정 기능(DM, 공동 작업 등) 사용 시 해당 soulmates 레코드의 last_interaction_at을 현재 시각으로 업데이트합니다.
- 주기적인 백그라운드 작업으로 last_interaction_at이 특정 기간(예: 90일) 이전인 활성 소울메이트 관계를 찾아 disbanded_at을 업데이트하여 자동 해제 처리합니다.

---
