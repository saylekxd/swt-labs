import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

interface ErrorResponse {
  status?: number;
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = { 
    status: 404, 
    statusText: "Strona nie znaleziona",
    message: "Żądany zasób nie został odnaleziony"
  } as ErrorResponse;
  const navigate = useNavigate();

  const getErrorMessage = () => {
    switch (error.status) {
      case 404:
        return "Ups! Strona, której szukasz, nie istnieje.";
      case 500:
        return "Błąd serwera. Prosimy spróbować później.";
      default:
        return "Wystąpił nieoczekiwany błąd.";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-lg w-full"
      >
        <div className="relative inline-block">
          <motion.div
            className="text-9xl font-bold text-primary/80 absolute -top-24 left-1/2 -translate-x-1/2 opacity-20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            
          </motion.div>
          <motion.h1
            className="text-8xl font-black bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {error.status || "!"}
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 bg-background/80 backdrop-blur-sm p-6 rounded-xl border shadow-lg"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {getErrorMessage()}
          </h2>
          
          <p className="text-muted-foreground/90 text-lg leading-relaxed">
            {error.statusText || error.message}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              variant="default"
              size="lg"
              onClick={() => navigate(-1)}
              className="gap-2 hover:gap-3 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Wróć
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/")}
              className="gap-2 hover:gap-3 transition-all"
            >
              <Home className="h-4 w-4" />
              Strona główna
            </Button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-muted-foreground/70 pt-8"
        >
          Potrzebujesz pomocy?{" "}
          <a
            href="mailto:kontakt@swtlabs.pl"
            className="underline hover:text-primary transition-colors"
          >
            Skontaktuj się z pomocą techniczną
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
} 