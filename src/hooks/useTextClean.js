import Fuse from "fuse.js";
import { useState, useEffect } from "react"
import data from '../../data.json'

// previous attempt
// console.log(text.replace(/(\W\r\n|\n|\r)/gm, " "))
// const result = data.quests
//   .filter(quest => text.replace(/(\W\r\n|\n|\r)/gm, " ").toLowerCase().includes(quest.name.toLowerCase()))


const useTextClean = (text) => {
  
  const [cleanText, setCleanText] = useState([]);

  useEffect(() => {
    if (!text) return;

    // this is where we try to separate the quests based on [Weekly Quest] separators
    const pattern = /\[Weekly Quest\][\s\S]*?(?=\[Weekly Quest\]|$)/g;
    const matchedText = text.match(pattern) || [];
    const strippedText = matchedText.map(text => text.replace("Weekly Quest", ""));

    const options = {
      includeScore: true,
      shouldSort: true,
      ignoreLocation: true,
      threshold: 0.4,
      keys: ['name']
    };

    const fuse = new Fuse(data.quests, options);
    const bestMatches = strippedText.map(text => {
      const matches = fuse.search(text);
      if (matches.length > 0) {
        const bestMatch = matches[0].item;
        // console.log(`Extracted Quest: "${text}"\n Best Match: "${bestMatch.name}"\n Score: ${matches[0].score}\n`);
        return bestMatch;
      }
    });
    
    setCleanText(bestMatches);

    // console.log(text)
    // console.log(strippedText)

    return () => {
      setCleanText([])
    }
  }, [text]);

  return cleanText
};

export default useTextClean;