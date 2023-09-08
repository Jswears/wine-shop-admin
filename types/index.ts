export interface WinesProps {
  _id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
  vintage: number;
  winery: string;
  country: string;
}

export interface oneWineProps {
  oneWine: {
    _id: string;
    name: string;
    price: number;
    image: string;
    desc: string;
    vintage: number;
    winery: string;
    country: string;
  };
}

export interface WineMap {
  [key: string]: WinesProps;
}
