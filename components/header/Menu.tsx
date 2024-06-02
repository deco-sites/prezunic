import { useDevice } from "deco/hooks/useDevice.ts";
import Icon from "../../components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import CategoryIcon from "../ui/CategoryIcon.tsx";

export interface Props {
  navItems: SiteNavigationElement[];
}

function MenuItem({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="collapse collapse-plus">
      <input type="checkbox" />
      <div class="collapse-title flex items-center gap-2">
        <CategoryIcon
          id={"nav-" +
            (item.name || "").toLowerCase().split(" ").join("-").replaceAll(
              "-e-",
              "-",
            ).replaceAll(",", "-")}
          size={16}
        />
        {item.name}
      </div>
      <div class="collapse-content">
        <ul>
          <li>
            <a class="underline text-sm" href={item.url}>Ver todos</a>
          </li>
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MenuItemDesktop({ item }: { item: SiteNavigationElement }) {
  return (
    <div class="group">
      <a
        href={item.url}
        class="flex justify-between items-center max-w-[295px] pl-4 pr-2 py-1 text-sm font-bold group-hover:bg-primary group-hover:text-white"
      >
        {item.name}
        <Icon id="ChevronRight" size={24} strokeWidth={2} />
      </a>
      <div class="hidden group-hover:grid grid-cols-5 gap-8 absolute left-[295px] w-[calc(100%-295px)] h-full top-0">
        {item.children?.map((node) => {
          return (
            <div class="flex flex-col gap-1 border-r-[1px] border-opacity-20">
              <a
                href={node.url}
                class="pl-2 text-sm text-primary font-semibold"
              >
                {node.name}
              </a>
              {node.children?.map((child) => {
                return (
                  <a
                    class="pl-2 text-sm hover:text-primary hover:font-bold"
                    href={child.url}
                  >
                    {child.name}
                  </a>
                );
              })}
              <a class="text-sm" href={node.url}>
                + Ver mais
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Menu({ navItems }: Props) {
  const device = useDevice();

  if (device === "desktop") {
    return (
      <div class="w-full absolute flex flex-col gap-2 justify-between max-h-[695px] overflow-y-auto bg-white">
        {navItems.map((item) => <MenuItemDesktop item={item} />)}
      </div>
    );
  }

  return (
    <div class="flex flex-col h-full overflow-y-auto w-full opacity-50">
      <ul class="px-4 flex-grow flex flex-col divide-y divide-base-200 overflow-y-auto h-full w-[85vw]">
        {navItems.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
