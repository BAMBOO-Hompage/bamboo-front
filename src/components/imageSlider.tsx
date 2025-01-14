import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, #111015 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 0) 75%, #111015 100%)",
          zIndex: 3,
        }}
      ></div>

      <img
        onClick={prevImage}
        src={
          currentIndex === 0
            ? "../img/btn/prev_disabled.png"
            : "../img/btn/prev_enabled.png"
        }
        style={{
          position: "absolute",
          left: "10px",
          width: "40px",
          cursor: currentIndex === 0 ? "default" : "pointer",
          zIndex: 3,
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          height: "100%",
        }}
      >
        {images.map((image, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === currentIndex + 1;
          const isPrev = index === currentIndex - 1;

          return (
            <div
              key={index}
              style={{
                transition:
                  "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
                position: "absolute",
                transform: `${
                  isCurrent
                    ? "translateX(-50%)"
                    : isNext
                    ? "translateX(53%)"
                    : isPrev
                    ? "translateX(-153%)"
                    : index < currentIndex
                    ? "translateX(-256%)"
                    : "translateX(156%)"
                }`,
                // opacity: isCurrent ? 1 : isNext || isPrev ? 0.5 : 0.5,
                zIndex: isCurrent ? 2 : 1,
              }}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                style={{
                  width: "450px",
                  height: "280px",
                  objectFit: "cover",
                }}
              />
            </div>
          );
        })}
      </div>
      <img
        onClick={nextImage}
        src={
          currentIndex === images.length - 1
            ? "../img/btn/next_disabled.png"
            : "../img/btn/next_enabled.png"
        }
        style={{
          position: "absolute",
          right: "10px",
          width: "40px",
          cursor: currentIndex === images.length - 1 ? "default" : "pointer",
          zIndex: 3,
        }}
      />
    </div>
  );
};

export default ImageSlider;
