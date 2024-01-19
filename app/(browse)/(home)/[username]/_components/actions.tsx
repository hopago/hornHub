"use client";

import { onFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";

export const Actions = () => {
  const onClick = async () => {
    const data = await onFollow("");
  }

  return (
    <Button onClick={onClick} variant="primary">
      팔로우
    </Button>
  );
};
