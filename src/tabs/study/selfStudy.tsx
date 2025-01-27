import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import LockedPageAuth from "../../components/lockedPageAuth.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import "../../App.css";

export default function SelfStudy() {
  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          style={{
            width: "100%",
          }}
        >
          <LockedPageAuth />
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
