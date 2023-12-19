<script lang="ts">
  export let key: string;
  export let value: string;
  export let color:
    | string
    | "text-primary"
    | "text-secondary"
    | "text-tertiary"
    | "text-error"
    | "text-success"
    | "text-neutral" = "text-neutral";

  export let description: string | undefined = undefined;
</script>

<div class="stats shadow m-2">
  <div class="stat">
    <div class="stat-title">{key}</div>
    <div class="stat-value {color}">{value}</div>
    {#if description}
      <div class="stat-desc">{description}</div>
    {/if}
  </div>
</div>

<style>
  .stat-value {
    @apply text-2xl;
  }
</style>
