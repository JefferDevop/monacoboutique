import { CardImg } from "reactstrap";
import Image from "next/image"; //
import Link from "next/link";
import styles from "./ListCategories.module.scss";
import { BASE_NAME } from "@/config/constants";

export function ListCategories({ categories }) {
  const scale = "c_scale,f_auto/";
  const upload = "image/upload/";

  return (
    <div className={styles.content}>
      <label>CATEGORÍAS</label>
      <div className={styles.list}>
        {categories.map(({ id, slug, image, image_alterna, name }) => {
          const src = image
            ? `${BASE_NAME}${upload}${scale}${image.split(upload)[1]}`
            : image_alterna?.[0];

          return (
            <div key={id} className={styles.card}>
              <Link href={`/products/${slug}`} >
                <Image
                  alt={`Imagen de ${name}`}
                  src={src}
                  width={130}
                  height={200}
                />
                <h6>{name}</h6>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
