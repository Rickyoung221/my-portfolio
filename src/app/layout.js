import "./globals.css";
import "react-resizable/css/styles.css";
import { Inter } from "next/font/google";
import Navbar from "@components/Navbar";
const inter = Inter({ subsets: ["latin"] });
import Footer from "@components/Footer";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ThemeProvider attribute="class" defaultTheme="light">
          <main className=" bg-[#ffffff] dark:bg-[#121212] min-h-screen">
            {children}
          </main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
