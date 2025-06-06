import { useState } from 'react';
import './App.css';
import usePreprocess from "./hooks/usePreprocess";
import useTextExtract from "./hooks/useTextExtract";
import useTextClean from "./hooks/useTextClean";
import useClipboard from "./hooks/useClipboard";
import rerollCalc from './utils/rerollcalc';
import Instructions from './components/Instructions';
import QuestList from './components/QuestList';
import Header from './components/Header';
import useInitialTheme from './hooks/useInitialTheme';


function App() {

  const [theme, setTheme] = useState("light");
  useInitialTheme(theme, setTheme);

  const [image, setImage, procImage] = usePreprocess();
  const extractedText = useTextExtract(procImage);
  const quests = useTextClean(extractedText);
  const rerolls = rerollCalc(quests);
  useClipboard(setImage);
  
  return (  
    <div className="dark:bg-zinc-800 bg-orange-300 p-8 mt-20 mb-20 mr-auto ml-auto max-w-5xl border-2 rounded-2xl shadow-lg">
      <Header theme={theme} setTheme={setTheme}/>
      <Instructions />
      <div className="flex justify-center">
        {image && <img className="max-w-lg max-h-md w-full h-auto rounded-2xl m-4 shadow-md"src={image} alt="copy pasted image" />}
      </div>
      
      <QuestList recs={rerolls} />
    </div>
  )
}

export default App
