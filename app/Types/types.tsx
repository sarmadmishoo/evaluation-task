export interface ItemProps {
    id: number;
    name: string;
    price: number;
    img: string;
    colour: string;
  }
  
  export interface itemItem extends ItemProps {
    qty: number;
  }
  
  export interface Props {
    increaseItem: (itemId: number) => void;
    decreaseItem: (itemId: number) => void;
    clearItem: (itemId: number) => void;
    quantity: (itemId: number) => number | undefined;
  }