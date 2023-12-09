<script lang="ts">
  import BatchTable from "./BatchTable.svelte";
</script>

<div class="overflow-x-auto m-4 flex flex-col">
  <div class="my-4 mx-1 flex flex-row justify-end">
    <input
      type="text"
      placeholder="Search"
      class="input input-bordered mr-2 input-sm w-full"
    />
    <!-- TODO create batch -->
    <button class="btn btn-outline btn-primary btn-sm no-animation"
      >Create Batch</button
    >
  </div>
  <BatchTable />
</div>
