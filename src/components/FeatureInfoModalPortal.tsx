import React, { useEffect, useState } from 'react';
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Button } from "@/components/ui/button";

// Define the feature information content in Polish
const featureInfo = {
  "AI Agents": {
    title: "Agenci AI",
    description: "Nasi agenci AI automatyzują złożone zadania, zapewniają inteligentną pomoc i zwiększają produktywność. Można je dostosować do konkretnych potrzeb biznesowych.",
    benefits: [
      "Dostępność 24/7 dla obsługi klienta",
      "Automatyczne przetwarzanie danych",
      "Spersonalizowane doświadczenia użytkownika",
      "Obniżone koszty operacyjne"
    ],
    imageUrl: "https://cdn.midjourney.com/23493f59-7a21-47d6-a94e-a056ba68ff26/0_2.jpeg"
  },
  "Pay-as-you-grow": {
    title: "Płać w miarę rozwoju",
    description: "Nasz elastyczny model cenowy pozwala zacząć od małych inwestycji i skalować się wraz z rozwojem firmy. Płacisz tylko za to, co używasz.",
    benefits: [
      "Brak dużych inwestycji początkowych",
      "Skalowanie zasobów według potrzeb",
      "Przewidywalne koszty miesięczne",
      "Płatność tylko za faktyczne użycie"
    ],
    imageUrl: "https://cdn.midjourney.com/79fc226f-3cb3-49b2-afa5-f96b670adf43/0_1.png"
  },
  "Affordable Excellence": {
    title: "Doskonałość w przystępnej cenie",
    description: "Dostarczamy rozwiązania premium w konkurencyjnych cenach. Nasze efektywne procesy rozwojowe pozwalają oferować wyjątkową wartość bez kompromisów.",
    benefits: [
      "Rozwiązania klasy enterprise w cenach dla MŚP",
      "Przejrzyste ceny bez ukrytych opłat",
      "Wysoki zwrot z inwestycji",
      "Wsparcie premium w standardzie"
    ],
    imageUrl: "https://cdn.midjourney.com/d7dc8d29-866f-460c-9a72-d6a8a775aa62/0_2.png"
  },
  "AI-Powered Solutions": {
    title: "Rozwiązania oparte na AI",
    description: "Wykorzystaj moc sztucznej inteligencji, aby znacząco obniżyć koszty produkcji aplikacji mobilnych oraz webowych. Dzięki naszym rozwiązaniom zmniejszysz wydatki na rozwój aplikacji nawet o 70%.",
    benefits: [
      "Znaczna redukcja kosztów produkcji aplikacji",
      "Zwiększona efektywność realizacji projektów",
      "Łatwiejsze testowanie koncepcji aplikacji",
      "Skrócenie czasu tworzenia UX/UI design "
    ],
    imageUrl: "https://cdn.midjourney.com/ce2c4bb5-b22d-4946-959a-9bf0ae4aaf4f/0_1.jpeg"
  }
};

// Create a global event system for communication between 3D scene and DOM
type FeatureClickEvent = CustomEvent<{ featureLabel: string }>;

// Create a custom event for feature clicks
export const createFeatureClickEvent = (featureLabel: string): FeatureClickEvent => {
  return new CustomEvent<{ featureLabel: string }>('feature-click', {
    detail: { featureLabel },
    bubbles: true,
  });
};

const FeatureInfoModalPortal: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [triggerClick, setTriggerClick] = useState(false);
  
  // Listen for feature click events
  useEffect(() => {
    const handleFeatureClick = (event: Event) => {
      const customEvent = event as FeatureClickEvent;
      console.log("Feature clicked:", customEvent.detail.featureLabel);
      setSelectedFeature(customEvent.detail.featureLabel);
      setShowModal(true);
      // Trigger the modal to open by simulating a click on the trigger
      setTimeout(() => {
        setTriggerClick(true);
      }, 100);
    };

    // Add event listener
    window.addEventListener('feature-click', handleFeatureClick);

    // Clean up
    return () => {
      window.removeEventListener('feature-click', handleFeatureClick);
    };
  }, []);

  // Reset trigger click after it's been used
  useEffect(() => {
    if (triggerClick) {
      setTimeout(() => {
        setTriggerClick(false);
      }, 200);
    }
  }, [triggerClick]);

  // Handle modal close
  const handleClose = () => {
    setShowModal(false);
    setSelectedFeature(undefined);
  };

  // Get feature info based on label
  const feature = selectedFeature ? featureInfo[selectedFeature as keyof typeof featureInfo] : null;

  // If modal shouldn't be shown, return null
  if (!showModal || !feature) {
    return null;
  }

  return (
    <div className="feature-modal-container">
      <ModalProvider>
        <div style={{ display: 'none' }}>
          <ModalTrigger>
            <button ref={(btn) => {
              if (triggerClick && btn) {
                btn.click();
              }
            }}>
              Otwórz Modal
            </button>
          </ModalTrigger>
        </div>
        <ModalBody className="max-w-4xl">
          <ModalContent>
            <div className="flex flex-col md:flex-row gap-6 max-h-[80vh]">
              <div className="md:w-1/2">
                <img 
                  src={feature.imageUrl} 
                  alt={feature.title} 
                  className="rounded-lg w-full h-48 md:h-[400px] object-cover"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h2>
                <p className="text-neutral-700 dark:text-neutral-300 mb-6 text-base md:text-lg">
                  {feature.description}
                </p>
                <h3 className="text-lg md:text-xl font-semibold mb-2">Główne korzyści:</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
                  {feature.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button 
              variant="default" 
              className="bg-black text-white dark:bg-white dark:text-black"
              onClick={handleClose}
            >
              Zamknij
            </Button>
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={() => window.open("https://cal.com/swtlabs/30min", "_blank", "noopener,noreferrer")}
            >
              Kontakt
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalProvider>
    </div>
  );
};

export default FeatureInfoModalPortal; 