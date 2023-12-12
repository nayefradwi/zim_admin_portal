<script lang="ts">
  import { MoreVerticalIcon } from "svelte-feather-icons";
  import type { MenuOptionItem } from "../view_models/menuOptionItem";
  export let items: MenuOptionItem[];
</script>

<div class="dropdown dropdown-hover">
  <div class="btn-s" role="button">
    <MoreVerticalIcon class="btn-s" />
  </div>
  <ul
    tabindex="0"
    role="menu"
    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    {#each items as item}
      <li>
        <a href="/" class="disabled" on:click={item.onClick} role="menuitem"
          >{item.name}</a
        >
      </li>
    {/each}
  </ul>
</div>
