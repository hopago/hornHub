"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/use-sidebar"
import { ArrowLeftFromLine, ArrowRight } from "lucide-react";
import { Hint } from "@/components/hint";

export default function Toggle() {
  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  const label = collapsed ? "열기" : "닫기";

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
          <Hint label={label} side="right" asChild>
            <Button variant="ghost" className="h-auto p-2" onClick={onExpand}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
      {!collapsed && (
        <div className="p-3 pl-6 mb-2 flex items-center w-full">
          <p className="font-semibold text-primary">탐색</p>
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              className="h-auto p-2 ml-auto"
              variant="ghost"
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  );
}
