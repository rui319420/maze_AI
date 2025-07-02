'use client';

import { useState } from 'react';
import styles from './page.module.css';

// やるべきこと
// ランダムに迷路を生成;
// 左手の法則に従って進むキャラクター作成;
const startBoard = [
  [2, 0, 0, 0, 0, 0, 0, 0, 0],
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
  const [charaDir, setCharaDir] = useState(2);
  const newBoard = structuredClone(board);

  const clickButton = (newBoard: number[][]) => {
    for (let wallY = 0; wallY < 9; wallY++)
      for (let wallX = 0; wallX < 9; wallX++)
        if (newBoard[wallY][wallX] === 1 && wallY % 2 === 1 && wallX % 2 === 1) {
          //壁の座標が奇数のときー＞都合がいい
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
    setCharaDir(2);
  };

  const moveCharacter = () => {
    const newBoard = structuredClone(board);
    // let charaDir: number = 1;
    //１：上 ２：右 ３：下 ４：左とする
    for (let charaY = 0; charaY < 9; charaY++)
      for (let charaX = 0; charaX < 9; charaX++)
        //この二つのfor文はキャラを特定するだけのもの
        if (newBoard[charaY][charaX] === 2) {
          //上向きのとき
          if (charaDir === 1) {
            if (charaX > 0 && newBoard[charaY][charaX - 1] === 0) {
              newBoard[charaY][charaX] = 0;
              newBoard[charaY][charaX - 1] = 2;
              setBoard(newBoard);
              setCharaDir(4); // 向きを「左」へ
              return;
            } else if (charaY > 0 && newBoard[charaY - 1][charaX] === 0) {
              newBoard[charaY][charaX] = 0;
              newBoard[charaY - 1][charaX] = 2;
              setBoard(newBoard);
              return;
            } else {
              if (charaX < 8 && newBoard[charaY][charaX + 1] === 0) {
                setCharaDir(2); // 右を向く
              } else {
                setCharaDir(3); // 行き止まりなので後ろ(下)を向く
              }
              return;
            }
          }

          //右向きのとき
          else if (charaDir === 2) {
            if (charaY > 0 && newBoard[charaY - 1][charaX] === 0) {
              newBoard[charaY][charaX] = 0;
              newBoard[charaY - 1][charaX] = 2;
              setBoard(newBoard);
              setCharaDir(1); // 向きを「上」へ
              return;
            } else if (charaX < 8 && newBoard[charaY][charaX + 1] === 0) {
              newBoard[charaY][charaX] = 0;
              newBoard[charaY][charaX + 1] = 2;
              setBoard(newBoard);
              return;
            } else {
              if (charaY < 8 && newBoard[charaY + 1][charaX] === 0) {
                setCharaDir(3); // 右手側(下)を向く
              } else {
                setCharaDir(4); // 行き止まりなので後ろ(左)を向く
              }
              return;
            }
          }

          //下向きのとき
          else if (charaDir === 3) {
            if (charaX < 8 && newBoard[charaY][charaX + 1] === 0) {
              newBoard[charaY][charaX] = 0;
              newBoard[charaY][charaX + 1] = 2;
              setBoard(newBoard);
              setCharaDir(2); // 向きを「右」へ
              return;
            } else if (charaY < 8 && newBoard[charaY + 1][charaX] === 0) {
              newBoard[charaY][charaX] = 0;
              newBoard[charaY + 1][charaX] = 2;
              setBoard(newBoard);
              return;
            } else {
              if (charaX > 0 && newBoard[charaY][charaX - 1] === 0) {
                setCharaDir(4); // 右手側(左)を向く
              } else {
                setCharaDir(1); // 行き止まりなので後ろ(上)を向く
              }
              return;
            }
          }

          //左向きのとき
          else if (charaDir === 4) {
            if (charaY < 8 && newBoard[charaY + 1][charaX] === 0) {
              newBoard[charaY][charaX] = 0;
              newBoard[charaY + 1][charaX] = 2;
              setBoard(newBoard);
              setCharaDir(3); // 向きを「下」へ
              return;
            } else if (charaX > 0 && newBoard[charaY][charaX - 1] === 0) {
              newBoard[charaY][charaX] = 0;
              newBoard[charaY][charaX - 1] = 2;
              setBoard(newBoard);
              return;
            } else {
              if (charaY > 0 && newBoard[charaY - 1][charaX] === 0) {
                setCharaDir(1); // 右手側(上)を向く
              } else {
                setCharaDir(2); // 行き止まりなので後ろ(右)を向く
              }
              return;
            }
          }
        }
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((col, x) => (
            <div className={styles.cell} key={`${x}-${y}`}>
              {col === 1 && <div className={styles.wall} />}
              {col === 2 && <div className={styles.character} />}
            </div>
          )),
        )}
      </div>
      <button className={styles.button} onClick={moveCharacter}>
        一歩進む
      </button>
      <button className={styles.button} onClick={() => clickButton(newBoard)}>
        生成
      </button>
      <button className={styles.button} onClick={resetBoard}>
        リセット
      </button>
    </div>
  );
}
