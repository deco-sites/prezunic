import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import { SendEventOnLoad } from "$store/sdk/analytics.tsx";
import { useId } from "preact/hooks";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  products: LoaderReturnType<Product[] | null>;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div class="flex items-center justify-center w-full bg-[#f4f4f4] ">
      <div class="flex items-center justify-center w-full max-w-[1270px] ">
        <div class="w-full pl-4  py-8 flex flex-col gap-12 lg:gap-16 lg:py-10 ">
          <Header
            title={title || ""}
            description={description || ""}
            fontSize={layout?.headerfontSize || "Large"}
            alignment={layout?.headerAlignment || "center"}
          />

          <div
            id={id}
            class=" grid grid-cols-[48px_1fr_48px] px-0 sm:px-5 h-[370px]"
          >
            <Slider class="carousel carousel-center sm:carousel-end gap-6 col-span-full row-start-2 row-end-5">
              {products?.map((product, index) => (
                <Slider.Item
                  index={index}
                  class="carousel-item w-[230px]  first:pl-6 sm:first:pl-0 last:pr-6 sm:last:pr-0"
                >
                  <ProductCard
                    product={product}
                    itemListName={title}
                    layout={cardLayout}
                  />
                </Slider.Item>
              ))}
            </Slider>

            <>
              <div class="hidden relative sm:block z-10 col-start-1 row-start-3">
                <Slider.PrevButton class="btn btn-circle btn-outline absolute right-1/2 top-[-16px] bg-base-100">
                  <Icon size={20} id="ChevronLeft" strokeWidth={3} />
                </Slider.PrevButton>
              </div>
              <div class="hidden relative sm:block z-10 col-start-3 row-start-3">
                <Slider.NextButton class="btn btn-circle btn-outline absolute left-1/2  top-[-16px] bg-base-100">
                  <Icon size={20} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
            <SliderJS rootId={id} />
            <SendEventOnLoad
              event={{
                name: "view_item_list",
                params: {
                  item_list_name: title,
                  items: products.map((product) =>
                    mapProductToAnalyticsItem({
                      product,
                      ...(useOffer(product.offers)),
                    })
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShelf;
