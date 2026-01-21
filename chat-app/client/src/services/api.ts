import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001/chat",
});

export const createUser = async (name: string, phone: string) => {
  return API.post("/user", { name, phone });
};

export const createConversation = async (userA: string, userB: string) => {
  return API.post("/conversation", { userA, userB });
};

export const getConversationMessages = async (conversationId: string) => {
  return API.get(`/conversation/${conversationId}`);
};

export const startChat = async (userA: string, userB: string) => {
  return API.post("/start-chat", {
    userA,
    userB,
  });
};

// ---- USERS ----
export const getUsers = async () => {
  return API.get("/users");
};


export const getGroupMessages = async (groupId: string) => {
  return API.get(`/chat/group/${groupId}/messages`);
};



