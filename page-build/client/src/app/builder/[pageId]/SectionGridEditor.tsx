"use client";

export default function SectionGridEditor({
  section,
  setSection,
  onSelectField,
  selectedFieldId,
}: any) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${section.columns}, 1fr)`,
        gap: section.gap,
      }}
    >
      {section.fields.map((field: any) => (
        <div
          key={field.id}
          className={`field-box ${
            selectedFieldId === field.id ? "active" : ""
          }`}
          style={{ gridColumn: `span ${field.colSpan}` }}
          onClick={() => onSelectField(field)}
        >
          {field.label}
        </div>
      ))}
    </div>
  );
}
