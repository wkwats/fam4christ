"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { MainCard } from "./MainCard";
import { io } from "socket.io-client";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { nameInitials } from "@/utils/logic";

function Help({ userName }) {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("newUser", userName);
    socket.on("getOnlineUsers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket?.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    socket?.on("message", (message) => {
      let ownChat = message.name === userName;
      message = { ...message, ownChat };
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  return (
    <>
      {isOpen ? (
        <>
          <div className="flex flex-col fixed right-12 bottom-16 rounded shadow-2xl bg-white min-w-[60vw]  max-h-full">
            <div className=" h-16 rounded-t flex p-2 bg-gray-200 justify-center items-center">
              <span className="font-semibold text-l text-center">
                Chat with Authors, Ask questions, participate in a discussion...
              </span>
            </div>

            <div className="flex p-3 items-stretch">
              <div className="flex flex-col flex-grow">
                <div className="flex -space-x-4 rtl:space-x-reverse">
                  {onlineUsers.map((user, index) => {
                    return (
                      <Avatar key={index}>
                        <AvatarFallback className="text-white bg-gray-700 border-2 border-white">
                          {nameInitials(user.username)}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })}
                </div>
              </div>
              <MainCard
                userName={userName}
                socket={socket}
                messages={messages}
              />
            </div>
          </div>

          <Button
            className="fixed right-12 bottom-4"
            onClick={() => setIsOpen(false)}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Close
          </Button>
        </>
      ) : (
        <Button
          className="fixed right-12 bottom-4"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Chat
        </Button>
      )}
    </>
  );
}

export default Help;
