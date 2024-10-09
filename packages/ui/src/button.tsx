"use client";

import { ReactNode } from "react";

interface ButtonProps {
  onClick : () => void,
  text: String
}

export const Button = ({onClick, text}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
    >
      {text}
    </button>
  );
};
