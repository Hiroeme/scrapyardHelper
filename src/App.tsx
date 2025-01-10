// import { useState, useEffect } from 'react';
import './App.css';
import usePreprocess from "./hooks/usePreprocess";
import useTextExtract from "./hooks/useTextExtract";
import useTextClean from "./hooks/useTextClean";
import useClipboard from "./hooks/useClipboard";
import rerollCalc from './utils/rerollcalc';
import Instructions from './components/Instructions';
import QuestList from './components/QuestList';


function App() {

  const [image, setImage, procImage] = usePreprocess();
  const extractedText = useTextExtract(procImage)
  const quests = useTextClean(extractedText)
  const rerolls = rerollCalc(quests)
  useClipboard(setImage)
  
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          GMS Maplestory Scrapyard Helper
        </h1>
      </div>
      <Instructions />
      <div className="image-container">
        {image && <img src={image} alt="copy pasted image" />}
      </div>
      
      <QuestList recs={rerolls} />
    </div>
  )
}

export default App
