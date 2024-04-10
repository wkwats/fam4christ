import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle } from "lucide-react";
import ChatBody from "./chatBody";
import { auth } from "@/utils/auth";

// const messages1 = [
//   { name: "Bonnie Green", message: "Hello There", time: "11:46" },
//   { name: "John Red", message: "Hello", time: "11:47" },
//   { name: "Bonnie Green", message: "How are you", time: "11:48" },
//   { name: "john Red", message: "Am well and you", time: "11:49" },
//   { name: "Bonnie Green", message: "Doing fine over here", time: "11:50" },
//   { name: "john Red", message: "Am well and you", time: "11:49" },
// ];

export async function Chat() {
  const session = await auth();
  const userName = session?.user?.name;
  let nan = nanoid(5);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <MessageCircle className="mr-2 h-4 w-4" />
          Instant Chat
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px]  sm:w-[540px]">
        {userName ? (
          <ChatBody userName={userName} />
        ) : (
          <ChatBody userName={`Anony_${nan}`} />
        )}
      </SheetContent>
    </Sheet>
  );
}
