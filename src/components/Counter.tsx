import { FC, useState } from "react";
import { GameStatusType } from "../types/GameStatus.type";

type Props = {
  gameStatus: GameStatusType;
  onSetUpPoints: () => boolean;
  buttonStatus: "Play" | "Restart";
  intervalRef: any;
};
export const Counter: FC<Props> = ({
  gameStatus,
  onSetUpPoints,
  buttonStatus,
  intervalRef,
}) => {
  const [count, setCount] = useState(0);

  const onRestartCounter = () => {
    const canStart = onSetUpPoints();

    if (canStart) {
      if (intervalRef.current && gameStatus === GameStatusType.PLAYING) {
        clearInterval(intervalRef.current);
      }
      setCount(0);

      intervalRef.current = setInterval(() => {
        setCount((prevCount) => Number((prevCount + 0.1).toFixed(1)));
      }, 100); // 100 millisecond interval
    }
  };

  return (
    <>
      <div className="flex w-full justify-between">
        <p>Time:</p>
        <div className="w-[200px]">{count ? count : "0.0"}s</div>
      </div>
      <button
        type="button"
        className="w-[100px] border border-gray-500 rounded-sm bg-gray-300"
        onClick={onRestartCounter}
      >
        {buttonStatus}
      </button>
    </>
  );
};
