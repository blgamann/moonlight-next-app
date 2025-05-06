"use client";

import { useState } from "react";
import {
  ButtonComponents,
  BookComponents,
  SoullineComponents,
  ProfileComponents,
  CardComponents,
  IndicatorComponents,
} from "@/components";

const components = [
  {
    label: "book",
    component: <BookComponents />,
  },
  // {
  //   label: "breather",
  //   component: <Breather />,
  // },
  {
    label: "button",
    component: <ButtonComponents />,
  },
  {
    label: "card",
    component: <CardComponents />,
  },
  // {
  //   label: "index",
  //   component: <IndexComponents />,
  // },
  {
    label: "indicator",
    component: <IndicatorComponents />,
  },
  // {
  //   label: "input",
  //   component: <InputComponents />,
  // },
  // {
  //   label: "item",
  //   component: <ItemComponents />,
  // },
  // {
  //   label: "label",
  //   component: <LabelComponents />,
  // },
  // {
  //   label: "menu",
  //   component: (
  //     <div className="flex gap-16">
  //       <div>
  //         {icons.map((icon, index) => (
  //           <Menu
  //             key={index}
  //             icon={icon.icon}
  //             label={icon.label}
  //             onClick={() => {}}
  //           />
  //         ))}
  //       </div>
  //       <div>
  //         {icons.map((icon, index) => (
  //           <Menu2
  //             key={index}
  //             icon={icon.icon}
  //             label={icon.label}
  //             onClick={() => {}}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   ),
  // },
  // {
  //   label: "meta",
  //   component: <MetaComponents />,
  // },
  // {
  //   label: "pop-card",
  //   component: <PopCardComponents />,
  // },
  {
    label: "profile",
    component: <ProfileComponents />,
  },
  {
    label: "soulline",
    component: <SoullineComponents />,
  },
  // {
  //   label: "tabs",
  //   component: <TabsComponent />,
  // },
  // {
  //   label: "text",
  //   component: <TextComponents />,
  // },
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
