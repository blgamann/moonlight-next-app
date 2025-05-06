"use client";

import { useState } from "react";
import {
  ButtonComponents,
  BookComponents,
  SoullineComponents,
  ProfileComponents,
  CardComponents,
  TextComponents,
  TabsComponent,
} from "@/components";

const components = [
  {
    label: "book",
    component: <BookComponents />,
  },
  {
    label: "button",
    component: <ButtonComponents />,
  },
  {
    label: "card",
    component: <CardComponents />,
  },

  {
    label: "profile",
    component: <ProfileComponents />,
  },
  {
    label: "soulline",
    component: <SoullineComponents />,
  },
  {
    label: "text",
    component: <TextComponents />,
  },
  {
    label: "tabs",
    component: <TabsComponent />,
  },
];

export default function Page() {
  const [selectedComponent, setSelectedComponent] = useState<string>("");

  const selectedComponentData = components.find(
    (component) => component.label === selectedComponent
  );

  return (
    <div className="flex flex-col items-center justify-start pt-10 w-full mx-auto mt-12">
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
