<script lang="ts">
  import type { NotificationViewModel } from "../view_models/notification";
  export let notification: NotificationViewModel;
  let color = `alert-${notification.type}`;
</script>

<div class={notification.position}>
  <div role="alert" class="alert {color}">
    <!-- TODO: fill icon -->
    <span>{notification.message}</span>
  </div>
</div>

<style>
</style>
