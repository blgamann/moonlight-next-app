"use client";

import { useState, ReactNode } from "react";

type TabItem = {
  label: string;
  value: string;
  content: ReactNode;
};

export function Tabs({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = useState(tabs[0].value);

  return (
    <div className="w-full p-6">
      {/* 전체 탭 바의 기본 밑줄 */}
      <div className="flex justify-center border-b-[0.75px] border-black/15 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`
              relative                       /* 하위 span 위치를 위해 */
              py-2 px-14 text-base font-medium transition-colors
              ${
                active === tab.value
                  ? "text-black/95" /* 활성 탭 텍스트 컬러 */
                  : "text-black/50 hover:text-black/95"
              }
            `}
          >
            {tab.label}
            {/* 활성 탭일 때만 그라디언트 언더라인 */}
            {active === tab.value && (
              <span
                className="
                  absolute bottom-0
                  left-1/2 -translate-x-1/2
                  w-[100px] h-[3px]
                  bg-gradient-to-r
                  from-[#56c1ff] to-[#6ae8d8]
                "
              />
            )}
          </button>
        ))}
      </div>

      {/* 탭 콘텐츠 */}
      <div>
        {tabs.map((tab) =>
          tab.value === active ? <div key={tab.value}>{tab.content}</div> : null
        )}
      </div>
    </div>
  );
}

export function TabsComponent() {
  const tabs = [
    {
      label: "질문",
      value: "question",
      content: (
        <div className="flex flex-col items-center justify-center">질문</div>
      ),
    },
    {
      label: "이벤트",
      value: "event",
      content: (
        <div className="flex flex-col items-center justify-center">이벤트</div>
      ),
    },
    {
      label: "자매 가든",
      value: "sister-garden",
      content: (
        <div className="flex flex-col items-center justify-center">
          자매가든
        </div>
      ),
    },
  ];

  return <Tabs tabs={tabs} />;
}
