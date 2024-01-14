import type { ProductVariant } from "../../data";
import PrintProductVariantRecipe from "../components/PrintProductVariantRecipe.svelte";

export function printProductVariantRecipe(
  variant: ProductVariant,
  quantity: number = 1
) {
  const printWindow = window.open("/print-recipe", "_blank");
  try {
    printWindow!.document.write(`<!DOCTYPE html>
        <html>
            <head>
                <link rel="stylesheet" href="../../app.css" />
            </head>
            <body>
                <div id="print-doc"></div>
            </body>
        </html>
  `);
    document.head.querySelectorAll("link, style").forEach((htmlElement) => {
      printWindow!.document.head.appendChild(htmlElement.cloneNode(true));
    });
    const target = printWindow!.document.getElementById("print-doc");
    if (!target) throw new Error("Failed to find target element");
    hydrateProductVariantHtml(variant, quantity, target);
    setTimeout(() => {
      printWindow?.print();
    }, 1000);
  } catch (e) {
    console.error(e);
    printWindow?.close();
  }
}

function hydrateProductVariantHtml(
  variant: ProductVariant,
  quantity: number = 1,
  target: HTMLElement
) {
  const { totalCost, price, recipes } = variant;
  if (!recipes) throw new Error("No recipes found");
  let cost = totalCost || 0;
  cost = cost * quantity;
  const totalPrice = price * quantity;
  if (!target) throw new Error("Failed to find target element");
  new PrintProductVariantRecipe({
    target: target,
    props: {
      variant,
      recipes,
      quantity,
      totalCost: cost,
      totalPrice,
    },
  });
}
