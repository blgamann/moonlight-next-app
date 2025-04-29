"use client";

import { useState } from "react";
import { TextComponent } from "@/components/text";
import { Input } from "@/components/input";
import { Button } from "@/components/button";

export default function Page() {
  const [selectedComponent, setSelectedComponent] = useState<string>("text");

  const components = [
    {
      label: "text",
      component: <TextComponent />,
    },
    {
      label: "button",
      component: <Button>회원가입 시작하기</Button>,
    },
    {
      label: "input",
      component: <Input />,
    },
  ];

  const selectedComponentData = components.find(
    (component) => component.label === selectedComponent
  );

  return (
    <div className="flex flex-col items-center justify-start pt-10 h-screen max-w-[900px] w-full mx-auto">
      <div className="flex space-x-4 mb-8">
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
      <div className="border-t py-12 border-black/30">
        {selectedComponentData ? selectedComponentData.component : null}
      </div>
    </div>
  );
}
