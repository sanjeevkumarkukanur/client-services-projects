// app/page.tsx
import Link from "next/link";

const PAGES = [
  { id: "user-profile", name: "User Profile" },
  { id: "kyc", name: "KYC Form" },
];

export default function HomePage() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Pages</h2>

      {PAGES.map((p) => (
        <Link key={p.id} href={`/builder/${p.id}`}>
          <div>{p.name}</div>
        </Link>
      ))}
    </div>
  );
}
