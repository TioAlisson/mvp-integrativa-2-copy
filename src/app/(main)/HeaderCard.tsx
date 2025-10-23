'use client'

import { useEffect, useRef, useState } from "react";

interface HeaderCardProps {
  title: string;
  value: string;
  bgColor: string;
  textColor: string;
  perc: number;
}

export default function HeaderCard({ title, value, bgColor, textColor, perc }: HeaderCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const progressBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-black">{title}</h3>
        <p className={`${textColor} font-semibold`}>{value}</p>
      </div>
      <div className="bg-gray-300 rounded-md h-2 mb-4 overflow-hidden">
        <span
          ref={progressBarRef}
          style={{
            width: isMounted ? `${perc}%` : "0%",
            transition: "width 1.5s ease-in-out",
          }}
          className={`h-2 rounded-md block ${bgColor}`}
        ></span>
      </div>
    </div>
  );
}