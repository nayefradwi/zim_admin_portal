export interface NotificationViewModel {
  id?: number;
  message: string;
  type: "success" | "error" | "warning" | "info";
  position:
    | string
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
}
