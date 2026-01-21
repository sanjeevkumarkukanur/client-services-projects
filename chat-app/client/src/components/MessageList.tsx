export default function MessageList({ messages }: { messages: any[] }) {
  return (
    <div className="h-64 overflow-y-auto border p-2 mb-2">
      {messages.map((m, i) => (
        <div key={i} className="mb-1">
          <b>{m.senderId}:</b> {m.content}
        </div>
      ))}
    </div>
  );
}
