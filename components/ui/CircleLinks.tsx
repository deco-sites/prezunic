import Image from "deco-sites/std/components/Image.tsx";

function CircleLinks() {
  return (
    <>
      <section class="flex items-center justify-center w-full bg-[#f4f4f4]">
        <div class="hidden md:flex items-center justify-between py-4 w-full max-w-[1270px] ">
          <a href="/congelados">
            <Image
              src="https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/e50cd523-20c5-4435-9317-8c8278c01796___853c7c9529fc0c6c0d90c92bd50be972.png"
              alt="Congelados"
              width={160}
              height={160}
              loading="lazy"
            />
          </a>
          <a href="/141?map=productClusterIds">
            <Image
              src="https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/e8de0461-c0f6-4627-b21d-d1f00e38efb6___d07ab64e49c849b5540c8822859d14da.png"
              alt="Churrasco"
              width={160}
              height={160}
              loading="lazy"
            />
          </a>
          <a href="/limpeza">
            <Image
              src="https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/7088112c-5419-4886-befe-27ad66e95955___44948cbdfcb4acd796534270a9cd9214.png"
              alt="Limpeza"
              width={160}
              height={160}
              loading="lazy"
            />
          </a>
          <a href="/343?map=productClusterIds">
            <Image
              src="https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/94ad6349-fc1b-4e81-a3e8-39293e673ab8___69328ffe28d8b2562b98d3ca6317cce1.png"
              alt="Drinks"
              width={160}
              height={160}
              loading="lazy"
            />
          </a>
          <a href="/274?map=productClusterIds">
            <Image
              src="https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/9994a0a3-fc7f-4e59-a93a-66b737b4f9c7___aff561af3d7365e261db90a2627de831.png"
              alt="Saudaveis"
              width={160}
              height={160}
              loading="lazy"
            />
          </a>
          <a href="/padaria">
            <Image
              src="https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/fd0ceeb3-e273-457a-a06d-9cf55ee52df8___52f6f2955ee778a1a36391650af38c4b.png"
              alt="Padaria"
              width={160}
              height={160}
              loading="lazy"
            />
          </a>
        </div>
      </section>
    </>
  );
}

export default CircleLinks;
