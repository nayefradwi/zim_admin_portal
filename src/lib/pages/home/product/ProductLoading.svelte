<script></script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
  {#each [1, 2, 3] as row (row)}
    {#each [1, 2, 3, 4, 5] as placeholder (placeholder)}
      <div class="card bg-base-100 shadow-md mx-1 my-4 animate-pulse">
        <div class="card-body">
          <div class="h-6 bg-base-200 rounded"></div>
          <div class="h-4 bg-base-200 mt-2 rounded"></div>
          <div class="h-4 bg-base-200 mt-2 rounded"></div>
        </div>
      </div>
    {/each}
  {/each}
</div>

<style>
  .grid {
    width: 80vw;
  }
</style>
