<script lang="ts">
  import toast from "svelte-french-toast";
  import { unitStore } from "../../../stores/unit";
  import { writable } from "svelte/store";
  export let showModal: boolean;

  export let onSuccessfulCreation: () => void;

  $: if (dialog && showModal) dialog.showModal();

  let isLoading: boolean = false;
  let dialog: HTMLDialogElement;
  let name: string | undefined;
  let price: number | undefined;
  let expiresInDays: number | undefined;
  let unitId: number | undefined;
  let isIngredient: boolean = false;
  let option: string | undefined;
  const optionsStore = writable<Record<string, string[]>>({});
  $: optionEntries = Object.entries($optionsStore);

  function onSuccess() {
    isLoading = false;
    showModal = false;
    dialog.close();
    toast.success("Batch modified");
    onSuccessfulCreation();
  }

  function enforceInteger(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value ? String(Math.floor(Number(input.value))) : "";
  }

  function onOptionAdded(e: Event): void {
    if (!option) return;
    if (!(e instanceof KeyboardEvent)) return;
    if (e.key !== "Enter") return;
    const optionValue = option.trim();
    if (!optionValue) return;
    optionsStore.update((options) => {
      const newOptions = { ...options };
      newOptions[optionValue] = [];
      return newOptions;
    });
    option = "";
  }

  function onClose(): void {
    if (isLoading) return;
    showModal = false;
    optionsStore.set({});
    isIngredient = false;
    name = undefined;
    price = undefined;
    expiresInDays = undefined;
    option = undefined;
  }
</script>

<dialog
  bind:this={dialog}
  on:close={onClose}
  class="modal modal-bottom sm:modal-middle"
>
  <div class="modal-box p-4 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Add Product</h1>

    <div class="space-y-4">
      <input
        placeholder="Name"
        class="input input-bordered input-sm w-full"
        bind:value={name}
      />

      <input
        type="number"
        placeholder="Price"
        class="input input-bordered input-sm w-full"
        min="1"
        on:input={enforceInteger}
        bind:value={price}
      />

      <input
        type="number"
        placeholder="Expires in days"
        class="input input-bordered input-sm w-full"
        min="1"
        on:input={enforceInteger}
        bind:value={expiresInDays}
      />

      <select bind:value={unitId} class="select select-bordered w-full">
        {#each $unitStore as unit}
          <option value={unit.id}>{unit.name}</option>
        {/each}
      </select>

      <input
        bind:value={option}
        on:keydown={onOptionAdded}
        placeholder="Options"
        class="input input-bordered input-sm w-full"
      />

      {#each optionEntries as optionKey, optionValues}
        <p>{optionKey}</p>
      {/each}

      <label class="flex items-center space-x-3">
        <input
          bind:checked={isIngredient}
          type="checkbox"
          class="checkbox checkbox-primary"
        />
        <span class="text-gray-700">Is Ingredient?</span>
      </label>
    </div>

    <div class="modal-action mt-6">
      <button class="btn btn-primary">Create product</button>
      <form method="dialog">
        <button class="btn">Cancel</button>
      </form>
    </div>
  </div>
</dialog>

<style>
  /* CSS to hide the number input stepper */
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield; /* For Firefox */
  }
</style>
