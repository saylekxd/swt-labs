import { Typewriter } from "@/components/ui/typewriter"
import { useMediaQuery } from '@/hooks/useMediaQuery';

function Heading() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={`w-full flex items-center justify-center ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
      <div className="whitespace-pre-wrap text-center">
        <span>{"Urodziliśmy się 🌞, aby "}</span>
        <Typewriter
          text={[
            "tworzyć innowacje z AI",
            "budować przyszłość",
            "dostarczać tanią technologię",
            "wspierać mały i średni biznes",
            "zapewniać najwyższą jakość w najniższej cenie",
          ]}
          speed={70}
          className="text-yellow-500"
          waitTime={3000}
          deleteSpeed={40}
          cursorChar={"_"}
        />
      </div>
    </div>
  )
}

export { Heading } 