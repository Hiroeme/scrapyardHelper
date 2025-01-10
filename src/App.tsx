// import { useState, useEffect } from 'react';
import './App.css';
import usePreprocess from "./hooks/usePreprocess";
import useTextExtract from "./hooks/useTextExtract";
import useTextClean from "./hooks/useTextClean";
import useClipboard from "./hooks/useClipboard";
import rerollCalc from './utils/rerollcalc';


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
      <div className="instructions">
        <p>
          Copy and paste your scrapyard weeklies to display the rated <b>Difficulty</b> and <b>Reroll Chances</b> for a better quest.
          You can then decide which ones you want to keep or remove.
        </p>

        <hr></hr>

        <p>
          If you don't know how to use the Windows snipping tool, here's a <a href="https://support.microsoft.com/en-us/windows/use-snipping-tool-to-capture-screenshots-00246869-1843-655f-f220-97299b865f6b#ID0EDD=Windows_11" className="link">guide</a>.
        </p>
        <p>
          General Tip: It might be better to do quests that require the same monsters to spend less time overall.
        </p>

        <p>
          Note: This is a for fun <a href="https://github.com/Hiroeme/scrapyardHelper" className="link"><b>project</b></a> for me so it can be inaccurate!
        </p>
      </div>
      <div className="image-container">
        {image && <img src={image} alt="copy pasted image" />}
      </div>
      
      {rerolls.length > 0 && (
        <div className="quest-list-container">
          <div className="category-block">
            <div className="categories">
              <div className="category-name">Name</div>
              <div className="category-mob">Mob</div>
              <div className="category-difficulty">Difficulty</div>
            </div>
            <div className="category-reroll">Reroll Chances</div>
          </div>

          <ul className="quest-list">
            {rerolls.map(quest => 
              quest ? (
              <li key={quest.name} className="quest-block">
                <div className="quest-item">
                  <span className="quest-name">{quest.name}</span>
                  <span className="quest-mob">{quest.mob}</span>
                  <span className="quest-time">{quest.averagetime}</span>
                </div>
                <div className="quest-reroll">
                  {quest.reroll}%
                </div>
              </li>
            ) : null
          )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
