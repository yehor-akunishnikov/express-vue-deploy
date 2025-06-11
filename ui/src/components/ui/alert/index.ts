import { cva, type VariantProps } from "class-variance-authority";

export { default as AlertDescription } from "./AlertDescription.vue";
export { default as AlertTitle } from "./AlertTitle.vue";
import { ALERT_SEVERITY } from "@/types/common";

export { default as Alert } from "./Alert.vue";

export const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] " +
    "grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 " +
    "[&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        [ALERT_SEVERITY.INFO]:
          "border-blue-600 text-blue-600 bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-blue-600/90",
        [ALERT_SEVERITY.WARNING]:
          "border-yellow-600 text-yellow-600 bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-yellow-600/90",
        [ALERT_SEVERITY.ERROR]:
          "border-destructive text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type AlertVariants = VariantProps<typeof alertVariants>;
