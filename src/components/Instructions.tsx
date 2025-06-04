import { useState } from 'react';

const Instructions = () => {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="dark:bg-zinc-700 dark:text-white text-xl bg-amber-50 p-8 m-4 mt-4 mb-4 border-black rounded-2xl shadow-lg">
    <p>
      Copy and paste your scrapyard weeklies to display the rated <b>Difficulty</b> and <b>Reroll Chances</b> for a better quest.
      You can then decide which ones you want to keep or remove.
    </p>
    
    <p>Difficulty ratings were pulled from <a className="font-bold text-blue-500 hover:text-blue-800" href="https://docs.google.com/spreadsheets/d/1FJcMQHfhsDNsRQW_KhrmR3uyWmudv8e8Y_nY5uawKAg/edit?gid=1077207113#gid=1077207113">u/GyroBallMetagross's MSEA Reroll Guide</a>.</p>

    <hr className="text-black mt-4 mb-4"></hr>

    <ul className="list-disc pl-5 mr-2 ml-2">
      <li>Press <b>Window's Logo Key + Shift + S</b> to open the Windows snipping tool.</li>
      <li>Drag a box around One-Eye's Scrapyard Weeklies Quest Box.</li>
      <li>Copy the image and press <b>Ctrl + V</b> to paste it here.</li>
    </ul>
    <div className="flex justify-center">
      <button className="dark:bg-orange-400 dark:hover:bg-orange-500 bg-orange-200 hover:bg-orange-400 m-1 py-1 px-4 rounded font-semibold" onClick={() => setShowExample(!showExample)}>
          {showExample ? 'Close Example' : 'Show Example'}
        </button>
    </div>
    {showExample && (
        <div className="flex justify-center">
          <img className="max-w-lg max-h-md w-full h-auto rounded-2xl m-4" src="/example.png" alt="Example picture of a good screenshot" />
        </div>
    )}
    <hr className="text-black mt-2 mb-4"></hr>
    <p>
      If it doesn't work fully, you can try varying the size of the screenshot, or you can consult the reroll guide linked above.
    </p>
    <p>
      Note: This is a for fun <a href="https://github.com/Hiroeme/scrapyardHelper" className="font-bold text-blue-500 hover:text-blue-800"><b>project</b></a> so it can be inaccurate! Thank you for using it!
    </p>
  </div>
  );
};

export default Instructions;