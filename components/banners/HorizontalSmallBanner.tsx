import Image from "deco-sites/std/components/Image.tsx";

export interface Props {
  alt: string;
  src: string;
}

function HorizontalSmallBanner({ alt, src }: Props) {
  return (
    <>
      <div class="w-full items-center justify-center hidden md:flex bg-[#F4F4F4] ">
        <div class=" flex w-full max-w-[1270px] pt-8 mt-[70px] pb-8 h-15 items-center justify-center">
          <Image
            src={src}
            alt={alt}
            height={60}
            width={1270}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}

export default HorizontalSmallBanner;
