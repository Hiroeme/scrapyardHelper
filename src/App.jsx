import { useEffect } from "react"
import usePreprocess from "./hooks/usePreprocess";
import useTextExtract from "./hooks/useTextExtract";
import useTextClean from "./hooks/useTextClean";

function App() {

  const [image, setImage, procImage] = usePreprocess();
  const extractedText = useTextExtract(procImage)
  const quests = useTextClean(extractedText)
  
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
      {quests && quests.map(quest => (
        <li key={quest.name}> Name: {quest.name} Average Time Required: {quest.averagetime}</li>
      ))}
      </ul>

      
    </div>
  )
}

export default App
