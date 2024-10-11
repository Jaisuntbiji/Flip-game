import { useEffect, useState } from "react";
import "./App.css";
import "./Compount/FlipCard.css";

const iteam = [
  "😉",
  "😊",
  "😋",
  "😄",
  "😃",
  "🤣",
  "😏",
  "😐",
  "😑",
  "😝",
  "🫤",
  "🙁",
  "😕",
  "☹️",
  "😲",
];

function App() {
  const [stick, setStick] = useState([]);
  const startGame = () => {
    const tempIcon = [...iteam, ...iteam];
    const newIcon = [];

    while (newIcon.length < tempIcon.length) {
      let randomIndex = Math.floor(Math.random() * tempIcon.length);
      newIcon.push({
        emoji: tempIcon[randomIndex],
        flipped: false,
        sloved: false,
        position: newIcon.length,
      });
      tempIcon.splice(randomIndex, 1);
    }
    setStick(newIcon);
  };

  const clickhander = (data) => {
    const newstick = stick.map((stick) => {
      if (stick.flipped === data.flipped && stick.position == data.position) {
        stick.flipped = !stick.flipped;
      }
      // console.log(data.flipped);
      // console.log(data.sloved)
      return stick;
    });
    setStick(newstick);
  };

  const gameLogicForFlipCard = () => {
    const iconCheck = stick.filter((data) => data.flipped);
    setTimeout(() => {
      if (iconCheck.length === 2) {
        if (iconCheck[0].emoji === iconCheck[1].emoji) {
          setStick(
           stick.map((stick)=>{
            if(stick.position === iconCheck[0].position || stick.position === iconCheck[1]){
              stick.sloved = true;
              stick.flipped = true;
              // console.log(stick.sloved)
              console.log(stick.position)
              console.log(stick.flipped)
            }
            return stick;
           })
          );
        } else {
          setStick(
            stick.map((stick) => {
              if (
                stick.position === iconCheck[0].position ||
                stick.position === iconCheck[1].position 
              ) {
                stick.flipped = false;
              }
              return stick;
            })
          );
        }
      }
    }, 2000);
  };



  useEffect(() => {
    gameLogicForFlipCard();
  }, [stick]);

  useEffect(() => {
    startGame();
  }, []);

  return (
    <>
      <h1>Flip-Game</h1>
      <div className="continer">
        {stick.map((data, index) => (
          <div
            className={`flip-card ${data.flipped ? "active" : ""}`}
            key={index}
            onClick={() => clickhander(data)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front" />
              <div className="flip-card-back">{data.emoji}</div>
            </div>
          </div>
        ))}
        </div>
    </>
  );
}

export default App;
