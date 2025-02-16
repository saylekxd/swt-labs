import { Info } from 'lucide-react';

interface InfoTooltipProps {
  text: string;
}

export const InfoTooltip = ({ text }: InfoTooltipProps) => (
  <div className="group relative inline-block ml-2">
    <Info className="w-4 h-4 text-neutral-500 hover:text-neutral-300 transition-colors" />
    <div className="pointer-events-none absolute -top-2 left-6 w-48 transform -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <div className="bg-neutral-800 text-neutral-200 text-xs rounded-md p-2 shadow-lg">
        {text}
      </div>
    </div>
  </div>
); 