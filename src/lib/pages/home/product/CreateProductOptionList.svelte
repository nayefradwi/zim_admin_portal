<script lang="ts">
  import { XIcon } from "svelte-feather-icons";

  export let optionEntries: [string, string[]][];
  export let onOptionValueAdded: (e: KeyboardEvent, option: string) => void;
  export let onOptionValueRemoved: (option: string, value: string) => void;
  export let onOptionRemoved: (option: string) => void;
</script>

{#each optionEntries as [optionKey, optionValues]}
  <div class="flex flex-row my-2 w-full">
    <span class="text-gray-700 mr-2">{optionKey}:</span>
    <input
      type="text"
      class="input input-bordered input-sm w-full"
      on:keypress={(e) => onOptionValueAdded(e, optionKey)}
    />
    <button on:click={() => onOptionRemoved(optionKey)}>
      <XIcon size="16" class="text-error" />
    </button>
  </div>
  <div class="flex flex-wrap">
    {#each optionValues as value}
      <div class="chip">
        <span>{value}</span>
        <button
          class="btn btn-ghost btn-xs p-0"
          on:click={() => onOptionValueRemoved(optionKey, value)}
        >
          <XIcon size="16" />
        </button>
      </div>
    {/each}
  </div>
{/each}

<style>
  .chip {
    background-color: #f3f4f6; /* light gray */
    border-radius: 9999px; /* fully rounded */
    padding: 0.25rem 0.75rem; /* y and x padding */
    margin-right: 0.5rem; /* right margin */
    margin-bottom: 0.5rem; /* bottom margin */
    align-items: center;
    display: flex;
    gap: 0.5rem;
  }
</style>
