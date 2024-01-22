import { Input } from "@/components/ui/input";
import CopyButton from "./copy-button";

interface UrlCardProps {
  value: string | null;
}

export default function UrlCard({ value }: UrlCardProps) {
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">서버 주소</p>
        <div className="space-y-2 w-full">
          <div className="w-full flex items-center gap-x-2">
            <Input value={value || ""} disabled placeholder="서버 주소" />
            <CopyButton value={value || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
