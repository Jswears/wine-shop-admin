export interface WinesProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
  vintage: string;
  winery: string;
  country: string;
  region: string;
  grape: string;
  category: string;
  stock: number;
}

export interface ChildWinesProps {
  wines: WinesProps[];
}

export interface WineMap {
  [key: string]: WinesProps;
}
