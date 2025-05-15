// components/ui/Spinner.tsx

import { ArrowPathIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";

type SpinnerProps = {
  className?: string;
  size?: number; // opcional, para controlar el tamaño
};

export default function Spinner({ className, size = 20 }: SpinnerProps) {
  return (
    <ArrowPathIcon
      className={clsx("ml-auto h-5 w-5 animate-spin text-gray-50", className)}
      style={{ width: size, height: size }}
    />
  );
}
