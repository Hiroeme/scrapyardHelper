import { useState, useEffect } from 'react';
import './App.css';
import usePreprocess from "./hooks/usePreprocess";
import useTextExtract from "./hooks/useTextExtract";
import useTextClean from "./hooks/useTextClean";
import useClipboard from "./hooks/useClipboard";
import rerollCalc from './utils/rerollcalc';
import Instructions from './components/Instructions';
import QuestList from './components/QuestList';


function App() {

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const initialTheme = localStorage.getItem("theme");
    if (initialTheme === "dark" || initialTheme === "light") {
      setTheme(initialTheme);
       document.documentElement.setAttribute("data-theme", initialTheme);
    } else {
      document.documentElement.setAttribute("data-theme", theme)
    }
  }, []);

  const [image, setImage, procImage] = usePreprocess();
  const extractedText = useTextExtract(procImage)
  const quests = useTextClean(extractedText)
  const rerolls = rerollCalc(quests)
  useClipboard(setImage)

  const darkModeHandler = () => {
    if (theme === "light") {
      localStorage.theme = "dark";
      setTheme("dark")
    } else {
      localStorage.theme = "light";
      setTheme("light")
    }

    const storedTheme = localStorage.getItem("theme") as string;
    document.documentElement.setAttribute("data-theme", storedTheme);
  }
  
  return (  
    <div className="dark:bg-zinc-800 bg-orange-300 p-8 mt-20 mb-20 mr-auto ml-auto max-w-5xl border-2 rounded-2xl shadow-lg">
      <div className="flex">
        <h1 className="dark:text-white text-3xl font-bold flex-1 p-4">
          GMS Maplestory Scrapyard Helper
        </h1>
          <a href="https://coff.ee/hiroeme" target="_blank" className="flex-none flex items-center bg-amber-50 px-4 m-2 border rounded-xl hover:bg-orange-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6">
              {/*<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->*/}
              <path d="M88 0C74.7 0 64 10.7 64 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C120.5 112.3 128 119.9 128 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C119.5 47.7 112 40.1 112 24c0-13.3-10.7-24-24-24zM32 192c-17.7 0-32 14.3-32 32L0 416c0 53 43 96 96 96l192 0c53 0 96-43 96-96l16 0c61.9 0 112-50.1 112-112s-50.1-112-112-112l-48 0L32 192zm352 64l16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48l-16 0 0-96zM224 24c0-13.3-10.7-24-24-24s-24 10.7-24 24c0 38.9 23.4 59.4 39.1 73.1l1.1 1C232.5 112.3 240 119.9 240 136c0 13.3 10.7 24 24 24s24-10.7 24-24c0-38.9-23.4-59.4-39.1-73.1l-1.1-1C231.5 47.7 224 40.1 224 24z"/>
            </svg>
          </a>
          <button onClick={darkModeHandler} className="flex-none flex items-center bg-amber-50  px-4 m-2 border rounded-xl hover:bg-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-6 h-6">
              {/*<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->*/}
              <path d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0l-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"/>
            </svg>
          </button>
      </div>
      <Instructions />
      <div className="flex justify-center">
        {image && <img className="max-w-lg max-h-md w-full h-auto rounded-2xl m-4 shadow-md"src={image} alt="copy pasted image" />}
      </div>
      
      <QuestList recs={rerolls} />
    </div>
  )
}

export default App
