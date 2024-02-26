import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Families For Christ",
  description: "Blog and Magazine about the Christian way of living",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <div className="wrapper">
            <Navbar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
