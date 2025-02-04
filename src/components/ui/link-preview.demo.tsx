import React from "react";
import { LinkPreview } from "./link-preview";

export function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-start h-[20rem] flex-col">
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left mb-10">
        Visit{" "}
        <LinkPreview
          url="https://ui.aceternity.com"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
          Aceternity UI
        </LinkPreview>{" "}
        and for amazing Tailwind and Framer Motion components.
      </p>

      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left">
        I listen to{" "}
        <LinkPreview
          url="https://www.youtube.com/watch?v=S-z6vyR89Ig&list=RDMM&index=3"
          imageSrc="https://ui.aceternity.com/_next/image?url=%2Fimages%2Fimraan-hashmi.jpeg&w=640&q=50"
          isStatic
          className="font-bold"
        >
          this guy
        </LinkPreview>{" "}
        and I watch{" "}
        <LinkPreview
          url="/templates"
          imageSrc="https://ui.aceternity.com/_next/image?url=%2Fimages%2Ffight-club.jpeg&w=640&q=50"
          isStatic
          className="font-bold"
        >eq
          this movie
        </LinkPreview>{" "}
        twice a day
      </p>
    </div>
  );
} 