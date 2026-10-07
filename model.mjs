export const RIVALS=[
 {name:'Pip',tag:'Find your distance',pattern:['step','strike','step','strike','guard']},
 {name:'Moth',tag:'Watch the retreat',pattern:['strike','retreat','step','guard','strike']},
 {name:'Rook',tag:'Break the rhythm',pattern:['step','strike','strike','guard','strike','guard']}
];
export function initial(rival=0){return {rival,p:1,e:5,hp:5,ehp:5,guardReady:true,turn:0,done:false,won:false,log:[]};}
export function intent(s){const planned=RIVALS[s.rival].pattern[s.turn%RIVALS[s.rival].pattern.length];return s.e-s.p>1&&planned!=='retreat'?'step':planned;}
export function stepLabel(s){return s.e-s.p===1?'Step back':'Step in';}
export function act(state,action){
 if(state.done||!['step','strike','guard'].includes(action))return state;
 const s=structuredClone(state),enemy=intent(s),wasReady=s.guardReady,lines=[];const oldP=s.p,oldE=s.e;
 let p=action==='step'?Math.max(0,Math.min(6,s.p+(s.e-s.p===1?-1:1))):s.p;
 let e=enemy==='step'?s.e-1:enemy==='retreat'?Math.min(6,s.e+1):s.e;
 if(p>=e){p=Math.min(p,oldE-1);e=Math.max(e,p+1);}s.p=p;s.e=e;
 if(action==='step')lines.push(p===oldP?'You hold the edge.':p>oldP?'You step in.':'You step back.');
 if(enemy==='step'||enemy==='retreat')lines.push(e===oldE?`${RIVALS[s.rival].name} holds position.`:enemy==='step'?`${RIVALS[s.rival].name} steps in.`:`${RIVALS[s.rival].name} steps back.`);
 const inRange=e-p===1;
 if(action==='strike'){if(!inRange)lines.push('Your strike falls short.');else if(enemy==='guard'){s.hp--;lines.push('Their guard counters your strike. You lose 1 heart.');}else{s.ehp-=2;lines.push('Your strike lands for 2.');}}
 if(enemy==='strike'){if(!inRange)lines.push('Their strike misses.');else if(action==='guard'&&wasReady){s.ehp--;lines.push('You parry! They lose 1 heart.');}else{s.hp-=2;lines.push(action==='guard'?'Your guard is tired. Their strike lands for 2.':'Their strike lands for 2.');}}
 if(action==='guard'&&enemy!=='strike')lines.push(wasReady?'You guard, but no strike comes.':'Your guard is still tired.');
 s.guardReady=action!=='guard';s.hp=Math.max(0,s.hp);s.ehp=Math.max(0,s.ehp);s.turn++;s.done=s.hp===0||s.ehp===0;s.won=s.ehp===0&&s.hp>0;s.log=[...state.log,{turn:s.turn,action,enemy,lines}];return s;
}
