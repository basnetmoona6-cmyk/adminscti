"use client";
import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { IconHome, IconGitPullRequest, IconPhoto, IconBell, IconMarquee, IconAlertCircle, IconMenu2, IconSettingsFilled,IconX } from '@tabler/icons-react';

const Sidebar = ({ onClose }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if running on client and set isDesktop based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    // Set initial value
    handleResize();
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar menu items
const menuItems = [
    { name: "Home", icon: <IconHome size={24} />, href: "/Adminpage" },
    { name: "Pre-Register", icon: <IconGitPullRequest size={24} />, href: "/preregister" },
    { name: "Marquee", icon: <IconMarquee size={24} />, href: "/marquee" },
];

  // Animation variants for sidebar
  const sidebarVariants = {
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    closed: { x: "-100%", opacity: 0, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // Animation variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2 } },
    hover: { scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.1)" },
  };

  const handleClose = () => {
    setIsMobileMenuOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Hamburger Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.nav
          className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-50 to-white dark:from-neutral-800 dark:to-neutral-900 backdrop-blur-sm shadow-xl dark:shadow-neutral-900/70 z-40 md:z-10 md:translate-x-0 md:opacity-100 pt-16 md:pt-20 md:mr-4 border-r border-blue-100/50 dark:border-neutral-700/60 hover:shadow-2xl transition-shadow duration-300 ${
            isMobileMenuOpen ? "block" : "hidden md:block"
          }`}
          variants={sidebarVariants}
          initial="closed"
          animate={isMobileMenuOpen || isDesktop ? "open" : "closed"}
          exit="closed"
        >
          <div className="flex flex-col h-full p-4">
            {/* MenuPlease Text */}
            <div className="mb-4 text-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400" style={{ fontFamily: "'Dancing Script', cursive" }}>
                SCTI
              </span>
            </div>
            {/* Menu Items */}
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 text-neutral-800 dark:text-neutral-100 rounded-lg hover:bg-blue-500/10 transition-colors duration-200"
                >
                  {item.icon}
                  <span className="text-base font-medium">{item.name}</span>
                </motion.a>
              ))}
            </div>

            {/* Close Button at Bottom (Mobile Only) */}
            <div className="mt-auto md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors duration-200"
              >
                <IconX size={20} />
                <span className="text-base font-medium">Close</span>
              </motion.button>
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose}
        />
      )}
    </>
  );
};

export default Sidebar;