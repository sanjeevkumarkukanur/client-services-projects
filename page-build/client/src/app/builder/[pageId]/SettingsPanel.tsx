export default function SettingsPanel({ field }: any) {
  if (!field) {
    return (
      <aside className="builder-settings">
        <p>Select a field</p>
      </aside>
    );
  }

  return (
    <aside className="builder-settings">
      <h3>Field Settings</h3>

      <label>
        Label
        <input value={field.label} readOnly />
      </label>

      <label>
        Column Span
        <input value={field.colSpan} readOnly />
      </label>
    </aside>
  );
}
