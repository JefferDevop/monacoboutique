import Link from "next/link";
import Image from "next/image";
import { BASE_NAME } from "@/config/constants";
import styles from "./Available.module.scss";

export function Available({ products = [] }) {
  const uniqueProducts = products.reduce((acc, product) => {
    const qtyAvailable = Number(product.qty_available) || 0;
    const existingProduct = acc[product.item_id];

    if (existingProduct) {
      existingProduct.qty_available += qtyAvailable;
      if (product.discount <= 0) existingProduct.offer = false;
    } else {
      acc[product.item_id] = { 
        ...product, 
        qty_available: qtyAvailable 
      };
    }

    return acc;
  }, {});

  const formatCurrency = (number) => 
    new Intl.NumberFormat('es-CO').format(Math.round(number));

  return (
    <div className={styles.list__product}>
      {Object.values(uniqueProducts).map((product, index) => (
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
const ProductCard = ({ product, formatCurrency }) => {
  const { name_extend, price1, price_old } = product.product;

  return (
    <div className={styles.image}>
      {price_old > price1 && <div className={styles.offer}><h5>¡OFERTA!</h5></div>}
      <Link href={`/${product.slug}`}>
        <Image
          alt={name_extend}
          src={BASE_NAME + (product.images || product.image_alterna)}
          width={130} // ajustar según necesidades
          height={180} // ajustar según necesidades
          quality={75} // optimización
         
        />
      </Link>
      <h5>{name_extend}</h5>
      <h5> $ {formatCurrency(price1)}</h5>
      {price_old > 0 && <h6> $ {formatCurrency(price_old)}</h6>}
    </div>
  );
};

// Componente para productos agotados
const SoldOutCard = ({ product }) => (
  <div className={styles.soldout}>
    <div className={styles.offer}><h5>AGOTADO</h5></div>
    <Image
      alt={product.product.name_extend}
      src={BASE_NAME + (product.images || product.image_alterna)}
      width={500}
      height={500}
      quality={75}
    
    />
    <h5>{product.product.name_extend}</h5>
  </div>
);