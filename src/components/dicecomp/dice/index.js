import React from "react";

import "./styles.css";
import Diceone from "../../../images/dice-one.svg";
import Dicetwo from "../../../images/dice-two.svg";
import Dicethree from "../../../images/dice-three.svg";
import Dicefour from "../../../images/dice-four.svg";
import Dicefive from "../../../images/dice-five.svg";
import Dicesix from "../../../images/dice-six.svg";

function Dice(props) {
  const { face } = props;
  let Diceface;
  switch (face) {
    case 1:
      Diceface = Diceone;
      break;
    case 2:
      Diceface = Dicetwo;
      break;
    case 3:
      Diceface = Dicethree;
      break;
    case 4:
      Diceface = Dicefour;
      break;
    case 5:
      Diceface = Dicefive;
      break;
    case 6:
      Diceface = Dicesix;
      break;
    default:
      Diceface = Diceone;
  }
  return (
    <div className="dice-container">
      <img className="dice-image" src={Diceface} />
    </div>
  );
}

export default Dice;
