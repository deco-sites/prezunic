import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import { Ring } from "./ProductVariantSelector.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;
}

const WIDTH = 118;
const HEIGHT = 118;

function ProductCard({
  product,
  preload,
  itemListName,
  index,
}: Props) {
  const {
    url,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const title = isVariantOf?.name ?? product.name;
  const [front, back] = images ?? [];
  const { listPrice, price, seller = "1" } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant, product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});
  const relativeUrl = relative(url);
  const aspectRatio = `${WIDTH} / ${HEIGHT}`;

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [
          mapProductToAnalyticsItem({
            product,
            price,
            listPrice,
            index,
          }),
        ],
      },
    },
  });

  const isSuggestion = itemListName === "Suggestions";

  return (
    <div class={clx(isSuggestion ? "" : "px-2")}>
      <div
        {...event}
        data-deco="view-product"
        class={clx(
          "card card-compact group w-full bg-white",
          "lg:border lg:border-transparent lg:hover:border-inherit",
          isSuggestion ? "" : "p-2 lg:p-4",
        )}
      >
        <div
          class={clx(
            "flex",
            isSuggestion
              ? "flex-row border-[1px] border-[#dedede] rounded p-2"
              : "flex-col gap-2",
          )}
        >
          <div class="w-full flex justify-center">
            <figure
              class="relative overflow-hidden w-[118px] h-[118px]"
              style={{ aspectRatio }}
            >
              {/* Product Images */}
              <a
                href={relativeUrl}
                aria-label="view product"
                class={clx(
                  "absolute top-0 left-0",
                  "grid grid-cols-1 grid-rows-1",
                  "w-full",
                )}
              >
                <Image
                  src={front.url!}
                  alt={front.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  style={{ aspectRatio }}
                  class={clx(
                    "bg-base-100",
                    "object-cover",
                    "rounded w-full",
                    "col-span-full row-span-full",
                    "w-[118px] h-[118px]",
                  )}
                  sizes="(max-width: 640px) 50vw, 20vw"
                  preload={preload}
                  loading={preload ? "eager" : "lazy"}
                  decoding="async"
                />
                <Image
                  src={back?.url ?? front.url!}
                  alt={back?.alternateName ?? front.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  style={{ aspectRatio }}
                  class={clx(
                    "bg-base-100",
                    "object-cover",
                    "rounded w-full",
                    "col-span-full row-span-full",
                    "transition-opacity opacity-0 lg:group-hover:opacity-100",
                    "w-[118px] h-[118px]",
                  )}
                  sizes="(max-width: 640px) 50vw, 20vw"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </figure>
          </div>

          {/* SKU Selector */}
          <ul class={clx("flex items-center justify-center gap-4", "min-h-8")}>
            {variants.length > 1 &&
              variants.map(([value, link]) => [value, relative(link)] as const)
                .map(([value, link]) => (
                  <li>
                    <a href={link} class="avatar cursor-pointer">
                      <Ring value={value} />
                    </a>
                  </li>
                ))}
          </ul>

          {/* Name/Description */}
          <div class="flex flex-col">
            <h3
              class="text-sm overflow-ellipsis overflow-hidden"
              style={{
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
              }}
              dangerouslySetInnerHTML={{ __html: title ?? "" }}
            />
          </div>

          {/* Price from/to */}
          <div class="flex gap-2 items-center justify-start font-light">
            <span class="font-bold">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>

          {price && listPrice && (
            <AddToCartButton
              product={product}
              price={price}
              listPrice={listPrice}
              seller={seller}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
