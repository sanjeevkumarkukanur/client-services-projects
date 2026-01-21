"use client";

import { useEffect, useState } from "react";
import { socket } from "../lib/socket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { getConversationMessages } from "../services/api";

export default function ChatBox({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [typingUser, setTypingUser] = useState<string | null>(null);

useEffect(() => {
  socket.connect();

  socket.emit("join_private_chat", { conversationId });

  return () => {
    socket.off("receive_private_message");
    socket.disconnect();
  };
}, [conversationId]);


useEffect(() => {
  async function loadMessages() {
    const res = await getConversationMessages(conversationId);
    setMessages(res.data);
  }

  loadMessages();
}, [conversationId]);
  

  useEffect(() => {
    socket.emit("join_private_chat", { conversationId });

    socket.on("receive_private_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("user_typing", (data) => {
      setTypingUser(data.userId);
    });

    socket.on("user_stop_typing", () => {
      setTypingUser(null);
    });

    return () => {
      socket.off("receive_private_message");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [conversationId]);

  const sendMessage = () => {
    socket.emit("private_message", {
      conversationId,
      senderId: "44ae786d-8e18-4ff0-ab52-aef31e450a81", // replace dynamically
      content: text,
    });
    setText("");
  };

  return (
    <div className="p-4 border rounded-lg w-full max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-2">
        Chat: {conversationId}
      </h2>

      <MessageList messages={messages} />
      <TypingIndicator user={typingUser} />
      <MessageInput
        text={text}
        setText={setText}
        onSend={sendMessage}
        onTyping={() =>
          socket.emit("typing", {
            roomId: conversationId,
            userId: "44ae786d-8e18-4ff0-ab52-aef31e450a81",
          })
        }
        onStopTyping={() =>
          socket.emit("stop_typing", {
            roomId: conversationId,
            userId: "44ae786d-8e18-4ff0-ab52-aef31e450a81",
          })
        }
      />
    </div>
  );
}
