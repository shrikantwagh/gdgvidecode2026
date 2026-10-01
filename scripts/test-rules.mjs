import assert from 'node:assert/strict';
import {drop} from '../lib/game.ts';
for(const cells of [[35,36,37],[14,21,28],[35,29,23],[38,30,22]]){
 const board=Array(42).fill(0);for(const i of cells)board[i]=1;
 const target=cells[0]===35&&cells[1]===36?38:cells[0]===14?35:cells[0]===35?17:14;
 for(let r=Math.floor(target/7)+1;r<6;r++)if(!board[r*7+target%7])board[r*7+target%7]=2;
 assert.equal(drop(board,target%7,1).winner,1);
}
const full=Array(42).fill(0);for(let r=0;r<6;r++)full[r*7]=r%2+1;assert.throws(()=>drop(full,0,1));assert.throws(()=>drop(full,-1,1));console.log('PASS: horizontal, vertical, both diagonals, full column, invalid column.');
