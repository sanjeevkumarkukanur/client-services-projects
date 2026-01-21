export default function TypingIndicator({ user }: { user: string | null }) {
  if (!user) return null;
  return <p className="text-sm text-gray-500">{user} is typing...</p>;
}
