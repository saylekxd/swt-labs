import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "Jak osiągacie niskie koszty przy zachowaniu wysokiej jakości?",
    content:
      "Łączymy doświadczonych programistów z zaawansowanymi narzędziami AI w procesie developmentu. AI-powered development pozwala nam na automatyzację wielu aspektów tworzenia oprogramowania, co znacząco redukuje koszty i przyspiesza proces produkcji, bez kompromisów w jakości. Nasze rozwiązania pozwalają na redukcję kosztów operacyjnych nawet do 40%, jednocześnie zapewniając najwyższą jakość kodu.",
  },
  {
    id: "2",
    title: "Jakie korzyści daje AI-Powered Development?",
    content:
      "AI-Powered Development to nasza kluczowa przewaga - wykorzystujemy sztuczną inteligencję do automatyzacji procesu developmentu, w tym generowania kodu, testowania aplikacji i optymalizacji infrastruktury backendowej. Pozwala to na znaczące przyspieszenie prac, redukcję kosztów operacyjnych i szybsze wdrażanie nowych funkcjonalności. Dodatkowo, AI wspomaga nas w procesie QA i optymalizacji wydajności aplikacji.",
  },
  {
    id: "3",
    title: "Jak wykorzystujecie AI w obsłudze klienta?",
    content:
      "Wdrażamy zaawansowane rozwiązania AI w obsłudze klienta, takie jak inteligentni agenci głosowi (Voice Agent AI) i chatboty, którzy są dostępni 24/7. Nasi asystenci AI potrafią prowadzić naturalne rozmowy, obsługiwać rezerwacje i zapewniać wsparcie techniczne bez interwencji człowieka. System integruje się z CRM i uczy się na podstawie każdej interakcji, stale poprawiając jakość obsługi.",
  },
  {
    id: "4",
    title: "Jakie rozwiązania oferujecie w zakresie automatyzacji?",
    content:
      "Nasze rozwiązania automatyzacyjne obejmują szereg obszarów: od automatyzacji rutynowych zadań operacyjnych i marketingowych, przez inteligentne systemy pozyskiwania leadów, aż po zaawansowaną analizę danych. Wykorzystujemy AI do personalizacji marketingu i tworzenia systemów rekomendacyjnych, które potrafią analizować preferencje klientów w godziny zamiast tygodni.",
  },
  {
    id: "5",
    title: "Dlaczego warto wybrać wasze rozwiązania technologiczne?",
    content:
      "Oferujemy unikalne połączenie doświadczenia w rozwoju oprogramowania z najnowszymi technologiami AI, co przekłada się na wyjątkową efektywność kosztową i szybkość realizacji projektów. Tworzymy skalowalne i nowoczesne aplikacje webowe oraz mobilne, wykorzystując AI do optymalizacji procesu developmentu. Nasze rozwiązania nie tylko obniżają koszty operacyjne, ale też dają przewagę konkurencyjną poprzez automatyzację i inteligentną analizę danych.",
  },
];

export function AccordionDemo() {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="1">
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="border-none bg-background rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 text-[15px] leading-6 hover:no-underline hover:bg-neutral-800/70 transition-colors">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default AccordionDemo; 