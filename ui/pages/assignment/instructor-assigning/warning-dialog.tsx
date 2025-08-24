"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/shadcn/components/ui/dialog";
import Image from "next/image";

export function WarningDialog() {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md text-center">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-lg font-semibold">
            This page is not working properly yet
          </h2>
          <p className="text-sm text-muted-foreground">
            We are still working on it. Check back soon.
          </p>
        </div>
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
