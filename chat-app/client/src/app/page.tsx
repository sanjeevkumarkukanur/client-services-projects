"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, startChat } from "../services/api";

const MY_USER_ID = "44ae786d-8e18-4ff0-ab52-aef31e450a81"; // <-- your logged-in user

export default function Page() {
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const res = await getUsers();
      // remove yourself from the list
      const others = res.data.filter((u: any) => u.id !== MY_USER_ID);
      setUsers(others);
      setLoading(false);
    }

    fetchUsers();
  }, []);

  const handleMessage = async (otherUserId: string) => {
    const res = await startChat(MY_USER_ID, otherUserId);
    const conversationId = res.data.id;

    // go to chat page
    router.push(`/chat/${conversationId}`);
  };

  if (loading) return <p className="p-10">Loading users...</p>;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Start a Chat</h1>

      {users.map((u) => (
        <div
          key={u.id}
          className="border p-3 mb-2 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">{u.name}</p>
            <p className="text-sm text-gray-500">{u.phone}</p>
          </div>

          <button
            onClick={() => handleMessage(u.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Message
          </button>
        </div>
      ))}
    </div>
  );
}
