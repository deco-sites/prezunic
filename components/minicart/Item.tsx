import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useCallback } from "../../sdk/useCallback.ts";
import Icon from "../ui/Icon.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";

export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};

export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}

const QUANTITY_MAX_VALUE = 100;

const onChange = () => {
  const input = event?.currentTarget as HTMLInputElement;
  const item = JSON.parse(
    input.closest("fieldset")!.getAttribute("data-item")!,
  );
  window.DECO.events.dispatch({
    name: item.quantity < input.valueAsNumber
      ? "add_to_cart"
      : "remove_from_cart",
    params: { items: [{ ...item, quantity: input.valueAsNumber }] },
  });
};

const onRemove = () => {
  const button = event?.currentTarget as HTMLButtonElement;
  const input = button.closest("fieldset")
    ?.querySelector<HTMLInputElement>('input[type="number"]')!;
  input.value = "0";
  input.dispatchEvent(new Event("change", { bubbles: true }));
};

function CartItem({ item, index, locale, currency }: Props) {
  const { image, listPrice, price = Infinity, quantity } = item;
  const isGift = price < 0.01;

  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;
  // deno-lint-ignore no-explicit-any
  const itemId = (item as any).item_id;

  return (
    <fieldset
      data-item-id={itemId}
      data-item={JSON.stringify(item)}
      class="grid grid-rows-1 gap-2"
      style={{ gridTemplateColumns: "auto 1fr" }}
    >
      <Image
        alt={name}
        src={image}
        style={{ aspectRatio: "108 / 150" }}
        width={108}
        height={150}
        class="h-full object-contain"
      />

      {/* Info */}
      <div class="flex flex-col gap-2">
        {/* Name and Remove button */}
        <div class="flex justify-between items-center">
          <legend>{name}</legend>
          <button
            disabled={isGift}
            class={clx(isGift ? "hidden" : "btn btn-ghost btn-square")}
            hx-on:click={useCallback(onRemove)}
          >
            <Icon id="Trash" size={24} />
          </button>
        </div>

        {/* Price Block */}
        <div class="flex items-center gap-2">
          <span class="line-through text-sm">
            {formatPrice(listPrice, currency, locale)}
          </span>
          <span class="text-sm text-secondary">
            {isGift ? "Grátis" : formatPrice(price, currency, locale)}
          </span>
        </div>

        {/* Quantity Selector */}
        <div class={clx(isGift && "hidden")}>
          <QuantitySelector
            min={0}
            max={QUANTITY_MAX_VALUE}
            value={quantity}
            name={`item::${index}`}
            hx-on:change={useCallback(onChange)}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default CartItem;
