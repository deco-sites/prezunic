import Image from "deco-sites/std/components/Image.tsx";

export interface NavLink {
  label: string;
  href: string;
}

export interface Props {
  navLinks: NavLink[];
}

function NavbarHighlight({
  navLinks,
}: Props) {
  console.log(navLinks);
  return (
    <>
      <div class="h-11 bg-[#333333] flex  items-center justify-center">
        <div class="flex items-center justify-start w-full max-w-[1262px] ">
          <div class="pr-8 border-r border-white flex items-center gap-2">
            <Image
              src="https://prezunic.vtexassets.com/_v/public/assets/v1/published/prezunic.store-selector@1.9.14/public/react/02c9e56de65e01ac7f61b79a0c03ebe7.png"
              alt="Localização"
              width={16}
              height={20}
              loading="lazy"
            />
            <span class="text-xs text-white">Onde você está?</span>
          </div>
          <div class="pl-8">
            <ul class="flex gap-1 ">
              {navLinks.map((navLink) => {
                return (
                  <li class="mx-4">
                    <a href={navLink.href}>
                      <span class="text-xs text-white">{navLink.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarHighlight;
