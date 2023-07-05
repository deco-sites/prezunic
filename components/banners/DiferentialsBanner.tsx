import Image from "deco-sites/std/components/Image.tsx";

function DiferentialsBanner() {
  return (
    <>
      <div class="w-full items-center justify-center hidden md:flex bg-[#F4F4F4] pt-8  pb-8">
        <div class="flex flex-wrap items-center justify-between  w-full max-w-[1270px] p-4  shadow-[0_3px_6px_rgba(0,0,0,0.2)] bg-[#f5f5f5] rounded">
          <div class="flex items-center gap-2 w-72">
            <Image
              src={"https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/a73e3c4e-e1a4-4eaf-8ecd-ed23a55f4e97___e6eb8a172932e463dc0003fbd3963983.png"}
              alt={"Caminhão"}
              height={72}
              width={72}
              loading="lazy"
            />
            <p>
              Programe o dia e hora de entrega. Também aos DOMINGOS
            </p>
          </div>
          <div class="flex items-center gap-2  w-72">
            <Image
              src={"https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/b3ba5051-8577-4cff-ad9b-e0615fea91c0___48748c01769a05d5e2a40bb248bb9ac6.png"}
              alt={"Localização"}
              height={72}
              width={72}
              loading="lazy"
            />
            <p>
              Pague suas compras online ou no ato da entrega
            </p>
          </div>
          <div class="flex items-center gap-2  w-72">
            <Image
              src={"https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/e13a8200-9551-4662-bb62-7883842650fa___7bd082c34a8492aa98d6836e60885406.png"}
              alt={"Cartões"}
              height={72}
              width={72}
              loading="lazy"
            />
            <p>
              Pagamento com cartão de crédito, débito, ticket alimentação ou PIX
            </p>
          </div>
          <div class="flex items-center gap-2 w-72">
            <Image
              src={"https://prezunic.vtexassets.com/assets/vtex.file-manager-graphql/images/6d79f90b-66bb-4d55-afa5-8ba371690f76___fcf8af3d2a977d52fd8c3216bb884aba.png"}
              alt={"Selo seguro"}
              height={72}
              width={72}
              loading="lazy"
            />
            <p>
              Compra 100% segura
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default DiferentialsBanner;
