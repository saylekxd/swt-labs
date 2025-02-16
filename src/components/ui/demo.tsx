import { lazy, Suspense } from "react";
import { ModalProvider } from "@/components/ui/animated-modal";

const AnimatedModalDemo = lazy(() => import('./AnimatedModalDemo'));

export function AnimatedModalDemoWrapper() {
  return (
    <ModalProvider>
      <Suspense fallback={<div className="text-white">Ładowanie...</div>}>
        <AnimatedModalDemo />
      </Suspense>
    </ModalProvider>
  );
} 
