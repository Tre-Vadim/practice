'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({ label, name }) {
  const inputRef = useRef();
  const [image, setImage] = useState();

  const handlePickClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return <div className={classes.picker}>
    <label htmlFor={name}>{label}</label>
    <div className={classes.controls}>
      <div className={classes.preview}>
        {!image && <p>No image picked yet.</p>}
        {image && <Image src={image} alt="The image selected by user" fill />}
      </div>
      <input
        className={classes.input}
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        ref={inputRef}
        onChange={handleImageChange}
        required
      />
      <button className={classes.button} type="button" onClick={handlePickClick}>Pick an image</button>
    </div>
  </div>
}
