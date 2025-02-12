import React, { useEffect, useRef } from "react";

const Snowfall = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 눈송이 클래스 정의
  class Snowflake {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;

    constructor(x: number, y: number, size: number, speed: number) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speed = speed;
      this.opacity = Math.random() * 0.2 + 0.5; // 눈송이의 불투명도 설정
    }

    update() {
      this.y += this.speed;
      if (this.y > window.innerHeight) {
        this.y = -this.size;
        this.x = Math.random() * window.innerWidth;
      }
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  // 애니메이션 실행 함수
  const animateSnowfall = (
    ctx: CanvasRenderingContext2D,
    snowflakes: Snowflake[]
  ) => {
    if (!ctx) return; // ctx가 null인 경우 종료

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // 전체 화면을 지웁니다.
    snowflakes.forEach((snowflake) => {
      snowflake.update();
      snowflake.draw(ctx);
    });
    requestAnimationFrame(() => animateSnowfall(ctx, snowflakes));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // canvasRef.current가 null인 경우 바로 종료

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // ctx가 null인 경우 종료

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 눈송이 배열 생성
    const snowflakes: Snowflake[] = [];
    const maxSnowflakes = 50;

    // 눈송이 생성
    for (let i = 0; i < maxSnowflakes; i++) {
      const size = Math.random() * 3 + 1;
      const speed = Math.random() * 1 + 0.8;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      snowflakes.push(new Snowflake(x, y, size, speed));
    }

    // 애니메이션 시작
    animateSnowfall(ctx, snowflakes);

    // 화면 크기 변경 시 캔버스 크기 업데이트
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    // cleanup (이벤트 리스너 제거)
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
        zIndex: 100,
        pointerEvents: "none",
      }}
    />
  );
};

export default Snowfall;
