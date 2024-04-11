import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import { Chat } from "@/components/chat/chat";
import Help from "@/components/help/Help";
import { nanoid } from "nanoid";
import { auth } from "@/utils/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Families For Christ",
  description: "Blog and Magazine about the Christian way of living",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  const userName = session?.user?.name;
  let nan = nanoid(5);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          <div className="fixed z-50 right-10 bottom-4 ">
            {userName ? (
              <Help userName={userName} />
            ) : (
              <Help userName={`Anony_${nan}`} />
            )}
          </div>
          {/* <div className="chat">
            <Chat />
          </div> */}
          <Suspense fallback={<Loading />}>{children}</Suspense>

          <Footer />
        </div>
      </body>
    </html>
  );
}
