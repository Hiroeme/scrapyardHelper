import { useState, useEffect } from "react"
import Fuse from 'fuse.js'
import data from '../data.json'
import usePreprocess from "./hooks/usePreprocess";
import useTextExtract from "./hooks/useTextExtract";

function App() {

  const [seenQuests, setSeenQuests] = useState([])

  const [image, setImage, procImage] = usePreprocess();
  const text = useTextExtract(procImage)
  
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
        setImage(data)
      } catch(e) {
        console.log(e)
      }
    }

    const handlePaste = () => pasteImg();
    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [setImage])

  return (
    <div>
      <h1>
        Maplestory Scrapyard Helper
      </h1>
      <p>Copy and paste</p>
      <div>
        {image && <img style={{maxHeight: '500px', maxWidth: '500px'}} src={image} alt="copy pasted image" />}
      </div>
      <div>
        {procImage && <img style={{maxHeight: '500px', maxWidth: '500px'}} src={procImage} alt="processed image" />}
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
