import { Recommendation } from "../types/types";

interface QuestListProps {
  recs: Recommendation[];
}

const QuestList: React.FC<QuestListProps> = ({ recs }) => {

  if (recs.length <= 0) return null;

  return (
<div className="bg-amber-50 p-4 mt-4 mb-4 border rounded-2xl shadow-lg">
  <table className="min-w-full table-auto border-collapse">
    <thead>
      <tr className="text-left">
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Mob</th>
        <th className="px-4 py-2">Difficulty</th>
        <th className="px-4 py-2">Reroll %</th>
      </tr>
    </thead>
    <tbody>
          {recs.map(quest =>
            quest ? (
              <tr key={quest.name} className="border-t">
                <td className="px-4 py-2">{quest.name}</td>
                <td className="px-4 py-2">{quest.mob}</td>
                <td className="px-4 py-2 font-semibold">{quest.averagetime}</td>
                <td className="px-4 py-2 font-semibold">{quest.reroll}%</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  )
}


export default QuestList;