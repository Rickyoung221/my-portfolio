import "./globals.css";
import "react-resizable/css/styles.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/music-player/MusicPlayer";
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata = {
  title: "Rick's Portfolio",
  description: "Welcome to my portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen transition-all duration-300 font-sans">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen relative bg-[#fdf6e3] dark:bg-[#002b36] transition-colors duration-300">
            <Navbar />
            <main className="flex-grow transition-colors duration-300">
              {children}
            </main>
            <Footer />
            <MusicPlayer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
