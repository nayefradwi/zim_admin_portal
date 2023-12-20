import { writable, get } from "svelte/store";
import { type NotificationViewModel } from "../view_models/notification";

function createNotificationStore() {
  const store = writable<NotificationViewModel[]>([]);
  const { subscribe, set } = store;
  return {
    subscribe,
    set,
    addNotification: (notification: NotificationViewModel) => {
      if (!notification.id) notification.id = get(store).length + 1;
      setTimeout(() => {
        notificationStore.removeNotification(notification.id ?? 0);
      }, 3000);
      store.update((notifications) => [...notifications, notification]);
    },
    removeNotification: (id: number) => {
      store.update((notifications) => notifications.filter((n) => n.id !== id));
    },
  };
}

export const notificationStore = createNotificationStore();

export function addNotification(
  message: string,
  position: string = "top-right"
) {
  notificationStore.addNotification({
    message,
    type: "success",
    position: position,
  });
}

export function addErrorNotification(
  message: string,
  position: string = "top-right"
) {
  notificationStore.addNotification({
    message,
    type: "error",
    position: position,
  });
}

export function removeNotification(id: number) {
  notificationStore.removeNotification(id);
}
