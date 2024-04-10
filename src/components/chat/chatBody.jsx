"use client";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { useForm } from "react-hook-form";

import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { nameInitials } from "@/utils/logic";
import { SendHorizontal } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { toast } from "@/components/ui/use-toast";

const ChatBody = ({ userName }) => {
  const form = useForm({});
  const scroll = useRef();

  const [socket, setSocket] = useState(undefined);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState([]);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket?.emit("newUser", userName);
  }, [socket]);

  useEffect(() => {
    socket?.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });
  }, [socket]);

  useEffect(() => {
    socket?.emit("newMessage", { userName, newMessage });
  }, [newMessage]);

  function onSubmit(data) {
    setNewMessage(data.chatMessage);
    form.reset({ chatMessage: "" });
  }
  return (
    <>
      <SheetHeader>
        <SheetTitle>Instant Chat</SheetTitle>
        <SheetDescription>
          Chat with online Authors, Ask questions, participate in a discussion.
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col py-4 h-[50%] overflow-y-scroll gap-4">
        {messages.map((message, index) => {
          return (
            <div key={index} className="flex items-start gap-2.5" ref={scroll}>
              <Avatar>
                <AvatarFallback>{nameInitials(message.name)}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {message.name}
                  </span>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {moment(message.time).calendar()}
                  </span>
                </div>
                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                  {message.message}
                </p>
                <span className="text-sm font-normal text-green-500 dark:text-green-400">
                  Read
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <SheetFooter>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="chatMessage"
              render={({ field }) => (
                <FormItem>
                  <div className="flex py-4 items-center justify-between w-full gap-2">
                    <FormControl>
                      <Textarea
                        placeholder="Your message here..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      className="bg-btn]"
                      variant="outline"
                      size="icon"
                      type="submit"
                    >
                      <SendHorizontal />
                    </Button>
                  </div>
                  <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        {/* <form className="w-full space-y-6">
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
        </form> */}
      </SheetFooter>
    </>
  );
};

export default ChatBody;
