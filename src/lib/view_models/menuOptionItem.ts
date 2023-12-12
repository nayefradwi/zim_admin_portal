import type { FeatherIcon } from "feather-icons";
import type { ComponentType } from "svelte";

export interface MenuOptionItem {
  name: string;
  isActive?: boolean | true;
  icon?: any | undefined;
  onClick: (e: any) => void;
}
