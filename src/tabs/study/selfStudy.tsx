import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import ImageSlider from "../../components/imageSlider.tsx";
import "../../App.css";

export default function SelfStudy() {
  const images = [
    "../img/icon/paper.png",
    "../img/icon/dacon.png",
    "../img/icon/leaf_list.png",
    "../img/icon/network.png",
    "../img/icon/paper.png",
  ];

  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <div style={{ paddingTop: "100px" }}>
          <h1>Custom Image Slider</h1>
          <ImageSlider images={images} />
        </div>

        <BottomInfo />
      </div>
    </div>
  );
}
