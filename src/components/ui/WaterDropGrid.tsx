"use client";
import { useEffect } from "react";
import anime from "animejs";

const GRID_WIDTH = 25;
const GRID_HEIGHT = 25;

const WaterDropGrid = () => {
  return (
    <div className="relative grid place-content-center bg-transparent px-8 py-12">
      <DotGrid />
    </div>
  );
};

const DotGrid = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const animateDots = () => {
        anime({
          targets: ".dot-point",
          scale: [
            { value: 1.35, easing: "easeOutSine", duration: 350 },
            { value: 1, easing: "easeInOutQuad", duration: 550 },
          ],
          translateY: [
            { value: -35, easing: "easeOutSine", duration: 350 },
            { value: 0, easing: "easeInOutQuad", duration: 550 },
          ],
          opacity: [
            { value: 1, easing: "easeOutSine", duration: 350 },
            { value: 0.5, easing: "easeInOutQuad", duration: 550 },
          ],
          delay: anime.stagger(100, {
            grid: [GRID_WIDTH, GRID_HEIGHT],
            from: "center", // Animate from the center
          }),
          loop: true, // Loop the animation
        });
      };

      animateDots(); // Trigger the animation on mount
    }
  }, []);

  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          className="group rounded-full p-2" //removed cursor-crosshair and hover effect.
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point h-2 w-2 rounded-full bg-gradient-to-b from-slate-500 to-slate-400 opacity-50" //removed group:hover effect.
            data-index={index}
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="grid w-fit"
    >
      {dots}
    </div>
  );
};

export default WaterDropGrid;