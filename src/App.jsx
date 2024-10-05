import usePreprocess from "./hooks/usePreprocess";
import useTextExtract from "./hooks/useTextExtract";
import useTextClean from "./hooks/useTextClean";
import useClipboard from "./hooks/useClipboard";

function App() {

  const [image, setImage, procImage] = usePreprocess();
  const extractedText = useTextExtract(procImage)
  const quests = useTextClean(extractedText)
  useClipboard(setImage)
  
  return (
    <div>
      <h1>
        Maplestory Scrapyard Helper
      </h1>
      <div>
        <p>
          Copy and paste your scrapyard weeklies to display the average time required for completing each one.
        </p>
        <p>
          Note: This is a <a href="https://github.com/Hiroeme/scrapyardHelper"><b>WIP</b></a> so it can be inaccurate!
        </p>
      </div >
      <div>
        {image && <img style={{maxHeight: '500px', maxWidth: '500px'}} src={image} alt="copy pasted image" />}
      </div>
      <div>
        {/* {procImage && <img style={{maxHeight: '500px', maxWidth: '500px'}} src={procImage} alt="processed image" />} */}
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
