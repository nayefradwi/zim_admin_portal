export interface MenuOptionItem {
  name: string;
  isActive?: boolean | true;
  icon?: any | undefined;
  onClick: (e: any) => void;
}
