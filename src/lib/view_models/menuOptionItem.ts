export interface MenuOptionItem {
  name: string;
  icon?: string;
  isActive?: boolean | true;
  onClick: (e: any) => void;
}
