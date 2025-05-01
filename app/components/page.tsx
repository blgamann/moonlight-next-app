"use client";

import { useState } from "react";
import {
  TextComponent,
  ProfileComponent,
  Breather,
  BookComponent,
  IndexComponent,
  ButtonComponent,
  CardComponent,
  SoullineComponent,
  InputComponent,
} from "@/components";
import { Menu, Menu2, icons } from "@/components/menu";

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
    label: "card",
    component: <CardComponent />,
  },
  {
    label: "index",
    component: <IndexComponent />,
  },
  {
    label: "input",
    component: <InputComponent />,
  },
  {
    label: "menu",
    component: (
      <div className="flex gap-16">
        <div>
          {icons.map((icon, index) => (
            <Menu
              key={index}
              icon={icon.icon}
              label={icon.label}
              onClick={icon.onClick}
            />
          ))}
        </div>
        <div>
          {icons.map((icon, index) => (
            <Menu2
              key={index}
              icon={icon.icon}
              label={icon.label}
              onClick={icon.onClick}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    label: "profile",
    component: <ProfileComponent />,
  },
  {
    label: "soulline",
    component: <SoullineComponent />,
  },
  {
    label: "text",
    component: <TextComponent />,
  },
];

export default function Page() {
  const [selectedComponent, setSelectedComponent] = useState<string>("card");

  const selectedComponentData = components.find(
    (component) => component.label === selectedComponent
  );

  return (
    <div className="flex flex-col items-center justify-start pt-10 h-screen w-full mx-auto mt-12">
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
