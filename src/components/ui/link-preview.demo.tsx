// import React from "react";
import { LinkPreview } from "./link-preview";

export function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-start h-[20rem] flex-col">
      <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left mb-10">
        <span>Nasz klient{" "}</span>
        <LinkPreview
          url="https://www.wspieramycieswt.pl"
          imageSrc="/images/300percentPortfolio.webp"
          isStatic
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
          target="_blank"
          rel="noopener noreferrer"
        >
          zwiększył efektywność o 300%
        </LinkPreview>
        <span>{" "}dzięki wdrożeniu naszej aplikacji doradczej z asystentami AI.</span>
      </div>

      <div className="text-neutral-500 dark:text-neutral-400 text-xl md:text-3xl max-w-3xl text-left">
        <span>Platforma muzyczna została przygotowana pod{" "}</span>
        <LinkPreview
          url="https://www.fairtune.pl"
          imageSrc="/images/cloudPortfolio.webp"
          isStatic
          className="font-bold"
          target="_blank"
          rel="noopener noreferrer"
        >
          wniosek grantowy,
        </LinkPreview>
        <span>{" "}a nasz{" "}</span>
        <LinkPreview
          url="/tech"
          imageSrc="/images/aiPoweredPortfolio.webp"
          isStatic
          className="font-bold"
        >
          AI-powered development
        </LinkPreview>
        <span>{" "}obniżył koszty produkcji MVP o 40%</span>
      </div>
    </div>
  );
} 