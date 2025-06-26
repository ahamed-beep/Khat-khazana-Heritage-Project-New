import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { FaSpinner } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const RouteChangeLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 1. Show loader instantly
    setLoading(true);

    // 2. Use requestAnimationFrame to hide loader after paint
    requestAnimationFrame(() => {
      setLoading(false);
    });
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaSpinner className="text-black text-5xl animate-spin" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteChangeLoader;
