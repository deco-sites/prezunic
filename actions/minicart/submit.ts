import { type AppContext } from "../../apps/site.ts";
import { type Minicart } from "../../components/minicart/Minicart.tsx";
import { usePlatform } from "../../sdk/usePlatform.tsx";

import linx from "../../sdk/cart/linx/submit.ts";
import vnda from "../../sdk/cart/vnda/submit.ts";
import wake from "../../sdk/cart/wake/submit.ts";
import vtex from "../../sdk/cart/vtex/submit.ts";
import shopify from "../../sdk/cart/shopify/submit.ts";
import nuvemshop from "../../sdk/cart/nuvemshop/submit.ts";

const actions: Record<string, CartSubmitActions> = {
  vtex: vtex as CartSubmitActions,
  vnda: vnda as CartSubmitActions,
  wake: wake as CartSubmitActions,
  linx: linx as CartSubmitActions,
  shopify: shopify as CartSubmitActions,
  nuvemshop: nuvemshop as CartSubmitActions,
};

export interface CartSubmitActions<AC = unknown> {
  setQuantity?: (
    props: {
      items: Array<{ index: number; quantity: number }>;
      original: unknown;
    },
    req: Request,
    ctx: AC,
  ) => Promise<Minicart>;
  setCoupon?: (
    props: { text: string | null },
    req: Request,
    ctx: AC,
  ) => Promise<Minicart>;
}

// Reconstruct the cart state from the received form data
const cartFrom = (
  form: FormData,
): { coupon: string | null; items: number[] } => {
  const coupon = form.get("coupon")?.toString() ?? null;

  const items: number[] = [];
  for (const [key, value] of form.entries()) {
    const [item, it] = key.split("::");
    const index = Number(it);

    if (item !== "item" || Number.isNaN(index)) {
      continue;
    }

    items[index] = Number(value);
  }

  return { coupon, items };
};

async function action(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const { setQuantity, setCoupon } = actions[usePlatform()];

  const form = await req.formData();

  // Original, platform specific cart state
  const original = JSON.parse(
    decodeURIComponent(form.get("original")?.toString() ?? ""),
  );

  const verb = form.get("action")?.toString();
  const cart = cartFrom(form);

  if (verb === "setCoupon") {
    return setCoupon!({ text: cart.coupon }, req, ctx);
  }

  return setQuantity!(
    {
      items: cart.items.map((quantity, index) => ({ quantity, index })),
      original,
    },
    req,
    ctx,
  );
}

export default action;
