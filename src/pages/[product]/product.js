import { BasicLayout } from "@/layouts";
import {
  DetailProduct,
  FooterApp,
  Redes,
  Separator,
  MenuAlterno,
} from "@/components";
import { Footer } from "@/components";

export default function ProductPage(props) {
  const { product, inventory, relate } = props;

  return (
    <div>
      <MenuAlterno back={"IoArrowBack"} />
      <DetailProduct
        product={product}
        relate={relate}
        productInventory={inventory}
      />     
    </div>
  );
}
