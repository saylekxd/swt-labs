import { Typewriter } from "@/components/ui/typewriter"
import { useMediaQuery } from '@/hooks/useMediaQuery';

function Heading() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={`w-full flex items-center justify-center ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
      <p className="whitespace-pre-wrap text-center">
        <span>{"We're born 🌞 to "}</span>
        <Typewriter
          text={[
            "experience",
            "dance",
            "help",
            "be alive",
            "create things with love",
          ]}
          speed={70}
          className="text-yellow-500"
          waitTime={3000}
          deleteSpeed={40}
          cursorChar={"_"}
        />
      </p>
    </div>
  )
}

export { Heading } 