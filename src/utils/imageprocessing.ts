
/**
 * Converts ImageData to Grayscale.
 * 
 * Note: 4 Channel to 1 Channel Output
 * 
 * Grayscale only stores 1 channel, because we only need to store the brightness
 * https://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
 * 
 * @param imageData The pixel data object representing a RGBA image.
 * @returns grayscaleData
 */
const convertToGrayscale = (imageData: Uint8ClampedArray): Uint8ClampedArray => {
  const grayscaleData = new Uint8ClampedArray(imageData.length / 4);

  for (let i = 0; i < imageData.length; i += 4) {
    const red = imageData[i];
    const green = imageData[i + 1];
    const blue = imageData[i + 2];

    const grayscale = 0.299 * red + 0.587 * green + 0.114 * blue;

    grayscaleData[i / 4] = grayscale;
  }

  return grayscaleData;
};


/**
 * Converts a Grayscale ImageData to Binary.
 * 
 * Note: 1 Channel Data Input and Output
 * 
 * Any pixel value lower than the threshold will be set to white (0,0,0).
 * Any pixel value greater than/equal to the threshold will be set to black (255,255,255).
 * 
 * https://en.wikipedia.org/wiki/Thresholding_(image_processing)
 * 
 * @param grayscaleData The pixel data object representing a grayscale image (all RGB values are equal)
 * @param threshold The threshold
 * @returns binaryData
 */
const convertToBinary = (grayscaleData: Uint8ClampedArray, threshold: number): Uint8ClampedArray => {
  const binaryData = new Uint8ClampedArray(grayscaleData.length);

  for (let i = 0; i < grayscaleData.length; i++) {
    // Threshold the grayscale values and store as binary (0 or 255)
    binaryData[i] = grayscaleData[i] > threshold ? 255 : 0;
  }

  return binaryData;
};


/**
 * 
 * Finds all the contours of a section of width and height in a binary image
 * 
 * Sort of like ish https://en.wikipedia.org/wiki/Moore_neighborhood
 * Note: 
 * 
 * 1. Iterates through all pixels
 * 2. For each pixel, if not visited and white, trace the contour from that position until it goes back around to the starting pixel
 *    1. Add current point to contour
 *    2. Checks for available neighbors (white and not visited before)
 *    3. If no available neighbors, return contour
 *    4. If found available neighbor,set neighbor to current point
 *    5. Repeat
 * 3. Add contour to contours if contour.length > 1
 * 3. Return contours
 * 
 * @param binaryData
 * @param width
 * @param height
 * @returns {{ x : number, y : number }[][]} List of contours
 */
const findContours = (binaryData : ImageData, width : number, height : number) : { x : number, y : number }[][] => {

  const contours: { x: number; y: number }[][] = [];
  // const visited = new Array(height * width).fill(false);
  const visited = new Set();
  const isWhite = (index : number) => binaryData[index ] === 255;
 
  // start on the right and go clockwise
  const neighbors = [
    [1,0], [1, 1], [0, 1],
    [-1, 1], [-1,0],
    [-1, -1], [0, -1], [1, -1]
  ]
  
  const trace = (start_x : number, start_y : number) : { x: number, y: number }[] => {

    const contour : {x : number, y : number}[] = [];
    let curr_x = start_x;
    let curr_y = start_y;    

    do {
      contour.push({x: curr_x, y: curr_y});
      // visited[curr_y * width + curr_x] = true;
      visited.add(curr_y * width + curr_x);

      let found = false;
      for (const neighbor of neighbors) {

        const next_x = curr_x + neighbor[0];
        const next_y = curr_y + neighbor[1];
        const next_index = (next_y * width + next_x);

        if ((next_x >= 0 && next_x < width) && (next_y >= 0 && next_y < height)) {

          // if (isWhite(next_index) && !visited[next_index]) {
          if (isWhite(next_index) && !visited.has(next_index)) {
            found = true;
            curr_x = next_x;
            curr_y = next_y;
            break;
          }
        }
      }

      if (!found) break;
      // console.log('hi dude! You got an infinite loop')
    } while (start_x !== curr_x || start_y !== curr_y)

    return contour;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // imageData is a 1d array, need to multiply by the width to move to the next 'level'
      const index = (y * width + x);

      // is white
      // have yet to see this index
      // we need to look for the contour if it exists
      // if (isWhite(index) && !visited[index]) {
      if (isWhite(index) && !visited.has(index)) {

        const contour = trace(x,y);
        if (contour.length > 1) {
          contours.push(contour);
        }
      }
    }
  }

  return contours;
}

/**
 * 
 * Finds the contour with the greatest number of points out of a list of contours
 * 
 * @param contours List of Contour Lists
 * @returns {{ x : number, y : number }[]} maxContour
 */
const getMaxContour = (contours : { x: number; y: number }[][]) : { x : number, y : number }[] => {
  if (contours.length <= 0) return [];
  
  let max = contours[0].length;
  let maxContour = contours[0];

  for (const contour of contours) {
    if (max < contour.length) {
      max = contour.length;
      maxContour = contour;
    }
  }
  return maxContour;
}

/**
 * 
 * Finds the smallest bounding box that can contain all the points of the contour
 * 
 * @param contour 
 * 
 * @returns {min_x: number, min_y: number, max_x: number, max_Y: number} boundingRect
 */
const getBoundingRect = (contour : { x: number; y: number }[]) : {min_x: number, min_y: number, max_x: number, max_Y: number}=> {
  if (contour.length <= 0) return {min_x: 0, min_y: 0, max_x: 0, max_Y: 0};

  let min_x = Infinity, min_y = Infinity, max_x = -Infinity, max_Y = -Infinity;

  for (const point of contour) {
    if (point.x < min_x) min_x = point.x;
    if (point.y < min_y) min_y = point.y;
    if (point.x > max_x) max_x = point.x;
    if (point.y > max_Y) max_Y = point.y;
  }

  return { min_x, min_y, max_x, max_Y }
}

/**
 * 
 * Crops by a boundingBox then scales an image
 * 
 * @param canvas 
 * @param boundingBox 
 * @param scale 
 * @returns url of cropped image
 */
const cropImageByBox = (canvas: HTMLCanvasElement, boundingBox : {min_x: number, min_y: number, max_x: number, max_Y: number},  scale : number) => {

  const croppedCanvas = document.createElement('canvas');
  const croppedCtx = croppedCanvas.getContext('2d');

  if (!croppedCtx) return "";

  croppedCanvas.width = (boundingBox.max_x - boundingBox.min_x) * scale;
  croppedCanvas.height = (boundingBox.max_Y - boundingBox.min_y) * scale;

  // crop source dimensions
  const cropwidth = boundingBox.max_x - boundingBox.min_x;
  const cropheight = boundingBox.max_Y - boundingBox.min_y
  
  //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  // scales automatically if source sizes don't line up with destination sizes
  croppedCtx.drawImage(
    canvas,
    boundingBox.min_x,
    boundingBox.min_y,
    cropwidth,
    cropheight,
    0,
    0,
    croppedCanvas.width,
    croppedCanvas.height
  );

  return croppedCanvas.toDataURL();
}

export {convertToGrayscale, convertToBinary, findContours, getMaxContour, getBoundingRect, cropImageByBox};