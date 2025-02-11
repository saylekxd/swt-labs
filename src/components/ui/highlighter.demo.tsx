"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Mail, MessageSquare } from "lucide-react";
import { useAnimate } from "framer-motion";

import { Button, buttonVariants } from "@/components/ui/button";

import { HighlighterItem, HighlightGroup, Particles } from "@/components/ui/highlighter";

export function Connect() {
  const [scope, animate] = useAnimate();

  React.useEffect(() => {
    animate(
      [
        ["#pointer", { left: "50%", top: 60 }, { duration: 0 }],
        ["#javascript", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: "20%", top: 102 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#javascript", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#react-js", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: "70%", top: 170 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#react-js", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#typescript", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: "30%", top: 198 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#typescript", { opacity: 0.4 }, { at: "-0.3", duration: 0.1 }],
        ["#next-js", { opacity: 1 }, { duration: 0.3 }],
        [
          "#pointer",
          { left: "50%", top: 60 },
          { at: "+0.5", duration: 0.5, ease: "easeInOut" },
        ],
        ["#next-js", { opacity: 0.5 }, { at: "-0.3", duration: 0.1 }],
      ],
      {
        repeat: Number.POSITIVE_INFINITY,
      },
    );
  }, [animate]);
  return (
    <section className="relative w-full">
      <HighlightGroup className="group h-full">
        <div
          className="group/item h-full"
          data-aos="fade-down"
        >
          <HighlighterItem className="rounded-3xl">
            <div className="relative z-20 h-full overflow-hidden rounded-3xl border border-[#171717] bg-[#191919] dark:border-[#171717] dark:bg-[#191919]">
              <Particles
                className="absolute inset-0 -z-10 opacity-10 transition-opacity duration-1000 ease-in-out group-hover/item:opacity-100"
                quantity={200}
                color={"#555555"}
                vy={-0.2}
              />
              <div className="flex flex-col justify-center">
                <div className="flex h-full flex-col justify-center gap-6 p-4 sm:gap-10 sm:p-6 md:h-[300px] md:flex-row">
                  <div
                    className="relative mx-auto h-[200px] w-[250px] sm:h-[270px] sm:w-[300px]"
                    ref={scope}
                  >
                    <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 sm:h-19 sm:w-19">
                      <img
                        src="/logo-swtlabs.png"
                        alt="Logo"
                        className="h-full w-full"
                      />
                    </div>
                    <div
                      id="next-js"
                      className="absolute bottom-8 left-8 sm:bottom-12 sm:left-14 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Web Development
                    </div>
                    <div
                      id="react-js"
                      className="absolute left-2 top-16 sm:top-20 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      AI Agents
                    </div>
                    <div
                      id="typescript"
                      className="absolute bottom-16 right-1 sm:bottom-20 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Apps
                    </div>
                    <div
                      id="javascript"
                      className="absolute right-8 top-8 sm:right-12 sm:top-10 rounded-3xl border border-slate-400 bg-slate-200 px-2 py-1.5 text-xs opacity-50 dark:border-slate-600 dark:bg-slate-800"
                    >
                      Cost-effective
                    </div>

                    <div id="pointer" className="absolute">
                      <svg
                        width="16.8"
                        height="18.2"
                        viewBox="0 0 12 13"
                        className="fill-[#da7786]"
                        stroke="white"
                        strokeWidth="1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 5.50676L0 0L2.83818 13L6.30623 7.86537L12 5.50676V5.50676Z"
                        />
                      </svg>
                      <span className="bg-ali relative -top-1 left-3 rounded-3xl px-2 py-1 text-xs text-white">
                        swtlabs
                      </span>
                    </div>
                  </div>

                  <div className="flex h-full flex-col justify-center p-2 text-center sm:text-left md:-mt-4 md:ml-10 md:w-[400px]">
                    <div className="flex flex-col items-center sm:items-start">
                      <h3 className="mt-2 sm:mt-6 pb-1 font-bold">
                        <span className="text-xl sm:text-2xl md:text-4xl">
                          Chcesz poznać historie naszych klientów?
                        </span>
                      </h3>
                    </div>
                    <p className="mb-4 text-sm sm:text-base text-slate-400">
                    Odkryj nowe możliwości w krótkiej, niezobowiązującej rozmowie online!
                    </p>
                    <div className="flex justify-center sm:justify-start flex-wrap gap-2">
                      <a
                        href="https://cal.com/aliimam/designali"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button className="bg-[#da7786] text-white hover:bg-[#c85f6c]">
                          Umawiam termin
                        </Button>
                      </a>
                      <a
                        href="mailto:contact@designali.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                        )}
                      >
                        <span className="flex items-center gap-1">
                          <Mail strokeWidth={1} className="h-5 w-5" />
                        </span>
                      </a>
                      <a
                        href="https://wa.me/917678432186"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "icon",
                          }),
                        )}
                      >
                        <span className="flex items-center gap-1">
                          <MessageSquare
                            strokeWidth={1}
                            className="h-4 w-4"
                          />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </HighlighterItem>
        </div>
      </HighlightGroup>
    </section>
  );
}

export default Connect;