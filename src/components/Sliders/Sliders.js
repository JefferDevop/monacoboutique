import { useMemo } from "react";
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import { BASE_NAME } from '@/config/constants';
import styles from './Sliders.module.scss';
import { CardImg } from "reactstrap";

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
                <CardImg
                  alt={`Slide ${index}`}
                  src={`${BASE_NAME}${item.image}`}                                               
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