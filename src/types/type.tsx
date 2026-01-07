export type CardsState = {
  available: Product[];
  selected: Product[];
  favorites: Product[];
};
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
};
export type ProductCardProps = {
  product: Product;
};
export type ColumnProps = {
  id: ColumnType;
  title: string;
  items: Product[];
};
export type ColumnType = "available" | "selected" | "favorites";
