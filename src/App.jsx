import { useState, useEffect } from "react"
import cv from "@techstark/opencv-js";
import Fuse from 'fuse.js'
import { createWorker } from 'tesseract.js';
import data from '../data.json'

function App() {

  const [img, setImg] = useState('')
  const [text, setText] = useState('')
  const [procImg, setProcImg] = useState('')
  const [seenQuests, setSeenQuests] = useState([])

  useEffect(() => {
    if (!img) return;

    const processImg = () => {
      const imageElement = new Image()
      imageElement.src = img
      
      imageElement.onload = () => {

        const src = cv.imread(imageElement)
        const gray = new cv.Mat()
        const binary = new cv.Mat()
        
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0)

        // 210 threshold for now
        cv.threshold(gray, binary, 200, 255, cv.THRESH_BINARY)
        
        const contours = new cv.MatVector()
        const hierarchy = new cv.Mat()
        cv.findContours(binary, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE)
        
        let max = 0
        let maxcontour = null
        for (let i = 0; i < contours.size(); i++) {
          const size = cv.contourArea(contours.get(i))
          if (size > max) {
            max = size
            maxcontour = contours.get(i)
          }
        }
        //console.log(maxcontour, max)

        // returns the minimal up-right bounding rectangle for the specified point set
        const box = cv.boundingRect(maxcontour)
        // region of interest, crops image region based on bounding rect
        // https://docs.opencv.org/3.4/js_basic_ops_roi.html
        const crop = binary.roi(box)
        
        const canvas = document.createElement('canvas')
        cv.imshow(canvas, crop)
        
        setProcImg(canvas.toDataURL())
        
        src.delete()
        gray.delete()
        binary.delete()
        hierarchy.delete()
        contours.delete()
      }
    };

    processImg()
  }, [img])

  useEffect(() => {
    if (!procImg) return;
    const extractTextFromImage = async () => {
  
      const worker = await createWorker('eng');
  
      const { data: { text : imageText } } = await worker.recognize(procImg);
      // console.log(imageText);
      setText(imageText)
  
      await worker.terminate()
    };
  
    extractTextFromImage()
  }, [procImg])

  useEffect(() => {
    if (!text) return;

    // could remove 
    // console.log(text.replace(/(\W\r\n|\n|\r)/gm, " "))
    // const result = data.quests
    //   .filter(quest => text.replace(/(\W\r\n|\n|\r)/gm, " ").toLowerCase().includes(quest.name.toLowerCase()))
    
    // console.log(text)

    const questPattern = /\[Weekly Quest\][\s\S]*?(?=\[Weekly Quest\]|$)/g;
    const extractedQuests = text.match(questPattern) || [];
    const parsedQuests = extractedQuests.map(name => name.replace("[Weekly Quest] ", ""))

    const options = {
      includeScore: true,
      shouldSort: true,
      ignoreLocation: true,
      threshold: 0.6,
      keys: ['name']
    }

    const fuse = new Fuse(data.quests, options)
    
    console.log(parsedQuests)

    const result = parsedQuests.map(extractedQuest => {
      const result = fuse.search(extractedQuest)
      // console.log(result)
      if (result.length > 0) {
        const bestMatch = result[0].item
        console.log(`Extracted Quest: "${extractedQuest}"\nBest Match: "${bestMatch.name}"\nScore: ${result[0].score}\n`)
        return bestMatch
      }
    })

    
    
    // const result = fuseresult.filter(quest => allnames.includes(quest.item))

    // console.log(fuseresult)
    
    setSeenQuests(result)
    // console.log(result)

  }, [text])
  
  useEffect(() => {

    const pasteImg = async () => {
      try {
        const clipboardItems = await navigator.clipboard.read()
        const blobOutput = await clipboardItems[0].getType('image/png')
        const data = URL.createObjectURL(blobOutput)
        setImg(data)
      } catch(e) {
        console.log(e)
      }
    }

    const handlePaste = () => pasteImg();
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [])

  return (
    <div>
      <h1>
        Maplestory Scrapyard Helper
      </h1>
      <p>Copy and paste</p>
      <div>
        {img && <img style={{maxHeight: '500px', maxWidth: '500px'}} src={img} alt="copy pasted image" />}
      </div>
      <div>
        {procImg && <img style={{maxHeight: '500px', maxWidth: '500px'}} src={procImg} alt="processed image" />}
      </div>

      <ul>
      {text && seenQuests.map(quest => (
        <li key={quest.name}> Name: {quest.name} Average Time Required: {quest.averagetime}</li>
      ))}
      </ul>

      
    </div>
  )
}

export default App
