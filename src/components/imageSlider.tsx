import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const ZoomOverlay: React.FC<{ src: string; onClose: () => void }> = ({
  src,
  onClose,
}) => {
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "zoom-out",
      }}
    >
      <img
        src={src}
        alt="zoom"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: 12,
          boxShadow: "0 12px 40px rgba(0,0,0,.5)",
          cursor: "default",
        }}
      />
    </div>,
    document.body
  );
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const prevImage = () => {
    if (isZoomed) return;
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const nextImage = () => {
    if (isZoomed) return;
    if (currentIndex < images.length - 1) setCurrentIndex((i) => i + 1);
  };

  const toggleZoom = () => setIsZoomed((z) => !z);

  // Esc로 줌 해제
  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsZoomed(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
      {/* 양옆 그라데이션 */}
      <div
        style={{
          boxSizing: "border-box",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, #111015 0%, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0) 80%, #111015 100%)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Prev 버튼 */}
      <img
        onClick={prevImage}
        alt="prev"
        src={
          currentIndex === 0
            ? "../img/btn/prev_disabled.png"
            : "../img/btn/prev_enabled.png"
        }
        style={{
          position: "absolute",
          left: "10px",
          width: "40px",
          cursor: currentIndex === 0 || isZoomed ? "default" : "pointer",
          zIndex: 5,
          opacity: isZoomed ? 0.4 : 1,
        }}
      />

      {/* 슬라이드 영역 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          height: "320px",
          // 확대 중엔 현재 이미지 외의 것은 클릭 막기
          pointerEvents: isZoomed ? "none" : "auto",
        }}
      >
        {images.map((image, index) => {
          const isCurrent = index === currentIndex;
          const isNext = index === currentIndex + 1;
          const isPrev = index === currentIndex - 1;

          // 위치 변환 (확대 없음)
          const baseTranslate = isCurrent
            ? "translateX(-50%)"
            : isNext
            ? "translateX(53%)"
            : isPrev
            ? "translateX(-153%)"
            : index < currentIndex
            ? "translateX(-256%)"
            : "translateX(156%)";

          return (
            <div
              key={index}
              style={{
                transition:
                  "transform 0.45s ease, opacity 0.3s ease, box-shadow 0.3s ease",
                position: "absolute",
                transform: baseTranslate,
                zIndex: isCurrent ? 6 : 1,
                // 현재 이미지는 확대 트리거를 위해 이벤트 허용
                pointerEvents: isCurrent ? "auto" : "none",
              }}
            >
              <img
                src={image}
                alt={`Slide ${index}`}
                draggable={false}
                onClick={isCurrent ? toggleZoom : undefined}
                style={{
                  width: "450px",
                  height: "320px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  cursor: isCurrent
                    ? isZoomed
                      ? "zoom-out"
                      : "zoom-in"
                    : "default",
                  transformOrigin: "center center",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Next 버튼 */}
      <img
        onClick={nextImage}
        alt="next"
        src={
          currentIndex === images.length - 1
            ? "../img/btn/next_disabled.png"
            : "../img/btn/next_enabled.png"
        }
        style={{
          position: "absolute",
          right: "10px",
          width: "40px",
          cursor:
            currentIndex === images.length - 1 || isZoomed
              ? "default"
              : "pointer",
          zIndex: 5,
          opacity: isZoomed ? 0.4 : 1,
        }}
      />

      {/* ✅ 오버레이(포털)만 사용 — 내부 이미지는 확대 안 함 */}
      {isZoomed && (
        <ZoomOverlay
          src={images[currentIndex]}
          onClose={() => setIsZoomed(false)}
        />
      )}
    </div>
  );
};

export default ImageSlider;
