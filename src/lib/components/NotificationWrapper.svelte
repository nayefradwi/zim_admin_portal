<script lang="ts">
  import { notificationStore } from "../stores/notification";
  import Notification from "./Notification.svelte";
</script>

<div>
  {#each $notificationStore as notification}
    <Notification {notification} />
  {/each}
  <slot />
</div>
