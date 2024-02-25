import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Families For Christ",
  description: "Blog and Magazine about the Christian way of living",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="container">
          {/* <div className="wrapper"> */}

          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
