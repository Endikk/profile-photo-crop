import React, { useState, useCallback, useRef, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import * as faceapi from 'face-api.js';

const FaceCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/model');
    };
    loadModels();
  }, []);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc) return;
      const image = new window.Image();
      image.src = imageSrc;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      // Détection du visage avec l'IA
      const detection = await faceapi.detectSingleFace(
        image,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detection) {
        let { x, y, width, height } = detection.box;
        // Ajouter une marge de 70% autour du visage
        const marginRatio = 0.70;
        const imgWidth = image.width;
        const imgHeight = image.height;
        const marginX = width * marginRatio;
        const marginY = height * marginRatio;
        let newX = Math.max(0, x - marginX);
        let newY = Math.max(0, y - marginY);
        let newWidth = Math.min(imgWidth - newX, width + 2 * marginX);
        let newHeight = Math.min(imgHeight - newY, height + 2 * marginY);
        // Recadrer autour du visage détecté + marge
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          image,
          newX,
          newY,
          newWidth,
          newHeight,
          0,
          0,
          newWidth,
          newHeight
        );
        const cropped = canvas.toDataURL('image/jpeg');
        setCroppedImage(cropped);
      } else {
        // Si pas de visage détecté, rien n'est affiché
        setCroppedImage(null);
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc]);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', async () => {
        const img = new Image();
        img.src = reader.result;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const detection = await faceapi.detectSingleFace(
          img,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detection) {
          const { x, y, width, height } = detection.box;
          const centerX = x + width / 2;
          const centerY = y + height / 2;

          setCrop({
            x: (centerX / img.width) * 100 - 50,
            y: (centerY / img.height) * 100 - 50,
          });
        }

        setImageSrc(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={inputRef}
      />
      {imageSrc && (
        <>
          <div style={{ position: 'relative', width: '100%', height: 400 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button onClick={showCroppedImage}>Afficher l'image recadrée</button>
          {/* Affichage de l'image croppée uniquement après clic sur le bouton */}
          {croppedImage && (
            <div style={{ marginTop: 20, textAlign: 'center' }}>
              <img src={croppedImage} alt="Cropped" style={{ maxWidth: 300, borderRadius: '8px', boxShadow: '0 2px 8px #0002' }} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FaceCropper;
