export type StickerType = {
  id: number | '';
  name: string;
  code: string;
};

export type StickerCocktail = {
  id: number | '';
  quantity: number | '';
  sticker: Partial<StickerType>;
};
