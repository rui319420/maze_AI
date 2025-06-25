'use client';

import { useState } from 'react';
import styles from './page.module.css';

// やるべきこと
// ランダムに迷路を生成;
// 左手の法則に従って進むキャラクター作成;
const startBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export default function Home() {
  const [board, setBoard] = useState(() => structuredClone(startBoard));
  const newBoard = structuredClone(board);

  const clickButton = (newBoard: number[][]) => {
    for (let wallY = 0; wallY < 9; wallY++)
      for (let wallX = 0; wallX < 9; wallX++)
        if (newBoard[wallY][wallX] === 1 && wallY % 2 === 1 && wallX % 2 === 1) {
          const randomWall = Math.floor(Math.random() * 4) + 1;
          console.log(Math.floor(Math.random() * 4) + 1);
          //Math.random() * ( 最大値 - 最小値 ) + 最小値;
          //この場合、１から４（整数）までをランダムに生成する
          if (randomWall === 1 && newBoard[wallY - 1][wallX] === 0) {
            newBoard[wallY - 1][wallX] = 1;
          } else if (randomWall === 2 && newBoard[wallY][wallX + 1] === 0) {
            newBoard[wallY][wallX + 1] = 1;
          } else if (randomWall === 3 && newBoard[wallY + 1][wallX] === 0) {
            newBoard[wallY + 1][wallX] = 1;
          } else {
            newBoard[wallY][wallX - 1] = 1;
          }
          newBoard[wallY][wallX] = 1;
        }
    setBoard(newBoard);
  };

  const resetBoard = () => {
    setBoard(startBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((wall, x) => (
            <div className={styles.cell} key={`${x}-${y}`}>
              {wall === 1 && <div className={styles.wall} />}
            </div>
          )),
        )}
      </div>
      <button className={styles.button} onClick={() => clickButton(newBoard)}>
        ポチ
      </button>
      <button className={styles.button} onClick={resetBoard}>
        リセット
      </button>
    </div>
  );
}
