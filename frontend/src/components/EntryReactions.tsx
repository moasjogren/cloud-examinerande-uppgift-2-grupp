"use client";

import { useState, useEffect } from "react";

//interface för reaktionstyperna
interface Reactions {
  happy: number;
  sad: number;
  angry: number;
  thoughtful: number;
}

interface EntryReactionsProps {
  entryId: string;
}
//komponent för att hantera reaktionerna på inläggen
export function EntryReactions({ entryId }: EntryReactionsProps) {
  //state för för reaktionerna och använderna reaktioner. startvärde är 0 för alla reaktioner
  const [reactions, setReactions] = useState<Reactions>({
    happy: 0,
    sad: 0,
    angry: 0,
    thoughtful: 0,
  });
  //state för användarens reaktioner. keyof Reactions betyder att det bara kan vara en av de fyra reaktionstyperna eller null
  const [userReactions, setUserReactions] = useState<keyof Reactions | null>(
    null
  );
  //laddar reaktionerna från localStorage när komponenten mountas
  useEffect(() => {
    const savedReactions = localStorage.getItem(`entry-${entryId}-reactions`);
    const savedUserReaction = localStorage.getItem(
      `entry-${entryId}-user-reaction`
    );
    if (savedReactions) {
      setReactions(JSON.parse(savedReactions));
    }
    if (savedUserReaction) {
      setUserReactions(savedUserReaction as keyof Reactions);
    }
  }, [entryId]);
  //hanterar när användaren klickar på en reaktionsknapp
  const handleReaction = (type: keyof Reactions) => {
    setReactions((prev) => {
      const newReactions = { ...prev };

      // Om användaren redan reagerat med samma emoji, ta bort den
      if (userReactions === type) {
        newReactions[type] = Math.max(0, newReactions[type] - 1);
        setUserReactions(null);
        localStorage.removeItem(`entry-${entryId}-user-reaction`);
        localStorage.setItem(
          `entry-${entryId}-reactions`,
          JSON.stringify(newReactions)
        );
        return newReactions;
      }

      // Om användaren redan reagerat med annan emoji, ta bort den gamla
      if (userReactions) {
        newReactions[userReactions] = Math.max(
          0,
          newReactions[userReactions] - 1
        );
      }

      // Lägg till ny reaktion
      newReactions[type] += 1;
      setUserReactions(type);

      // Spara till localStorage
      localStorage.setItem(
        `entry-${entryId}-reactions`,
        JSON.stringify(newReactions)
      );
      localStorage.setItem(`entry-${entryId}-user-reaction`, type);

      return newReactions;
    });
  };
  //knappar för reaktionerna som visar emojo och antal reaktioner.
  const reactionButtons = [
    { type: "happy" as keyof Reactions, emoji: "😊", label: "Happy" },
    { type: "sad" as keyof Reactions, emoji: "😢", label: "Sad" },
    { type: "angry" as keyof Reactions, emoji: "😠", label: "Angry" },
    { type: "thoughtful" as keyof Reactions, emoji: "🤔", label: "Thoughtful" },
  ];
  //renderar knapparna med rätt klasser beroende på om användaren har reagerat eller inte
  return (
    <div className="flex flex-wrap gap-1 w-fit">
      {reactionButtons.map(({ type, emoji, label }) => (
        <button
          key={type}
          onClick={() => handleReaction(type)}
          className={`reaction-btn-small ${userReactions === type ? "active" : ""}`}
          title={label}
        >
          <span className="text-sm">{emoji}</span>
          {/* {visar antal reaktioner om det är större än 0} */}
          {reactions[type] > 0 && (
            <span className="reaction-count-small">{reactions[type]}</span>
          )}
        </button>
      ))}
    </div>
  );
}
