"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaArrowDown, FaCheck } from "react-icons/fa";
import autoAnimate from "@formkit/auto-animate";

export default function Dzisiaj() {
  const [number, setNumber] = useState<number>();
  const [status, setStatus] = useState<"higher" | "lower" | "correct" | "none">(
    "none"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(parseInt(e.target.value));
  };

  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const handleClick = async () => {
    const res = await fetch("/dzisiaj/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ number }),
    });
    const data = await res.json();

    setStatus(data.status);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-screen h-screen gap-4"
      style={{
        backgroundImage: "url(trippy.gif)",
        backgroundSize: "cover",
      }}
      ref={parent}
    >
      <div className="p-4 bg-white">
        <input
          type="number"
          min={0}
          max={100_000}
          step={1}
          className="mr-2 transition ease-in-out duration-700"
          placeholder="0 - 100 000"
          onChange={handleChange}
          value={number}
          style={{
            color: status === "correct" ? "green" : undefined,
          }}
        />
        <button
          className="text-center w-6 bg-gray-300 hover:bg-gray-500 transition ease-in-out duration-100"
          onClick={handleClick}
        >
          ?
        </button>
      </div>
        <div
          style={{
            animationName: status === "higher" ? "rotate180" : status === "lower" ? "rotateBack" : undefined,
            animationDuration: ".5s",
            animationFillMode: "forwards",
            display: (status !== "higher" && status !== "lower") ? "none" : undefined,
          }}
          className="text-white w-[100px] aspect-square"
        >
          <FaArrowDown size={100} />
        </div>
      {status === "correct" && (
        <div className="text-white w-[100px] aspect-square">
          <FaCheck size={100} />
        </div>
      )}
    </div>
  );
}
