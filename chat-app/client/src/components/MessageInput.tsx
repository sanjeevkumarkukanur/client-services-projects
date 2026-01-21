export default function MessageInput({
  text,
  setText,
  onSend,
  onTyping,
  onStopTyping,
}: any) {
  return (
    <>
      <input
        className="border w-full p-2 mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onTyping}
        onBlur={onStopTyping}
        placeholder="Type a message..."
      />

      <button
        onClick={onSend}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </>
  );
}
