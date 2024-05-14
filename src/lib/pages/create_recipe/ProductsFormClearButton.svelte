<script lang="ts">
  import { XIcon } from "svelte-feather-icons";

  export let onClick: () => void;
</script>

<button class="icon-btn" on:click={onClick}>
  <XIcon />
</button>

<style>
  .icon-btn {
    @apply text-error;
  }
</style>
