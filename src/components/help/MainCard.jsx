"useclient";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { nameInitials } from "@/utils/logic";
import { SendHorizontal, CheckCheck } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import moment from "moment/moment";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export function MainCard({ userName, socket, messages }) {
  const [newMessage, setNewMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scroll = useRef();
  const form = useForm({});

  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket === null) return;
    if (newMessage === null) return;
    socket?.emit("newMessage", { userName, newMessage });
  }, [newMessage]);

  function onSubmit(data) {
    setNewMessage(data.chatMessage);
    form.reset({ chatMessage: "" });
  }

  return (
    <div className=" border-0 w-2/3 h-fit">
      <CardDescription className=" font-semibold text-center text-lg  p-2">
        Chat: Amos
      </CardDescription>

      <CardContent>
        <div className="flex flex-col py-4 overflow-y-auto h-96 gap-4">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={
                  message.ownChat
                    ? "flex flex-row-reverse items-start gap-2.5"
                    : "flex items-start gap-2.5"
                }
                ref={scroll}
              >
                <Avatar>
                  <AvatarFallback>{nameInitials(message.name)}</AvatarFallback>
                </Avatar>

                {message.ownChat ? (
                  <div className="flex flex-col w-72 leading-1.5 p-2 border-green-200 bg-green-100 rounded-b-xl rounded-tl-xl dark:bg-green-700">
                    <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                      <span className="text-sm  text-left font-normal text-gray-500 dark:text-gray-400">
                        {moment(message.time).calendar()}
                      </span>
                      <span className="text-sm  text-right font-semibold text-gray-900 dark:text-white">
                        {message.name}
                      </span>
                    </div>
                    <p className="text-sm font-normal text-right py-2.5 text-gray-900 dark:text-white">
                      {message.message}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col w-72 leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div className="flex items-center  justify-between space-x-2 rtl:space-x-reverse">
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
                      <CheckCheck />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-x-2"
          >
            <FormField
              control={form.control}
              name="chatMessage"
              render={({ field }) => (
                <FormItem>
                  <div className="flex py-2 items-center justify-between w-full gap-2">
                    <FormControl>
                      <Textarea
                        placeholder="Your message here..."
                        className="resize-none"
                        {...field}
                        required
                      />
                    </FormControl>
                    <Button
                      className="bg-btn"
                      variant="outline"
                      size="icon"
                      type="submit"
                    >
                      <SendHorizontal />
                    </Button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
