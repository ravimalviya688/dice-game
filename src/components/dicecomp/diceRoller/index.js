import React, { useEffect } from "react";
import diceRoll from "../../../images/dice-roll.gif";

export default function DiceRoller({ onRollerStop }) {
  useEffect(() => {
    let timmer = setTimeout(() => {
      onRollerStop(Math.floor(Math.random() * 6) + 1);
    }, 2000);
    return () => {
      clearTimeout(timmer);
    };
  }, []);
  return (
    <div>
      <img src={diceRoll} width={200} />
    </div>
  );
}
