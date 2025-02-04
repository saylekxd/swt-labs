import React from "react";
import { Timeline } from "./timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        
        <div>
          
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Zaawansowane rozwiązania sztucznej inteligencji i uczenia maszynowego
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-neutral-800/50 p-6 rounded-lg">
              <h4 className="text-white text-lg mb-2">Natural Language Processing</h4>
              <p className="text-neutral-400 text-sm">Analiza tekstu i przetwarzanie języka naturalnego</p>
            </div>
            <div className="bg-neutral-800/50 p-6 rounded-lg">
              <h4 className="text-white text-lg mb-2">Computer Vision</h4>
              <p className="text-neutral-400 text-sm">Rozpoznawanie obrazów i analiza wideo</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=1"
              alt="Project 1"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=2"
              alt="Project 2"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=3"
              alt="Project 3"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=4"
              alt="Project 4"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Launched innovative solutions in AI and cybersecurity
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=5"
              alt="Project 5"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=6"
              alt="Project 6"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=7"
              alt="Project 7"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=8"
              alt="Project 8"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
            Key achievements and milestones
          </p>
          <div className="mb-8">
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Launched AI consulting services
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Expanded cybersecurity solutions
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Developed custom enterprise software
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Established technology partnerships
            </div>
            <div className="flex gap-2 items-center text-neutral-700 dark:text-neutral-300 text-xs md:text-sm">
              ✅ Grew our client portfolio
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://picsum.photos/800/600?random=9"
              alt="Project 9"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://picsum.photos/800/600?random=10"
              alt="Project 10"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="relative w-full">
      <Timeline data={data} />
    </div>
  );
}