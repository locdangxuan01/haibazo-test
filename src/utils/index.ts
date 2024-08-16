import { GameStatusType } from "../types/GameStatus.type";

type GameStatusResponseType = {
  title: string;
  color: string;
};
export const getGameStatusResponse = (
  gameStatus: GameStatusType
): GameStatusResponseType => {
  switch (gameStatus) {
    case GameStatusType.PLAYING:
      return {
        title: "LET'S PLAY",
        color: "text-black",
      };
    case GameStatusType.LOSE:
      return {
        title: "GAME OVER",
        color: "text-red-600",
      };
    case GameStatusType.WIN:
      return {
        title: "ALL CLEAR",
        color: "text-green-600",
      };
    default:
      return {
        title: "",
        color: "",
      };
  }
};
