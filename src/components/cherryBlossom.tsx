import React, { useEffect, useRef } from "react";

const CherryBlossom = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  class Petal {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    angle: number;
    angleSpeed: number;
    rotation: number; // 회전 값
    rotationSpeed: number; // 회전 속도

    constructor(x: number, y: number, size: number, speed: number) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = speed;
      this.opacity = Math.random() * 0.3 + 0.7; // 약간 투명한 효과
      this.angle = Math.random() * Math.PI * 2;
      this.angleSpeed = Math.random() * 0.02 + 0.01;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 2 - 1; // -1 ~ 1 사이 랜덤값 (회전 방향 다르게)
    }

    update() {
      this.y += this.speed;
      this.x += Math.sin(this.angle) * 2; // 좌우로 흔들리면서 떨어짐
      this.angle += this.angleSpeed;
      this.rotation += this.rotationSpeed; // 회전 추가

      if (this.y > window.innerHeight) {
        this.y = -this.size;
        this.x = Math.random() * window.innerWidth;
        this.rotation = Math.random() * 360; // 초기 회전값 리셋
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180); // 회전 적용
      ctx.beginPath();

      // 벚꽃잎을 타원(ellipse) 형태로 그리기
      ctx.ellipse(0, 0, this.size * 1.2, this.size * 0.8, 0, 0, Math.PI * 3);

      ctx.fillStyle = `rgba(255, 182, 193, ${this.opacity})`; // 연한 핑크색
      ctx.fill();
      ctx.restore();
    }
  }

  const animatePetals = (ctx: CanvasRenderingContext2D, petals: Petal[]) => {
    if (!ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    petals.forEach((petal) => {
      petal.update();
      petal.draw(ctx);
    });

    requestAnimationFrame(() => animatePetals(ctx, petals));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const petals: Petal[] = [];
    const maxPetals = 40;

    for (let i = 0; i < maxPetals; i++) {
      const size = Math.random() * 4 + 2;
      const speed = Math.random() * 2 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      petals.push(new Petal(x, y, size, speed));
    }

    animatePetals(ctx, petals);

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};

export default CherryBlossom;
