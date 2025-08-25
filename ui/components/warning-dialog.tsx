"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shadcn/components/ui/dialog";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";

export function WarningDialog({
  src,
  title,
  description,
}: {
  src?: string;
  title?: string;
  description?: string;
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle>
            {title || "This page is not working properly yet"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            {description || "We are still working on it."}
          </p>
        </DialogHeader>
        <Image
          src={src || "/images/oki_lang.png"} // replace with your image path
          alt=""
          width={1000}
          height={120}
        />
      </DialogContent>
    </Dialog>
  );
}
