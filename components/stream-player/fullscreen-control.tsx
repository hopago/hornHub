import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullScreenControlProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export default function FullscreenControl({
  isFullscreen,
  onToggle,
}: FullScreenControlProps) {
  const Icon = isFullscreen ? Minimize : Maximize;

  const label = isFullscreen ? "창 모드" : "전체 화면";

  return (
    <div className="flex items-center justify-center gpa-4">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon className="h-5 w-5" />
        </button>
      </Hint>
    </div>
  );
}
