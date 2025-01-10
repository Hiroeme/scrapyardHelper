import { Recommendation } from "../types/types";

interface QuestListProps {
  recs: Recommendation[];
}

const QuestList: React.FC<QuestListProps> = ({ recs }) => {

  if (recs.length <= 0) return null;

  return (
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
      {recs.map(quest => 
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
  )
}


export default QuestList;