import React, { useState, useEffect } from "react";

const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#111",
        color: "#fff",
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: "98",
      }}
    >
      PC로 이용해 주세요
    </div>
  );
};

export default MobileBlocker;
