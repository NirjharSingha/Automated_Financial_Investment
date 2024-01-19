"use client";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function ToastWithAction({
  title,
  description = "",
  action = "close",
  variant = "outline",
  toastRef,
  handler = () => {},
}) {
  const { toast } = useToast();

  return (
    <Button
      ref={toastRef}
      variant={variant}
      onClick={() => {
        toast({
          title: title,
          description: description,
          action: (
            <ToastAction altText="Try again" onClick={handler}>
              {action}
            </ToastAction>
          ),
        });
      }}
    >
      Show Toast
    </Button>
  );
}
