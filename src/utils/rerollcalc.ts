import { Quest, Recommendation } from "../types/types";

const datacounts = {
  'Very Slow': 11,
  'Slow': 11,
  'Average': 14,
  'Fast': 8,
  'Very Fast': 8
}

const rerollCalc = (quests: Quest[]): Recommendation[] => {
  if (quests.length === 0) return [];

  // change this to a reduce function :)
  const questcounts = {
    'Very Slow': quests.filter(quest => quest.averagetime === 'Very Slow').length,
    'Slow': quests.filter(quest => quest.averagetime === 'Slow').length,
    'Average': quests.filter(quest => quest.averagetime === 'Average').length,
    'Fast': quests.filter(quest => quest.averagetime === 'Fast').length,
    'Very Fast': quests.filter(quest => quest.averagetime === 'Very Fast').length,
  }
  const counts: { [key: string]: number } = {
    'Very Slow': datacounts['Very Slow'] - questcounts['Very Slow'],
    'Slow': datacounts['Slow'] - questcounts['Slow'],
    'Average': datacounts['Average'] - questcounts['Average'],
    'Fast': datacounts['Fast'] - questcounts['Fast'],
    'Very Fast': datacounts['Very Fast'] - questcounts['Very Fast'],
  };

  const total = counts['Very Slow'] + counts['Slow'] + counts['Average'] + counts['Fast'] + counts['Very Fast']

  const findPercentage = (averagetime : string) : string => {
    const timeOrder = ['Very Slow', 'Slow', 'Average', 'Fast', 'Very Fast'];
    const index = timeOrder.indexOf(averagetime) + 1

    const betterQuests = timeOrder.slice(index).reduce((acc, time) => acc + counts[time], 0);
    
    return (betterQuests / total * 100).toFixed(2);
  }

  const recs = quests.map(quest => (
    {
      'name': quest.name, 
      'mob': quest.mob, 
      'averagetime': quest.averagetime,
      'reroll': findPercentage(quest.averagetime)
    }
  ))

  // console.log(differenceCounts);
  return recs;
};

export default rerollCalc;
