export const nextPage = (currentPage: number, totalPages: number, pokemonsPerPage: number) => {
  let newPage = currentPage + 1;
  const startSlice = currentPage * pokemonsPerPage;
  const endSlice = (newPage * pokemonsPerPage);

  if (currentPage === totalPages - 1) {
    console.log('se deberia llamar de nuevo al endpoint para que cargue mas pokemones')
  }

  return {
    newPage,
    startSlice,
    endSlice,
  }
};

export const prevPage = (currentPage: number, pokemonsPerPage: number) => {
  let newPage = currentPage - 1;
  let startSlice = (newPage * pokemonsPerPage) - pokemonsPerPage;
  let endSlice = startSlice + pokemonsPerPage;

  if (currentPage <= 1) {
    newPage = 0;
    startSlice = 0;
    endSlice = pokemonsPerPage;
  }

  return {
    newPage,
    startSlice,
    endSlice,
  }
};