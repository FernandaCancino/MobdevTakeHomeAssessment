import { useEffect, useState } from "react";

interface IPaginator {
  isLoading: boolean;
  prev: () => {
    payload: any;
    type: "pokemon/getPokemonsPerPage";
  };
  next: () => {
    payload: any;
    type: "pokemon/getPokemonsPerPage";
  };
  page: number;
  totalPages: number;
}
export const Paginator = ({ isLoading, prev, next, page, totalPages }: IPaginator) => {

  const [isDisabledPrev, setIsDisabledPrev] = useState(true);
  const [isDisabledNext, setIsDisabledNext] = useState(true);

  useEffect(() => {
    
    if (page === 1) {
      setIsDisabledPrev(true);
    }else{
      setIsDisabledPrev(false);
    }
    if (page === totalPages) {
      setIsDisabledNext(true);
    }else{
      setIsDisabledNext(false);
    }
  }, [totalPages, page])


  return (
    <div className="inline-flex bg-gray-100 text-gray-600 rounded">
      <button
        className=" hover:bg-gray-300  font-bold py-2 px-4 rounded-l disabled:hover:bg-gray-100"
        disabled={isLoading || isDisabledPrev}
        onClick={() => prev()}
      >
        Prev
      </button>
      <div className="font-bold py-2 px-4">
        {page}
      </div>
      <button
        className=" hover:bg-gray-300 font-bold py-2 px-4 rounded-r disabled:hover:bg-gray-100"
        disabled={isLoading || isDisabledNext}
        onClick={() => next()}
      >
        Next
      </button>
    </div>
  );
}
