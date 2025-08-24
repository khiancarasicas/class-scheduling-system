"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/shadcn/components/ui/dialog";
import Image from "next/image";
import { DialogTitle } from "@radix-ui/react-dialog";

export function WarningDialog() {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle>This page is not working properly yet</DialogTitle>
          <p className="text-sm text-muted-foreground">
            We are still working on it. Check back soon.
          </p>
        </DialogHeader>
        <Image
          src="/images/oki_lang.png" // replace with your image path
          alt="Under construction"
          width={1000}
          height={120}
        />
      </DialogContent>
    </Dialog>
  );
}
