import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Category from "./Category.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Search from "./Search.tsx";

function Navbar({ items, searchbar }: {
  items: INavItem[];
  searchbar: SearchbarProps;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <Buttons variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <Buttons variant="search" />
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden  md:flex justify-center items-center border-b border-base-200 w-full pl-3 pr-3  bg-[#a4e84b] ">
        <div class="w-full max-w-[1270px] md:flex flex-row justify-between items-center h-[72px]">
          <div>
            <Category />
          </div>
          <div class="flex-none">
            <a
              href="/"
              aria-label="Store logo"
              class="block w-[62px]"
            >
              <Image
                src={"https://prezunic.vtexassets.com/assets/vtex/assets-builder/prezunic.prezunic-store/1.0.6/logo-prezunic___cddf762e9bb79e2e52164812f61a30c5.svg"}
                alt={"Logo Prezunic"}
                width={62}
                height={62}
                loading="lazy"
              />
            </a>
          </div>
          <div class="w-full max-w-[520px] flex">
            <Search />
          </div>
          <div class="flex items-center gap-5">
            <a
              class="flex items-center gap-1"
              href="/ultimos-comprados"
              aria-label="Ultimos comprados"
            >
              <Image
                src="https://prezunic.vtexassets.com/assets/vtex/assets-builder/prezunic.prezunic-store/1.0.6/icons/icon_favorito___3c1eed476e2b7c331b6b6d9b973e0b5a.svg"
                alt={"Produtos comprados"}
                width={22}
                height={22}
                loading="lazy"
              />
              Produtos comprados
            </a>
            <a
              class="flex items-center gap-1"
              href="/"
              aria-label="Pedidos"
            >
              <Icon size={20} id="Pedidos" strokeWidth={1} />
              Pedidos
            </a>
            <a
              class="flex items-center gap-1"
              href="/"
              aria-label="Minha conta"
            >
              <Icon size={20} id="User" strokeWidth={1} />
              Minha conta
            </a>
            <Buttons variant="cart" /> R$ 0,00
          </div>
        </div>
      </div>
      <div class="hidden  md:flex justify-center items-center w-full bg-white ">
        <div class="flex-auto flex justify-center h-10">
          {items.map((item) => <NavItem item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Navbar;
