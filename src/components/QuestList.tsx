import { Recommendation } from "../types/types";

interface QuestListProps {
  recs: Recommendation[];
}

const QuestList: React.FC<QuestListProps> = ({ recs }) => {

  if (recs.length <= 0) return null;

  return (
<div className="dark:bg-zinc-700 text-xl bg-amber-50 p-4 mt-4 mb-4 rounded-2xl shadow-lg">
  <table className="min-w-full table-auto border-collapse">
    <thead className="dark:text-white">
      <tr className="text-left">
        <th className="px-4 py-2">Name</th>
        <th className="px-4 py-2">Mob</th>
        <th className="px-4 py-2">Difficulty</th>
        <th className="px-4 py-2">Reroll %</th>
      </tr>
    </thead>
    <tbody className="dark:text-white">
          {recs.map(quest =>
            quest ? (
              <tr key={quest.name} className="border-t">
                <td className="dark:text-amber-100 px-4 py-2">{quest.name}</td>
                <td className="dark:text-amber-200 px-4 py-2">{quest.mob}</td>
                <td className="dark:text-amber-300 px-4 py-2 font-semibold">{quest.averagetime}</td>
                <td className="dark:text-amber-400 px-4 py-2 font-semibold">{quest.reroll}%</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  )
}


export default QuestList;