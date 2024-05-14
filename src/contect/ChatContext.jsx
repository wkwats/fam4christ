"use client";

import { nanoid } from "nanoid";
import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  let nan = nanoid(5);
  const [messages, setMessages] = useState([]);
  let [userName, setUserName] = useState(`Anony_${nan}`);

  const addMessages = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, userName, addMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
