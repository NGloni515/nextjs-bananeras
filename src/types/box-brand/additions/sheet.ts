export type SheetType = {
  id: number | '';
  name: string;
  code: string;
};

export type SheetCocktail = {
  id: number | '';
  quantity: number | '';
  sheet: Partial<SheetType>;
};
