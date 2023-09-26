import { Product } from "./product.interface";
import { Sell } from "./sell.interface";

export interface ModalProps {
    show: boolean;
    handleShow: () => void;
  }

  export interface ModalDataProps extends ModalProps {
    data: Product;
  }

  export interface ModalSellProps extends ModalProps {
    data: Sell;
  }

  export interface LoadProp {
    load: boolean;
  }