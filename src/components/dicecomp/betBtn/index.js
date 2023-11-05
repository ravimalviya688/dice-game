import "./styles.css";

function BetBtn({ bet, setBet, isDisabled }) {
  return (
    <div
      className={`dice-bet ${isDisabled ? "disabled" : ""}`}
      onClick={setBet}
    >
      <div className="bet-value">$ {bet}</div>
    </div>
  );
}

export default BetBtn;
