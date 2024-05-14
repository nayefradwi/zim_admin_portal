<script lang="ts">
  import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";

  export let next: () => void;
  export let prev: () => void;
  export let pageNumber: number;
</script>

<dvi class="flex flex-row w-full justify-center items-center">
  <button class="btn btn-xs my-2 mx-1" on:click={prev}>
    <ArrowLeftIcon size="10" />
  </button>
  <span class="text-center text-gray-500">{pageNumber}</span>
  <button class="btn btn-xs my-2 mx-1" on:click={next}>
    <ArrowRightIcon size="10" />
  </button>
</dvi>
