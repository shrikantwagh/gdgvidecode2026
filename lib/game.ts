export function drop(board:number[],column:number,player:number){
if(!Number.isInteger(column)||column<0||column>6)throw Error("Choose a column from 1 to 7.");
const next=[...board];let row=5;while(row>=0&&next[row*7+column])row--;if(row<0)throw Error("That column is full. Try another.");next[row*7+column]=player;
for(const [dr,dc] of [[0,1],[1,0],[1,1],[1,-1]]){const line=[row*7+column];for(const sign of [-1,1]){let r=row+dr*sign,c=column+dc*sign;while(r>=0&&r<6&&c>=0&&c<7&&next[r*7+c]===player){line.push(r*7+c);r+=dr*sign;c+=dc*sign}}if(line.length>=4)return{board:next,winner:player,line}}
return{board:next,winner:next.every(Boolean)?3:0,line:[]};
}
