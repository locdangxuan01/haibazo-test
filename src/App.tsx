import Point from "./components/Point";
import { useRef, useState } from "react";
import { PointType } from "./types/Point.type";
import { GameStatusType } from "./types/GameStatus.type";
import { getGameStatusResponse } from "./utils";
import { Counter } from "./components/Counter";

function App() {
  const $pointRef: any = useRef(null);
  const $intervalRef: any = useRef(null);

  const [points, setPoints] = useState<PointType[]>([]);
  const [selectPoint, setSelectPoint] = useState(0);
  const [buttonStatus, setButtonStatus] = useState<"Play" | "Restart">("Play");
  const [gameStatus, setGameStatus] = useState<GameStatusType>(
    GameStatusType.PLAYING
  );

  const onSetUpPoints = (totalPoints: number) => {
    setGameStatus(GameStatusType.PLAYING);
    setButtonStatus("Restart");
    setSelectPoint(0);
    setPoints(
      Array(totalPoints)
        .fill(0)
        .map((_, i) => ({
          number: i + 1,
          top: Math.random() * 449,
          left: Math.random() * 599,
        }))
    );
  };

  const canSetUpPoints = () => {
    const totalPoints = Number($pointRef?.current?.value);
    if (!totalPoints) {
      return false;
    }
    onSetUpPoints(totalPoints);
    return true;
  };

  const onStopCounter = () => {
    if ($intervalRef.current) {
      clearInterval($intervalRef.current);
    }
  };

  const onRemovePoint = (number: number) => {
    if (number > selectPoint + 1) {
      onStopCounter();
      setGameStatus(GameStatusType.LOSE);
      return;
    }
    setSelectPoint(number);
    if (number === points.length) {
      setTimeout(() => {
        onStopCounter();
        setGameStatus(GameStatusType.WIN);
      }, 2000);
    }
  };
  const { title, color } = getGameStatusResponse(gameStatus);

  return (
    <div className="flex flex-col h-screen">
      <div className="w-[700px] border border-black px-6 py-8 mx-auto my-5">
        <div className="w-[350px] flex flex-col gap-2">
          <h1 className={`font-bold text-xl ${color} `}>{title}</h1>
          <div className="flex w-full justify-between">
            <p>Points:</p>
            <input
              className="w-[200px] border border-gray-600 px-1"
              type="number"
              ref={$pointRef}
              aria-labelledby="points"
            />
          </div>
          <Counter
            gameStatus={gameStatus}
            onSetUpPoints={canSetUpPoints}
            buttonStatus={buttonStatus}
            intervalRef={$intervalRef}
          />
        </div>
        <div className="w-full h-[500px] border border-black mt-3 relative">
          {points.map((e) => (
            <Point
              gameStatus={gameStatus}
              selectPoint={selectPoint}
              onClick={() => onRemovePoint(e.number)}
              key={e.number}
              number={e.number}
              top={e.top}
              left={e.left}
              zIndex={points.length - e.number}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
