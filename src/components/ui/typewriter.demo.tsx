import { Typewriter } from "@/components/ui/typewriter"

function Heading() {
  return (
    <div className="w-full h-full md:text-4xl lg:text-5xl sm:text-3xl text-2xl flex flex-row items-start justify-start bg-background font-normal overflow-hidden p-16 pt-8">
      <p className="whitespace-pre-wrap">
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