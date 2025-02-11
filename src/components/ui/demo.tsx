// import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import {
  CpuIcon,
  CodeIcon,
  DollarSignIcon,
  ShieldCheckIcon,
  LeafIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function AnimatedModalDemo() {
  const images = [
    "https://cdn.midjourney.com/32523490-1e9c-48c7-b673-856e4737b2cd/0_1.png",
    "https://cdn.midjourney.com/372509fa-64c7-45e8-a63a-5d578c5cb663/0_3.png",
    "https://cdn.midjourney.com/f219de8d-1010-42c4-8e7c-cfe600692822/0_3.png",
    "https://cdn.midjourney.com/3b0cdcf7-ad99-465b-88e0-06cafa933662/0_1.png",
    "https://cdn.midjourney.com/54d343cb-2397-4992-b08b-7b4b54d6eafa/0_2.png",
  ];
  return (
    <div className="py-0 flex items-center justify-center">
      <Modal>
        <ModalTrigger>
          <div className="relative group/modal-btn bg-black dark:bg-white dark:text-black text-white hover:bg-black/90 dark:hover:bg-white/90 px-4 py-2 rounded-md cursor-pointer overflow-hidden">
            <span className="block transform transition-transform duration-500 group-hover/modal-btn:translate-x-[200%]">
              Sprawdź nasze rozwiązania
            </span>
            <div className="absolute inset-0 flex items-center justify-center transform -translate-x-full transition-transform duration-500 group-hover/modal-btn:translate-x-0">
            ✈️
            </div>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
              Najlepsza jakość technologii w{" "}
              <span className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
                najniższej cenie
              </span>{" "}
              na rynku!
            </h4>
            <div className="flex justify-center items-center">
              {images.map((image, idx) => (
                <motion.div
                  key={"images" + idx}
                  style={{
                    rotate: Math.random() * 20 - 10,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  whileTap={{
                    scale: 1.1,
                    rotate: 0,
                    zIndex: 100,
                  }}
                  className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={image}
                    alt="AI solutions"
                    className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                  />
                </motion.div>
              ))}
            </div>
            <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
              <div className="flex items-center justify-center">
                <CpuIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  AI & Automatyzacja
                </span>
              </div>
              <div className="flex items-center justify-center">
                <CodeIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Web & App Development
                </span>
              </div>
              <div className="flex items-center justify-center">
                <DollarSignIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Optymalizacja kosztów
                </span>
              </div>
              <div className="flex items-center justify-center">
                <ShieldCheckIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  Bezpieczeństwo danych
                </span>
              </div>
              <div className="flex items-center justify-center">
                <LeafIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                  A za każdy projekt, sadzimy drzewo 🌳
                </span>
              </div>
            </div>
          </ModalContent>
          <ModalFooter className="gap-4">
            <Button
              variant="secondary"
              className="w-28 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300"
            >
              Newsletter
            </Button>
            <Button
              variant="default"
              className="w-28 bg-black text-white dark:bg-white dark:text-black border border-black"
            >
              Skontaktuj się
            </Button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}