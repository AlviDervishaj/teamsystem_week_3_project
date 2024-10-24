import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounceCallback } from "usehooks-ts";

export const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebounceCallback(() => {
    const value = filterRef.current?.value;
    if (!value) {
      searchParams.delete("term");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("term", value);
    setSearchParams(searchParams);
  }, 500);

  return (
    <section className="w-fit h-fit mx-auto pt-12">
      <input onChange={() => handleSearch()} ref={filterRef} className="form-input !rounded-md text-slate-800 text-lg" placeholder="Search By Name or University" type="text" name="filter_by_full_name" />
    </section>
  );
}
