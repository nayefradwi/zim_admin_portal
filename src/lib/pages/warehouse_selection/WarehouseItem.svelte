<script lang="ts">
    import { navigate } from "svelte-routing";
    import {
        setWarehouseHeader,
        setWarehouseSelected,
        type Warehouse,
    } from "../../../data";
    import { HOME_ROUTE } from "../../routes";

    function select() {
        setWarehouseSelected(warehouse.id);
        setWarehouseHeader(warehouse.id);
        navigate(HOME_ROUTE);
    }
    function viewMap() {
        const goolgeMapsUrl = `https://www.google.com/maps/search/?api=1&query=${warehouse.lat},${warehouse.lng}`;
        window.open(goolgeMapsUrl, "_blank");
    }
    export let warehouse: Warehouse;
</script>

<div class="card bg-base-100 shadow-xl mx-2 my-4">
    <div class="card-body">
        <h2 class="card-title">{warehouse.name}</h2>
        <div class="card-actions justify-end">
            <button class="btn btn-primary btn-outline" on:click={viewMap}
                >View Map</button
            >
            <button class="btn btn-primary" on:click={select}>Select</button>
        </div>
    </div>
</div>
