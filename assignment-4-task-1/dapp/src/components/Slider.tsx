import React from 'react'
import styles from '../styles/Slider.module.css'
import Image from 'next/image'
import { photos } from '../assets/images'

const Slider = () => {
  return (
    <div className={styles.sliderContainer}>
      <div className={styles.slider}>
        {photos.map((photo, index) => (
          <div key={index} className={styles.slide}>
            <Image
              src={photo.src}
              alt={photo.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Slider
