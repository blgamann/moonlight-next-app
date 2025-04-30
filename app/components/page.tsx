"use client";

import { useState } from "react";
import {
  TextComponent,
  Input,
  ProfileComponent,
  Breather,
  Quote,
  BookComponent,
  IndexComponent,
  TextDarkGrey,
  ButtonComponent,
} from "@/components";

export default function Page() {
  const [selectedComponent, setSelectedComponent] = useState<string>("text");

  const components = [
    {
      label: "book",
      component: <BookComponent />,
    },
    {
      label: "breather",
      component: <Breather />,
    },
    {
      label: "button",
      component: <ButtonComponent />,
    },
    {
      label: "index",
      component: <IndexComponent />,
    },
    {
      label: "input",
      component: <Input placeholder="추천인의 ID를 입력해주세요 (Input)" />,
    },
    {
      label: "profile",
      component: <ProfileComponent />,
    },
    {
      label: "quote",
      component: (
        <Quote>
          <TextDarkGrey>
            {
              "죽음은 신나게 놀고 있는데 엄마가 '얘야, 그만 놀고 들어와 밥 먹어라'하고 부르는 소리와 같습니다."
            }
          </TextDarkGrey>
        </Quote>
      ),
    },
    {
      label: "text",
      component: <TextComponent />,
    },
  ];

  const selectedComponentData = components.find(
    (component) => component.label === selectedComponent
  );

  return (
    <div className="flex flex-col items-center justify-start pt-10 h-screen max-w-[900px] w-full mx-auto mt-12">
      <div className="flex space-x-4 mb-8 w-full items-center justify-center">
        {components.map((component) => (
          <span
            key={component.label}
            onClick={() => setSelectedComponent(component.label)}
            className={`cursor-pointer pb-1 ${
              selectedComponent === component.label
                ? "border-b-2 border-[#39d4e7] font-semibold text-[#383838]"
                : "text-gray-500"
            }`}
          >
            {component.label}
          </span>
        ))}
      </div>
      <div className="flex justify-center w-full border-t py-12 mt-6 border-black/15 px-16">
        {selectedComponentData ? selectedComponentData.component : null}
      </div>
    </div>
  );
}
