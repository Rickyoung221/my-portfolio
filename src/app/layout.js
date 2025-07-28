import "./globals.css";
import "react-resizable/css/styles.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MusicPlayer from "@/components/music-player/MusicPlayer";
import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/CustomCursor";

export const metadata = {
  title: "Rick's Portfolio",
  description: "Welcome to my portfolio",
};

// 防闪烁样式
const noFlashStyle = `
  .no-flash {
    visibility: hidden;
  }
  html.dark {
    background: #002b36;
    color-scheme: dark;
  }
  html.light {
    background: #fdf6e3;
    color-scheme: light;
  }
`;

// 优化的主题脚本
const themeScript = `
  (function() {
    let html = document.documentElement;
    
    // 先隐藏内容防止闪烁
    html.classList.add('no-flash');
    
    function setTheme(theme) {
      html.classList.remove('light', 'dark');
      html.classList.add(theme);
    }

    // 获取用户之前选择的主题
    let savedTheme = localStorage.getItem('theme');
    let userChoice = localStorage.getItem('userThemeChoice');
    
    // 如果用户明确选择了主题
    if (savedTheme && userChoice === 'true') {
      setTheme(savedTheme);
    } else {
      // 否则使用系统主题，但不保存到localStorage
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
      // 清除任何可能残留的主题设置
      localStorage.removeItem('theme');
      localStorage.removeItem('userThemeChoice');
    }
    
    // 添加系统主题变化监听
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (localStorage.getItem('userThemeChoice') !== 'true') {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
    
    // 移除防闪烁类
    requestAnimationFrame(() => {
      html.classList.remove('no-flash');
    });
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: noFlashStyle }} />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen transition-all duration-300 font-sans"
      >
        <ThemeProvider>
          <div className="flex flex-col min-h-screen relative bg-[#fdf6e3] dark:bg-[#002b36] transition-colors duration-300">
            <Navbar />
            <main className="flex-grow transition-colors duration-300">
              {children}
            </main>
            <Footer />
            <MusicPlayer />
            <CustomCursor />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
