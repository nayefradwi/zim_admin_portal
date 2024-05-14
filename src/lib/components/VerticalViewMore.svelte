<script lang="ts">
  import { MoreVerticalIcon } from "svelte-feather-icons";
  import type { MenuOptionItem } from "../view_models/menuOptionItem";
  export let items: MenuOptionItem[];
  export let size: "xs" | "sm" | "md" | "lg" = "xs";
  export let position:
    | "dropdown-top"
    | "dropdown-bottom"
    | "dropdown-left"
    | "dropdown-right" = "dropdown-bottom";

  const onClick = (e: any, item: MenuOptionItem): void => {
    e.preventDefault();
    return item.onClick(e);
  };
</script>

<div class="dropdown dropdown-hover {position}">
  <div class="btn-{size}" role="button">
    <MoreVerticalIcon />
  </div>
  <ul
    tabindex="0"
    role="menu"
    class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
  >
    {#each items as item}
      <li>
        <a
          href="/"
          class="disabled"
          on:click={(e) => onClick(e, item)}
          role="menuitem text-{size}"
        >
          {#if item.icon}
            <svelte:component this={item.icon} class="text-{size}" />
          {/if}
          {item.name}
        </a>
      </li>
    {/each}
  </ul>
</div>
