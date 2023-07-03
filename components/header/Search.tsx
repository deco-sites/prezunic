import Icon from "$store/components/ui/Icon.tsx";

function Search() {
  return (
    <>
      <div class="w-full h-10 relative">
        <input
          id="search-input"
          placeholder={"O que você está procurando?"}
          class="w-full h-full p-4 rounded outline-none"
        />
        <div class="absolute right-2 top-[10px] ">
          <Icon
            id="MagnifyingGlass"
            size={25}
            strokeWidth={0.01}
            fill="#0068AE"
          />
        </div>
      </div>
    </>
  );
}

export default Search;
