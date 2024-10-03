import { useState, useEffect } from "react";
import { createWorker } from 'tesseract.js';

const useTextExtract = (image) => {
  
  const [readText, setReadText] = useState('')

  useEffect(() => {
    if (!image) return;

    const extractTextFromImage = async () => {
      const worker = await createWorker('eng');

      const {data: {text : imageText}} = await worker.recognize(image)

      setReadText(imageText)

      await worker.terminate()
    };

    extractTextFromImage();

    return () => {
      setReadText('')
    }
  }, [image]);


  return readText
};

export default useTextExtract;