import { useMemo } from "react";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { BASE_NAME } from '@/config/constants';
import styles from './Sliders.module.scss';

export function Sliders({ gallery }) {
  return (
    <div className={styles.content}>
      <Carousel
        infiniteLoop
        dynamicHeight
        showStatus={false}
        showThumbs={false}
        autoPlay
        swipeable={false}
        useKeyboardArrows={false}
        showArrows={false}
      >

        {gallery?.length > 0 ? (
          gallery.map((item, index) => (
            <div className={styles.carousel_vim}key={item.id || index}>            
                <Image
                  alt={`Slide ${index}`}
                  src={`${BASE_NAME}${item.image}`}
                  style={{ objectFit: "cover", width: "auto", height: "auto" }}
                  width={150} // Establece un ancho apropiado
                  height={80} // Establece una altura apropiada                  
                  priority={index === 0} // Prioriza la primera imagen
                />               
            </div>
          ))
        ) : (
          <p>Cargando...</p>
        )}
      </Carousel>
    </div>
  );
}