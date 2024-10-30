import Link from "next/link";
import { BASE_NAME } from "@/config/constants";
import { CardImg } from "reactstrap";
import styles from "./Available.module.scss";

export function Available({ products = [] }) {
// Reducimos los productos a uno único por item_id y sumamos cantidades
  const uniqueProducts = products.reduce((acc, product) => {
    const existingProduct = acc.find((p) => p.item_id === product.item_id);
    const qtyAvailable = Number(product.qty_available) || 0;

    if (existingProduct) {
      existingProduct.qty_available += qtyAvailable;
      if (product.discount <= 0) existingProduct.offer = false;
    } else {
      acc.push({ 
        ...product, 
        qty_available: qtyAvailable, 
       
      });
    }

    return acc;
  }, []);

  const formatCurrency = (number) =>
    new Intl.NumberFormat('es-CO').format(Math.round(number));



  return (
    <div className={styles.list__product}>

      {uniqueProducts.map((product, index) => (
        <div key={index}>
          {product.qty_available > 0 ? (
            <ProductCard product={product} formatCurrency={formatCurrency} />
          ) : (
            <SoldOutCard product={product} />
          )}
        </div>
      ))}
    </div>
  );
}

// Componente para productos disponibles
const ProductCard = ({ product, formatCurrency }) => (
  <div className={styles.image}>
    {product.product.price_old > product.product.price1 && (
      <div className={styles.offer}>
        <h5>¡OFERTA!</h5>
      </div>
    )}
    <Link href={`/${product.slug}`}>
      <CardImg
        alt="Card image cap"
        src={BASE_NAME + (product.images || product.image_alterna)}
      />
    </Link>
    <h5>{product.product.name_extend}</h5>
    <h5> $ {formatCurrency(product.product.price1)}</h5>
    {product.product.price_old > 0 && (
      <h6> $ {formatCurrency(product.product.price_old)}</h6>
    )}
  </div>
);

// Componente para productos agotados
const SoldOutCard = ({ product }) => (
  <div className={styles.soldout}>
    <div className={styles.offer}>
      <h5>AGOTADO</h5>
    </div>
    <CardImg
      alt="Card image cap"
      src={BASE_NAME + (product.images || product.image_alterna)}
    />
    <h5>{product.product.name_extend}</h5>
  </div>
);
