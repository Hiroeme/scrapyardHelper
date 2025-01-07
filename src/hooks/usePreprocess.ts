import { useState, useEffect } from "react";
import { convertToGrayscale, convertToBinary, findContours, getBoundingRect, getMaxContour, cropImageByBox } from "../utils/imageprocessing";

type UsePreProcessHook = [string, React.Dispatch<React.SetStateAction<string>>, string];

const usePreprocess = () : UsePreProcessHook => {
  const [image, setImage] = useState('');
  const [procImage, setProcImage] = useState('');

  useEffect(() => {
    if (!image) return;

    const processImage = () => {
      const imageElement = new Image();
      imageElement.src = image;

      imageElement.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imageElement.width;
        canvas.height = imageElement.height;

        if (!ctx) return;
        ctx.drawImage(imageElement, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // const { data, width, height } = imageData;

        // 1 channel
        const grayscaleData = convertToGrayscale(imageData.data);
        // 1 channel
        const binaryData = convertToBinary(grayscaleData, 220);

        // binaryData to 4 channel to put on canvas
        for (let i = 0; i < binaryData.length; i++) {
          const value = binaryData[i];
          imageData.data[i * 4] = value;
          imageData.data[i * 4 + 1] = value;
          imageData.data[i * 4 + 2] = value;
          imageData.data[i * 4 + 3] = 255;
        }

        ctx.putImageData(imageData, 0, 0)
        // const contours = findContours(binaryData, canvas.width, canvas.height);
        const contours = findContours(binaryData, canvas.width, canvas.height);
        const maxContour = getMaxContour(contours);
        const boundingBox = getBoundingRect(maxContour);

        const url = cropImageByBox(canvas, boundingBox, 2);

        setProcImage(url);
      };
    };

    processImage();
  }, [image]);

  return [image, setImage, procImage];
};

export default usePreprocess;
