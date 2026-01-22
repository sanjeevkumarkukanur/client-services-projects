export default function Sidebar() {
  return (
    <aside className="builder-sidebar">
      <h3>Fields</h3>

      {["Text", "Email", "Number", "Select"].map((f) => (
        <div key={f} className="sidebar-item">
          {f}
        </div>
      ))}
    </aside>
  );
}
