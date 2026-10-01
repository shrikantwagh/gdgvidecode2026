import assert from "node:assert/strict";
const base="http://127.0.0.1:5173/api/game", a=crypto.randomUUID(),b=crypto.randomUUID(),c=crypto.randomUUID();
async function post(action,token,extra={},status=200){const r=await fetch(base,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,token,...extra})});const d=await r.json();assert.equal(r.status,status,JSON.stringify(d));return d}
let g=await post("create",a,{name:"Ada"});const code=g.code;assert.equal(code.length,6);
await post("move",a,{code,column:0},409);
g=await post("join",b,{code,name:"Grace"});assert.equal(g.me,2);assert.equal(g.names.length,2);
await post("join",c,{code,name:"Third"},409);await post("move",b,{code,column:0},409);await post("move",a,{code,column:9},400);
for(const [i,column] of [0,1,0,1,0,1,0].entries())g=await post("move",i%2?b:a,{code,column});
assert.equal(g.winner,1);assert.equal(g.line.length,4);
const r=await fetch(base+"?code="+code+"&token="+b);const read=await r.json();assert.deepEqual(read.board,g.board);assert.equal(read.winner,1);assert.ok(!("tokens" in read));
await post("move",b,{code,column:2},409);g=await post("rematch",a,{code});assert.equal(g.winner,1);g=await post("rematch",b,{code});assert.equal(g.winner,0);assert.equal(g.turn,2);assert.equal(g.round,2);
const pair=await Promise.all([fetch(base,{method:"POST",body:JSON.stringify({action:"move",token:b,code,column:2})}),fetch(base,{method:"POST",body:JSON.stringify({action:"move",token:b,code,column:3})})]);assert.deepEqual(pair.map(r=>r.status).sort(),[200,409]);console.log("PASS: create, join, cross-client read, turn enforcement, invalid columns, win, rematch, concurrent move protection.");
