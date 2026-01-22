"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import SectionGridEditor from "./SectionGridEditor";
import Sidebar from "./Sidebar";
import SettingsPanel from "./SettingsPanel";

const PAGE_CONFIG: any = {
  "user-profile": {
    name: "User Profile",
    sections: [
      {
        id: "personal-info",
        title: "Personal Information",
        columns: 12,
        gap: 16,
        fields: [
          { id: "f1", label: "First Name", colSpan: 6 },
          { id: "f2", label: "Last Name", colSpan: 6 },
          { id: "f3", label: "Email", colSpan: 8 },
          { id: "f4", label: "Phone", colSpan: 4 },
        ],
      },
      {
        id: "address",
        title: "Address",
        columns: 12,
        gap: 16,
        fields: [
          { id: "f5", label: "Address Line 1", colSpan: 12 },
          { id: "f6", label: "City", colSpan: 6 },
          { id: "f7", label: "State", colSpan: 6 },
        ],
      },
    ],
  },
};

export default function BuilderPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const page = PAGE_CONFIG[pageId];

  const [sections, setSections] = useState(page.sections);
  const [selectedField, setSelectedField] = useState<any>(null);

  const updateSection = (sectionId: string, updated: any) => {
    setSections((prev: any[]) =>
      prev.map((s) => (s.id === sectionId ? updated : s))
    );
  };

  return (
    <div className="builder-layout">
      {/* 1️⃣ LEFT SIDEBAR */}
      <Sidebar />

      {/* 2️⃣ MIDDLE CANVAS */}
      <main className="builder-canvas">
        <h2>{page.name}</h2>

        {sections.map((section: any) => (
          <SectionGridEditor
            key={section.id}
            section={section}
            setSection={(s: any) => updateSection(section.id, s)}
            onSelectField={setSelectedField}
            selectedFieldId={selectedField?.id}
          />
        ))}
      </main>

      {/* 3️⃣ RIGHT SETTINGS */}
      <SettingsPanel
        field={selectedField}
        onChange={setSelectedField}
      />
    </div>
  );
}
