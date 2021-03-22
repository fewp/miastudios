import NextImage from "next/image";
import React, { useState } from "react";
import styles from "../../public/css/components/SliderBackground.module.css";

interface SliderBackground {
  images: string[];
}

export const SliderBackground: React.FC<SliderBackground> = ({
  images,
  children,
}) => {
  const [index, setIndex] = useState(0);
  const slideRight = () => {
    setIndex((index + 1) % images.length); // increases index by 1
  };

  const slideLeft = () => {
    const nextIndex = index - 1;
    if (nextIndex < 0) {
      setIndex(images.length - 1); // returns last index of images array if index is less than 0
    } else {
      setIndex(nextIndex);
    }
  };
  return (
    <>
      {images.length > 0 && (
        <div className={styles.sliderContainer}>
          <button className={styles.sliderButton} onClick={slideLeft}>
            {"<"}
          </button>
          <button className={styles.sliderButton} onClick={slideRight}>
            {">"}
          </button>
          <div className={styles.sliderContent}>{children}</div>

          <div className={styles.sliderOverlay}></div>
          <NextImage
            width={100}
            height={100}
            layout="responsive"
            objectPosition="center top"
            objectFit="cover"
            src={`/assets/img/uploads/builds/${images[index]}`}
            alt={`Image ${images[index]}`}
          />
        </div>
      )}
    </>
  );
};
