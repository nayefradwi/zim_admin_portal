<script lang="ts">
    import { onDestroy } from "svelte";
    import {
        getResponse,
        IngredientRepo,
        type Inventory,
        type ModifyInventoryRequest,
    } from "../../data";
    import { writable } from "svelte/store";
    export let showModal: boolean;

    let dialog: HTMLDialogElement;

    $: if (dialog && showModal) dialog.showModal();
    export let isIncrement: boolean = false;
    export let inventory: Inventory;
    export let onSuccessfulModify: () => void;
    const modifiedQty = writable(0);
    let newStock: number = inventory.quantity;
    let isLoading: boolean = false;
    const unsubscribe = modifiedQty.subscribe((val) => {
        if (val < 0) return modifiedQty.set(0);
        if (isIncrement) return (newStock = inventory.quantity + val);
        newStock = inventory.quantity - val;
    });
    function onSuccess() {
        isLoading = false;
        showModal = false;
        dialog.close();
        void onSuccessfulModify();
    }
    function increment(data: ModifyInventoryRequest) {
        if (newStock < 0) return modifiedQty.set(0);

        getResponse<void>({
            call: () => IngredientRepo.incrementInventory(data),
            onSuccess(data) {
                onSuccess();
            },
            onError(err) {
                isLoading = false;
            },
        });
    }
    function decrement(data: ModifyInventoryRequest) {
        if (newStock < 0) return modifiedQty.set(0);
        getResponse<void>({
            call: () => IngredientRepo.decrementInventory(data),
            onSuccess(data) {
                onSuccess();
            },
            onError(err) {
                isLoading = false;
            },
        });
    }

    function modify() {
        if (isLoading) return;
        isLoading = true;
        let data: ModifyInventoryRequest = {
            ingredientId: inventory.ingredient.id,
            quantity: $modifiedQty,
            // TODO: make unit user selected and get use conversions
            unitId: inventory.unit?.id,
        };
        if (isIncrement) return increment(data);
        return decrement(data);
    }

    onDestroy(() => {
        unsubscribe();
    });
</script>

<dialog
    bind:this={dialog}
    on:close={() => {
        if (isLoading) return;
        $modifiedQty = 0;
        newStock = 0;
        showModal = false;
    }}
    class="modal modal-bottom sm:modal-middle"
>
    <div class="modal-box">
        <div class="flex flex-col items-start justify-center">
            <h3 class="font-bold text-lg">
                {isIncrement
                    ? "Increment Ingredient:"
                    : "Decrement Ingredient:"}
                {inventory.ingredient.name} / {inventory.ingredient.brand}
            </h3>
            <p class="py-4">
                Current stock: {newStock}{inventory.unit
                    ? inventory.unit.symbol
                    : ""}
            </p>
        </div>
        <div class="flex flex-row justify-between items-center">
            <input
                type="number"
                min="0"
                class="input input-bordered flex-grow mx-2"
                bind:value={$modifiedQty}
            />
            {#if inventory.unit}
                <div>{inventory.unit.symbol}</div>
            {/if}
        </div>
        <div class="modal-action">
            <button on:click={modify} class="btn btn-outline btn-primary">
                {#if isLoading}
                    <span class="loading loading-spinner" />
                {/if}
                Confirm
            </button>
            <form method="dialog">
                <button class="btn {isLoading ? 'btn-disabled' : null}"
                    >Close</button
                >
            </form>
        </div>
    </div>
</dialog>
