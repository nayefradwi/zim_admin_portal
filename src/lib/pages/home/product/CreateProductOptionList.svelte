<script lang="ts">
  import { PlusIcon, XIcon } from "svelte-feather-icons";

  export let optionEntries: [string, string[]][];
  export let onOptionValueAdded: (option: string, value: string) => void;
  export let onOptionValueRemoved: (option: string, value: string) => void;
  export let onOptionRemoved: (option: string) => void;

  function _onOptionValueAdded(e: Event, optionKey: string): void {
    if (e instanceof KeyboardEvent && e.key !== "Enter") return;
    const input = window.document.getElementById(optionKey) as HTMLInputElement;
    if (!input) return;
    const inputValue = input.value;
    if (!inputValue) return;
    onOptionValueAdded(optionKey, inputValue);
    input.value = "";
  }
</script>

{#each optionEntries as [optionKey, optionValues]}
  <div class="flex flex-row w-full space-x-2">
    <span class="text-gray-700">{optionKey}:</span>
    <input
      id={optionKey}
      type="text"
      class="input input-bordered input-sm w-full"
      on:keypress={(e) => _onOptionValueAdded(e, optionKey)}
    />
    <button
      class="btn btn-sm"
      on:click={(e) => _onOptionValueAdded(e, optionKey)}
    >
      <PlusIcon size="16" />
    </button>
    <button class="btn btn-sm" on:click={() => onOptionRemoved(optionKey)}>
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
