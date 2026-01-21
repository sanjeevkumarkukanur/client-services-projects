"use client";

import { useParams } from "next/navigation";
import ChatBox from "../../../components/ChatBox";

export default function ChatPage() {
  const { conversationId } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ChatBox conversationId={conversationId as string} />
    </div>
  );
}
