"use client";
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTheme } from '@/context/ThemeContext';

const EMAILJS_CONFIG = {
  PUBLIC_KEY: "qlrGWyjsdHevNChv6",
  TEMPLATE_ID: "template_d540mj5",
  SERVICE_ID: "service_z6qunbl",
};

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const form = useRef();
  const { isDarkMode } = useTheme();

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setIsVerified(true);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!isVerified) {
      alert("Please verify the reCAPTCHA first.");
      return;
    }

    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailSubmitted(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert("Failed to send message. Please check your information.");
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center"
    >
      {/* 上方文本描述 */}
      <div className="w-full max-w-lg text-center">
        <p className={`text-sm sm:text-base mb-8 px-4 sm:px-0 transition-colors duration-300
                    ${isDarkMode ? 'text-[#839496]' : 'text-[#586e75]'}`}>
          I&apos;m currently looking for new opportunities. Whether you have a
          question or just want to say hi, I&apos;ll try my best to get back to
          you! 😊
        </p>
      </div>

      {/* 下方表单 */}
      <div className="w-full max-w-lg">
        {emailSubmitted ? (
          <p className="text-green-500 text-center text-sm mt-4">
            Email sent successfully! 🎉
          </p>
        ) : (
          <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-4 sm:space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className={`block mb-1.5 sm:mb-2 text-sm font-medium transition-colors duration-300
                         ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}
              >
                Your Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                placeholder="you@example.com"
                className={`w-full p-2 sm:p-2.5 rounded-lg border transition-colors duration-300
                         ${isDarkMode 
                           ? 'bg-[#073642] text-[#93a1a1] border-[#586e75] placeholder-[#657b83]' 
                           : 'bg-[#eee8d5] text-[#002b36] border-[#93a1a1] placeholder-[#93a1a1]'}`}
              />
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className={`block mb-1.5 sm:mb-2 text-sm font-medium transition-colors duration-300
                         ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}
              >
                Your Name
              </label>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Your Name"
                required
                className={`w-full p-2 sm:p-2.5 rounded-lg border transition-colors duration-300
                         ${isDarkMode 
                           ? 'bg-[#073642] text-[#93a1a1] border-[#586e75] placeholder-[#657b83]' 
                           : 'bg-[#eee8d5] text-[#002b36] border-[#93a1a1] placeholder-[#93a1a1]'}`}
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className={`block mb-1.5 sm:mb-2 text-sm font-medium transition-colors duration-300
                         ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                placeholder="Just saying hi!"
                required
                className={`w-full p-2 sm:p-2.5 rounded-lg border transition-colors duration-300
                         ${isDarkMode 
                           ? 'bg-[#073642] text-[#93a1a1] border-[#586e75] placeholder-[#657b83]' 
                           : 'bg-[#eee8d5] text-[#002b36] border-[#93a1a1] placeholder-[#93a1a1]'}`}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className={`block mb-1.5 sm:mb-2 text-sm font-medium transition-colors duration-300
                         ${isDarkMode ? 'text-[#93a1a1]' : 'text-[#002b36]'}`}
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="4"
                required
                placeholder="Let's talk about..."
                className={`w-full p-2 sm:p-2.5 rounded-lg border transition-colors duration-300 resize-none
                         ${isDarkMode 
                           ? 'bg-[#073642] text-[#93a1a1] border-[#586e75] placeholder-[#657b83]' 
                           : 'bg-[#eee8d5] text-[#002b36] border-[#93a1a1] placeholder-[#93a1a1]'}`}
              ></textarea>
            </div>

            {/* reCAPTCHA */}
            <div className="flex justify-center items-center transform scale-90 sm:scale-100">
              <ReCAPTCHA
                sitekey="6LeszpwqAAAAAP9WPzNdwRxPP3Xj2BFtgq3zjeq2"
                onChange={handleRecaptchaChange}
                className="g-recaptcha"
                theme={isDarkMode ? "dark" : "light"}
              />
            </div>

            {/* 发送按钮 */}
            <button
              type="submit"
              disabled={!isVerified} // 按钮禁用逻辑
              className={`w-full font-medium py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg text-sm sm:text-base transition-colors
                       ${isVerified
                         ? isDarkMode
                           ? 'bg-[#268bd2] text-[#fdf6e3] hover:bg-[#2aa198]'
                           : 'bg-[#268bd2] text-[#fdf6e3] hover:bg-[#2aa198]'
                         : 'bg-gray-500 cursor-not-allowed text-[#fdf6e3]'}`}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
