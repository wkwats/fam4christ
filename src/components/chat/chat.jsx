"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { io } from "socket.io-client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/utils/auth";
import { nameInitials } from "@/utils/logic";
import { MessageCircle, SendHorizontal } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";

const messages = [
  { name: "Bonnie Green", message: "Hello There", time: "11:46" },
  { name: "John Red", message: "Hello", time: "11:47" },
  { name: "Bonnie Green", message: "How are you", time: "11:48" },
  { name: "john Red", message: "Am well and you", time: "11:49" },
  { name: "Bonnie Green", message: "Doing fine over here", time: "11:50" },
  { name: "john Red", message: "Am well and you", time: "11:49" },
];

export function Chat() {
  //const session = await auth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", "Bonnie Green");
  }, [socket]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <MessageCircle className="mr-2 h-4 w-4" />
          Instant Chat
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]  sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Instant Chat</SheetTitle>
          <SheetDescription>
            Chat with online Authors, Ask questions, participate in a
            discussion.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col py-4 h-[70%] overflow-y-scroll gap-4">
          {messages.map((message, index) => {
            return (
              <div key={index} className="flex items-start gap-2.5">
                <Avatar>
                  <AvatarFallback>{nameInitials(message.name)}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {message.name}
                    </span>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                    {message.message}
                  </p>
                  {/* <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Delivered
                  </span> */}
                </div>
              </div>
            );
          })}
        </div>
        <SheetFooter>
          <form className="w-full space-y-6">
            <div className="flex py-4 items-center justify-between w-full gap-2">
              <Textarea placeholder="Type your message here." />

              <Button
                className="bg-btn]"
                variant="outline"
                size="icon"
                type="submit"
              >
                <SendHorizontal />
              </Button>
            </div>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
