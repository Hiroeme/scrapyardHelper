import { useState } from 'react';

const Instructions = () => {
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="instructions">
    <p>
      Copy and paste your scrapyard weeklies to display the rated <b>Difficulty</b> and <b>Reroll Chances</b> for a better quest.
      You can then decide which ones you want to keep or remove.
    </p>
    
    <p>Difficulty ratings were pulled from <a href="https://docs.google.com/spreadsheets/d/1FJcMQHfhsDNsRQW_KhrmR3uyWmudv8e8Y_nY5uawKAg/edit?gid=0#gid=0">u/GyroBallMetagross's Reroll Guide</a>.</p>

    <hr></hr>

    <ul>
      <li>Press <b>Window's Logo Key + Shift + S</b> to open the Windows snipping tool.</li>
      <li>Drag a box around One-Eye's Scrapyard Weeklies Quest Box.</li>
      <li>Copy the image and paste it here.</li>
    </ul>

    <button onClick={() => setShowExample(!showExample)}>
        {showExample ? 'Close Example' : 'Show Example'}
      </button>

      {showExample && (
        <div className="example-container">
          <img className="examplePic" src="../../example.png" alt="Example picture of a good screenshot" />
        </div>
      )}
    
    <hr></hr>
    <p>
      Note: This is a for fun <a href="https://github.com/Hiroeme/scrapyardHelper" className="link"><b>project</b></a> for me so it can be inaccurate!
    </p>
  </div>
  );
};

export default Instructions;