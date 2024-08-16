import { useEffect, useState } from "react";
import { GameStatusType } from "../types/GameStatus.type";

type Props = {
  number: number;
  top: number;
  left: number;
  zIndex: number;
  onClick: () => void;
  selectPoint: number;
  gameStatus: GameStatusType;
};

const Point: React.FC<Props> = ({
  number,
  top = 0,
  left = 0,
  zIndex = 0,
  onClick,
  selectPoint,
  gameStatus,
}) => {
  const [css, setCss] = useState("");

  useEffect(() => {
    if (selectPoint === 0) {
      setCss("");
    }
  }, [selectPoint]);

  const onClickPoint = () => {
    onClick();
    if (number === selectPoint + 1 && gameStatus !== GameStatusType.LOSE) {
      setCss("change-background-point");
      setTimeout(() => {
        setCss((_) => "hidden");
      }, 2000);
    }
  };

  return (
    <button
      onClick={onClickPoint}
      type="button"
      style={{ top, left, zIndex }}
      className={`${css} w-[50px] h-[50px] flex justify-center items-center font-bold bg-white p-2 absolute rounded-full border border-black`}
    >
      {number}
    </button>
  );
};

export default Point;
