import Image from "deco-sites/std/components/Image.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistIcon from "$store/islands/WishlistButton.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { SendEventOnClick } from "$store/sdk/analytics.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import Button from "$store/components/ui/Button.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
  layout?: Layout;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

const WIDTH = 118;
const HEIGHT = 118;

function ProductCard({ product, preload, itemListName, layout }: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const productGroupID = isVariantOf?.productGroupID;
  const [front, back] = images ?? [];
  const { listPrice, price, installments } = useOffer(offers);
  const possibilities = useVariantPossibilities(product);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, [link]]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : "default"}
          content={value}
        />
      </a>
    </li>
  ));
  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block"
    >
      {l?.basics?.ctaText || "Ver produto"}
    </a>
  );
  return (
    <div class="relative w-[230px] h-[366px] drop-shadow-md p-4 pt-8 flex flex-col bg-white rounded-2xl items-center justify-between">
      <a
        href={url && relative(url)}
        aria-label="view product"
        class="contents"
      >
        <div class=" w-full flex justify-center">
          <div>
            <Image
              src={front.url!}
              alt={front.alternateName}
              width={WIDTH}
              height={HEIGHT}
            />

            <div class="absolute top-4 left-4">
              <div class="rounded border border-[#0068AE] h-6 w-[90px] flex items-center justify-center ">
                <span class="text-xs text-[#0068AE] font-medium">
                  Oferta Clube
                </span>
              </div>
              <div class="rounded border border-[#D53F15] h-6 w-[62px] flex items-center justify-center mt-1">
                <span class="text-xs text-[#D53F15] font-medium">34% off</span>
              </div>
            </div>
            <div class="flex flex-start w-full mt-4">
              <span>{name}</span>
            </div>
          </div>
        </div>
      </a>
      <div class="flex flex-start w-full flex-col">
        <span class="text-xs line-through text-[#333333] ">
          {formatPrice(listPrice, offers!.priceCurrency!)}
        </span>
        <span class="text-lg text-[#0068AE] font-semibold">
          {formatPrice(price, offers!.priceCurrency!)}
        </span>
        <Button class="bg-[#0068AE] hover:bg-[#6EAE46] text-white mt-4">
          Comprar
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
