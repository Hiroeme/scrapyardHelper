import './App.css';
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
    <div className="container">
      <h1 className="title">
        Maplestory Scrapyard Helper
      </h1>
      <div className="instructions">
        <p>
          Copy and paste your scrapyard weeklies to display the average time required for completing each one.
        </p>
        <p>
          Note: This is a <a href="https://github.com/Hiroeme/scrapyardHelper" className="link"><b>WIP</b></a> so it can be inaccurate!
        </p>
      </div>
      <div className="image-container">
        {image && <img src={image} alt="copy pasted image" />}
      </div>
      
      {quests && (
        <ul className="quest-list">
          {quests.map(quest => (
            <li key={quest.name} className="quest-item">
              <span className="quest-name">Name: {quest.name}</span>
              <span className="quest-time">Average Time Required: {quest.averagetime}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
