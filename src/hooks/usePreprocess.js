import cv from "@techstark/opencv-js";
import { useState, useEffect } from "react";

const usePreprocess = () => {
  
  const [image, setImage] = useState(null);
  const [procImage, setProcImage] = useState(null);

  useEffect(() => {
    if (!image) return;
    
    const processImage = () => {
      const imageElement = new Image();
      imageElement.src = image;
      
      imageElement.onload = () => {

        const src = cv.imread(imageElement);
        const scaled = new cv.Mat();
        const gray = new cv.Mat();
        const binary = new cv.Mat();

        // implement scaling when image too small too read accurately
        const scale = 2;
        let dsize = new cv.Size(src.cols * scale, src.rows * scale);
        cv.resize(src, scaled, dsize, 0, 0, cv.INTER_LINEAR)
        
        cv.cvtColor(scaled, gray, cv.COLOR_RGBA2GRAY, 0)

        // threshold = 220, might need to change again
        cv.threshold(gray, binary, 220, 255, cv.THRESH_BINARY);

        const contours = new cv.MatVector();
        const hierachy = new cv.Mat();
        cv.findContours(binary, contours, hierachy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

        let max = 0;
        let maxcontour = null;
        for (let i = 0; i < contours.size(); i++) {
          const curr = contours.get(i);
          const size = cv.contourArea(curr);
          if (size > max) {
            max = size;
            maxcontour = curr;
          }
        }

        // returns the minimal up-right bounding rectangle for the specified point set
        const boundingBox = cv.boundingRect(maxcontour);
        // region of interest, crops image region based on bounding rect
        // https://docs.opencv.org/3.4/js_basic_ops_roi.html
        const croppedImage = binary.roi(boundingBox);

        console.log(croppedImage.cols, croppedImage.rows)
        
        const canvas = document.createElement('canvas');
        cv.imshow(canvas, croppedImage);
        
        setProcImage(canvas.toDataURL());
        
        src.delete();
        gray.delete();
        binary.delete();
        hierachy.delete();
        contours.delete();
        scaled.delete()
      }
    }

    processImage();
  }, [image]);

  return [image, setImage, procImage];
}

export default usePreprocess;