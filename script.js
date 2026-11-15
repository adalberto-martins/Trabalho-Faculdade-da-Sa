const NS="http://www.w3.org/2000/svg";
const el=(t,a={},p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);p&&p.appendChild(e);return e};
const N=30; // casas: 0 = início, N-1 = fim
const SPECIAL={4:"flor",7:"chuva",10:"mel",13:"teia",16:"flor",19:"chuva",21:"mel",24:"teia",26:"flor",27:"chuva"};
const ICON={flor:"🌼",mel:"🍯",chuva:"🌧️",teia:"🕸️"};
const CHARS=[
  {name:"Abelha",icon:"🐝",color:"#ffd23f"},
  {name:"Formiga",icon:"🐜",color:"#c7b3ff"},
  {name:"Joaninha",icon:"🐞",color:"#ff8a80"},
  {name:"Borboleta",icon:"🦋",color:"#7fd8ff"},
  {name:"Beija-flor",icon:"🐦",color:"#8ee6a8"},
  {name:"Morcego",icon:"🦇",color:"#ffb36b"}];
let PLAYERS=[];

// sol
const rays=document.getElementById("rays");
for(let i=0;i<12;i++){const a=i*Math.PI/6;el("line",{x1:Math.cos(a)*64,y1:Math.sin(a)*64,x2:Math.cos(a)*82,y2:Math.sin(a)*82},rays)}
// árvores
function tree(x,y,s,c){const g=el("g",{transform:`translate(${x} ${y}) scale(${s})`},document.getElementById("trees"));
  el("rect",{x:-9,y:0,width:18,height:70,rx:6,fill:"#8a5a2b"},g);
  [[0,-20,46],[-34,0,34],[34,0,34],[-18,-50,30],[20,-48,32]].forEach(([cx,cy,r])=>el("circle",{cx,cy,r,fill:c},g));}
tree(110,470,1.25,"#4fa83a");tree(395,470,1,"#2f8f2e");tree(905,410,1.1,"#6cb73f");
// fruta e formiga decorativas
const deco=el("g",{},document.getElementById("trees"));
// pitangas desenhadas: fruto em gomos com sépalas verdes
function pitanga(x,y,r,opt={}){
  const g=el("g",{transform:`translate(${x} ${y})`},opt.parent||deco);
  const c=opt.ripe===false?"#f7a23b":"#e0301e", dark=opt.ripe===false?"#c9751a":"#a3170c";
  el("ellipse",{cx:0,cy:0,rx:r,ry:r*.86,fill:c,stroke:dark,"stroke-width":Math.max(1.5,r*.08)},g);
  // gomos
  [-.62,-.3,0,.3,.62].forEach(k=>el("path",{d:`M ${k*r*.55} ${-r*.8} Q ${k*r*1.35} 0 ${k*r*.55} ${r*.8}`,stroke:dark,"stroke-width":Math.max(1,r*.06),fill:"none",opacity:.55},g));
  el("ellipse",{cx:-r*.38,cy:-r*.35,rx:r*.22,ry:r*.14,fill:"#fff",opacity:.45,transform:`rotate(-30 ${-r*.38} ${-r*.35})`},g);
  // sépalas
  const sg=el("g",{transform:`translate(0 ${-r*.8})`},g);
  for(let i=0;i<5;i++)el("path",{d:`M0 0 L${-r*.12} ${-r*.32} L${r*.12} ${-r*.32} Z`,fill:"#3f8f2a",transform:`rotate(${-80+i*40})`},sg);
  if(opt.face){
    el("circle",{cx:-r*.3,cy:r*.02,r:r*.1,fill:"#2b0a05"},g);el("circle",{cx:r*.3,cy:r*.02,r:r*.1,fill:"#2b0a05"},g);
    el("circle",{cx:-r*.27,cy:-r*.02,r:r*.035,fill:"#fff"},g);el("circle",{cx:r*.33,cy:-r*.02,r:r*.035,fill:"#fff"},g);
    el("path",{d:`M${-r*.25} ${r*.28} Q0 ${r*.5} ${r*.25} ${r*.28}`,stroke:"#2b0a05","stroke-width":r*.07,fill:"none","stroke-linecap":"round"},g);
    el("circle",{cx:-r*.55,cy:r*.25,r:r*.11,fill:"#ff9a8a",opacity:.7},g);el("circle",{cx:r*.55,cy:r*.25,r:r*.11,fill:"#ff9a8a",opacity:.7},g);
  }
  return g}
function flor(x,y,r){const g=el("g",{transform:`translate(${x} ${y})`},deco);
  for(let i=0;i<5;i++)el("ellipse",{cx:0,cy:-r*.6,rx:r*.38,ry:r*.6,fill:"#fff",stroke:"#e7e2c9","stroke-width":1,transform:`rotate(${i*72})`},g);
  el("circle",{r:r*.3,fill:"#ffd23f"},g);return g}
// pitangas nas copas das árvores (pitangueiras)
[[90,445,10],[135,425,9],[150,470,11],[70,480,8],[110,400,7]].forEach(([x,y,r],i)=>pitanga(x,y,r,{ripe:i!==2}));
[[380,445,9],[412,470,8],[370,480,7]].forEach(([x,y,r],i)=>pitanga(x,y,r,{ripe:i!==1}));
[[880,390,10],[930,415,9],[905,365,8],[945,385,7]].forEach(([x,y,r],i)=>pitanga(x,y,r,{ripe:i!==3}));
[[125,450],[85,415],[395,455],[900,400],[935,360]].forEach(([x,y])=>flor(x,y,6));
// mascotes de pitanga
pitanga(625,640,34,{face:true});
pitanga(612,420,40,{face:true});
// cestinha de pitangas
const cesta=el("g",{transform:"translate(170 655)"},deco);
[[-28,-20,14],[0,-26,15],[28,-20,14],[-14,-36,13],[14,-36,13]].forEach(([x,y,r])=>pitanga(x,y,r,{parent:cesta}));
el("path",{d:"M-48 -10 L48 -10 L38 30 L-38 30 Z",fill:"#c98a3e",stroke:"#7a4a17","stroke-width":3},cesta);
[-2,10,22].forEach(y=>el("line",{x1:-44,y1:y,x2:44,y2:y,stroke:"#7a4a17","stroke-width":2,opacity:.6},cesta));
el("path",{d:"M-44 -10 Q0 -70 44 -10",stroke:"#7a4a17","stroke-width":5,fill:"none"},cesta);
// galhinho de pitangueira no canto
const galho=el("g",{transform:"translate(955 250)"},deco);
el("path",{d:"M30 -40 Q0 -10 -10 30",stroke:"#8a5a2b","stroke-width":6,fill:"none","stroke-linecap":"round"},galho);
[[-14,-14,"-40"],[14,6,"35"],[-4,-34,"-20"]].forEach(([x,y,a])=>el("ellipse",{cx:x,cy:y,rx:16,ry:7,fill:"#3f8f2a",transform:`rotate(${a} ${x} ${y})`},galho));
[[-14,40,13],[6,44,11]].forEach(([x,y,r])=>pitanga(x,y,r,{parent:galho}));
[[60,680,"#5aaa2f"],[960,690,"#5aaa2f"]].forEach(([x,y,c])=>el("ellipse",{cx:x,cy:y,rx:80,ry:40,fill:c,transform:`rotate(-25 ${x} ${y})`},deco));

// casas ao longo do caminho
const track=document.getElementById("track");const L=track.getTotalLength();
const pts=[];for(let i=0;i<N;i++){const p=track.getPointAtLength(L*i/(N-1));pts.push({x:p.x,y:p.y})}
const cells=document.getElementById("cells");const cellEls=[];
// perguntas: [pergunta, [opções], índice da correta]
const QUESTIONS=[
 ["Quais são os dois recursos que as flores oferecem aos polinizadores?",["Néctar e pólen","Seiva e pólen","Néctar e sementes","Água e néctar"],0],
 ["O que é polinização?",["O transporte do pólen até a parte feminina da flor","A queda das pétalas depois que a flor murcha","A absorção de água e nutrientes pelas raízes","O transporte das sementes para longe da árvore"],0],
 ["Em que estação do ano a pitangueira costuma florir no Brasil?",["Primavera","Verão","Outono","Inverno"],0],
 ["Por que a polinização é essencial para a produção de frutos?",["Porque, sem ela, a flor não é fecundada e não forma o fruto","Porque ela deixa as folhas mais verdes e fortes","Porque ela faz a raiz crescer mais funda","Porque ela protege a flor do sol forte"],0],
 ["Por que os dias ensolarados favorecem a polinização?",["As flores abrem e os insetos voam mais no calor","O sol produz o pólen dentro da flor","O sol seca o néctar e as abelhas ficam com mais sede","No sol, o vento leva as abelhas para longe"],0],
 ["A pitangueira é uma planta nativa ou trazida de outro país?",["Nativa do Brasil","Trazida da África","Trazida da Ásia","Trazida da Europa"],0],
 ["O que são furtadores de néctar e por que não ajudam na polinização?",["Animais que pegam o néctar furando a flor, sem tocar no pólen","Animais que levam o pólen para flores de outra espécie","Animais que comem as pétalas antes de a flor abrir","Animais que guardam o néctar na colmeia por muito tempo"],0],
 ["A pitangueira perde as folhas no inverno?",["Não, ela mantém as folhas o ano todo","Sim, perde todas as folhas no inverno","Sim, mas só nos anos de muita chuva","Só perde as folhas depois de dar frutos"],0],
 ["Como as sementes da pitanga são espalhadas na natureza?",["Por pássaros e outros animais que comem a fruta","Pelo vento, porque as sementes são muito leves","Pela água da chuva, que leva as sementes no rio","Pelas abelhas, que carregam as sementes nas patas"],0],
 ["Qual a diferença entre flor e fruto?",["A flor vem antes; o fruto se forma depois, com as sementes","O fruto vem antes; a flor nasce de dentro dele","A flor guarda as sementes; o fruto produz o pólen","Não há diferença: são nomes para a mesma parte"],0],
 ["Por que as flores têm cheiro e cores atraentes?",["Para atrair os polinizadores","Para se proteger do frio","Para espantar os insetos","Para guardar mais água"],0],
 ["O que acontece com a natureza se faltarem as abelhas?",["Muitas plantas deixam de formar frutos e sementes","As plantas passam a dar mais frutos sozinhas","As flores ficam maiores e mais coloridas","Nada muda, pois só o vento faz a polinização"],0],
 ["Qual é a lição mais importante que a polinização nos ensina?",["Plantas e animais dependem uns dos outros","As plantas não precisam de ajuda para viver","Os insetos atrapalham o crescimento das plantas","Só as árvores grandes são importantes"],0],
 ["Qual é a cor das flores da pitangueira?",["Brancas","Amarelas","Rosadas","Lilases"],0],
 ["Qual é a parte da flor que produz o pólen?",["Estame (antera)","Pétala","Sépala","Estigma"],0],
 ["Por que as abelhas pousam de flor em flor?",["Para coletar néctar e pólen, e assim levam pólen entre as flores","Para descansar as asas entre um voo e outro","Para fugir dos pássaros que querem comê-las","Para deixar seus ovos dentro das flores"],0],
 ["O que é florescimento?",["O período em que a planta produz flores","O período em que a planta perde as folhas","O momento em que a semente começa a germinar","O momento em que o fruto cai da árvore"],0],
 ["O que acontece se ninguém visitar as flores da pitangueira?",["Poucas ou nenhuma pitanga vai se formar","Nascem pitangas maiores e mais doces","As flores duram para sempre na árvore","A árvore produz mais folhas no lugar"],0],
 ["O que é um polinizador?",["Um animal que leva o pólen de uma flor para outra","Um animal que come as folhas das plantas","Um animal que enterra as sementes no solo","Um animal que vive dentro do tronco das árvores"],0],
 ["O que acontece com os insetos quando as árvores são cortadas?",["Perdem abrigo e alimento, e muitos desaparecem do lugar","Ficam mais fortes, porque há mais sol","Passam a viver melhor nas cidades","Nada acontece, pois eles não dependem das árvores"],0],
 ["O que cada um de nós pode fazer para ajudar a polinização?",["Plantar flores e árvores nativas e evitar venenos","Retirar as colmeias de perto das casas","Cortar as flores para que a árvore cresça mais","Usar inseticida para proteger as plantas"],0],
 ["Qual é a cor do pólen da pitangueira?",["Amarelo-claro","Vermelho","Verde","Roxo"],0],
 ["Onde a abelha guarda o pólen que coleta?",["Nas patas de trás, numa espécie de cestinha","Dentro da boca, até chegar à colmeia","Nas antenas, grudado nos pelinhos","Embaixo das asas, num bolsinho"],0],
 ["O que é fruto maduro?",["O fruto pronto para comer, com sementes formadas","O fruto que ainda está verde e duro","O fruto que caiu antes do tempo","O fruto que ainda não tem sementes"],0],
 ["O que é dispersão de sementes?",["O espalhamento das sementes para longe da planta-mãe","A transformação da flor em fruto","O transporte do pólen entre as flores","O crescimento da raiz dentro do solo"],0],
 ["Qual o principal polinizador da pitangueira?",["Abelhas","Borboletas","Beija-flores","Morcegos"],0],
 ["A pitanga é nativa de qual país?",["Brasil","Argentina","México","Portugal"],0],
 ["As abelhas trabalham de dia ou de noite?",["De dia","De noite","Só ao amanhecer","Só ao entardecer"],0],
];
let deck=[];function nextQ(){if(!deck.length)deck=QUESTIONS.map((_,i)=>i).sort(()=>Math.random()-.5);return QUESTIONS[deck.pop()]}
function paintCell(i,color){const c=cellEls[i];if(!c)return;c.setAttribute("fill",color);c.classList.remove("pop");void c.getBoundingClientRect();c.classList.add("pop")}
function ask(pi){return new Promise(res=>{
  const [q,rawOpts,rawOk]=nextQ();const P=PLAYERS[pi];
  const order=rawOpts.map((_,i)=>i).sort(()=>Math.random()-.5);
  const opts=order.map(i=>rawOpts[i]);const ok=order.indexOf(rawOk);
  document.getElementById("qtok").textContent=P.icon;document.getElementById("qtok").style.background=P.color;
  document.getElementById("qwho").textContent=`${P.name}, casa ${pos[pi]}`;
  document.getElementById("qtext").textContent=q;document.getElementById("qfb").textContent="";
  const box=document.getElementById("opts");box.innerHTML="";
  opts.forEach((t,k)=>{const b=document.createElement("button");b.id="opt"+k;b.textContent=t;
    b.onclick=async()=>{box.querySelectorAll("button").forEach(x=>x.disabled=true);
      const right=k===ok;b.classList.add(right?"ok":"no");if(!right)box.children[ok].classList.add("ok");
      document.getElementById("qfb").textContent=right?"Acertou! 🎉 Ganhou uma pitanga!":`Ops! A resposta era "${opts[ok]}". Volta para onde estava.`;
      await wait(1600);document.getElementById("quiz").hidden=true;res(right)};
    box.appendChild(b)});
  document.getElementById("quiz").hidden=false;box.children[0].focus();
})}
pts.forEach((p,i)=>{
  if(i===0||i===N-1){
    const g=el("g",{transform:`translate(${p.x} ${p.y})`},cells);
    el("circle",{r:40,fill:i?"var(--sun)":"#fff",stroke:"var(--ink)","stroke-width":4},g);
    const t=el("text",{"text-anchor":"middle",y:i?8:7,"font-family":"Baloo 2, sans-serif","font-weight":800,"font-size":i?22:20,fill:"var(--ink)"},g);
    t.textContent=i?"FIM":"INÍCIO";if(!i)t.setAttribute("font-size",16);
    return}
  const sp=SPECIAL[i];
  cellEls[i]=el("circle",{cx:p.x,cy:p.y,r:24,fill:sp?"#fff3c4":"#fff",stroke:"var(--ink)","stroke-width":3,class:"cell",style:`transform-box:fill-box;transform-origin:center`},cells);
  cellEls[i].dataset.base=sp?"#fff3c4":"#fff";
  const t=el("text",{x:p.x,y:p.y+(sp?9:8),"text-anchor":"middle","font-family":"Baloo 2, sans-serif","font-weight":800,"font-size":sp?24:22,fill:"var(--ink)"},cells);
  t.textContent=sp?ICON[sp]:i;
});

// estado
let count=2,pos=[],skip=[],pts2=[],turn=0,busy=false,over=false;
const piecesG=document.getElementById("pieces");let pieceEls=[];
const OFF=[[-14,-14],[14,-14],[-14,14],[14,14]];
function placePiece(i){const p=pts[pos[i]];const[o1,o2]=OFF[i];pieceEls[i].setAttribute("transform",`translate(${p.x+o1} ${p.y+o2})`)}
function renderPlayers(){
  const ul=document.getElementById("players");ul.innerHTML="";
  for(let i=0;i<count;i++){const P=PLAYERS[i];const li=document.createElement("li");if(i===turn&&!over)li.className="turn";
    const tk=document.createElement("span");tk.className="tok";tk.style.background=P.color;tk.textContent=P.icon;
    const nm=document.createElement("span");nm.textContent=P.name+(skip[i]?" 🕸️":"");
    const ps=document.createElement("span");ps.className="pos";ps.textContent=pos[i]===N-1?"FIM":pos[i]===0?"início":"casa "+pos[i];
    li.append(tk,nm,ps);ul.appendChild(li)}
  renderScore();
}
function renderScore(){
  const ol=document.getElementById("score");ol.innerHTML="";const max=Math.max(...pts2);
  const leaders=pts2.filter(v=>v===max).length;
  PLAYERS.forEach((P,i)=>{const li=document.createElement("li");if(max>0&&pts2[i]===max&&leaders===1)li.className="lead";
    const tk=document.createElement("span");tk.className="tok";tk.style.background=P.color;tk.textContent=P.icon;
    const nm=document.createElement("span");nm.className="nm";nm.textContent=P.name;
    const pt=document.createElement("span");pt.className="pts";const b=document.createElement("span");b.className="pitanga";
    pt.append(b,document.createTextNode(pts2[i]));li.append(tk,nm,pt);ol.appendChild(li)});
}
function setDie(n){const d=document.getElementById("die");d.innerHTML="";const map={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
  for(let k=0;k<9;k++){const s=document.createElement("span");if(map[n].includes(k))s.style.visibility="visible";d.appendChild(s)}d.setAttribute("aria-label","Dado: "+n)}
const msg=t=>document.getElementById("msg").textContent=t;
function start(){
  pos=Array(count).fill(0);skip=Array(count).fill(false);pts2=Array(count).fill(0);turn=0;over=false;busy=false;
  piecesG.innerHTML="";pieceEls=[];
  cellEls.forEach(c=>c&&c.setAttribute("fill",c.dataset.base));document.getElementById("quiz").hidden=true;
  for(let i=0;i<count;i++){const g=el("g",{class:"piece"},piecesG);
    el("circle",{r:17,fill:PLAYERS[i].color,stroke:"var(--ink)","stroke-width":3},g);
    const t=el("text",{"text-anchor":"middle",y:7,"font-size":19},g);t.textContent=PLAYERS[i].icon;
    pieceEls.push(g);placePiece(i)}
  document.getElementById("win").hidden=true;document.getElementById("roll").disabled=false;
  setDie(1);renderPlayers();msg(`Vez de ${PLAYERS[0].name}. Jogue o dado!`);
}
const wait=ms=>new Promise(r=>setTimeout(r,matchMedia("(prefers-reduced-motion:reduce)").matches?Math.min(ms,60):ms));
async function walk(i,steps){const dir=Math.sign(steps);for(let s=0;s<Math.abs(steps);s++){pos[i]=Math.max(0,Math.min(N-1,pos[i]+dir));placePiece(i);await wait(280);if(pos[i]===N-1)break}}
async function roll(){
  if(busy||over)return;busy=true;const btn=document.getElementById("roll");btn.disabled=true;
  const d=document.getElementById("die");d.classList.remove("rolling");void d.offsetWidth;d.classList.add("rolling");
  for(let k=0;k<6;k++){setDie(1+Math.floor(Math.random()*6));await wait(80)}
  const n=1+Math.floor(Math.random()*6);setDie(n);
  const P=PLAYERS[turn];msg(`${P.name} tirou ${n}!`);
  const from=pos[turn];
  await walk(turn,n);let again=false;
  if(pos[turn]<N-1){
    paintCell(pos[turn],P.color);await wait(350);
    const right=await ask(turn);
    if(!right){msg(`${P.name} errou e volta para ${from?"a casa "+from:"o início"}.`);await walk(turn,from-pos[turn])}
    const sp=right?SPECIAL[pos[turn]]:null;
    if(right){pts2[turn]++;renderScore();msg(`${P.name} acertou, ganhou uma pitanga e fica na casa ${pos[turn]}!`)}
    if(sp==="flor"){msg(`🌼 ${P.name} achou uma flor e avança 2!`);await wait(500);await walk(turn,2);if(pos[turn]<N-1)paintCell(pos[turn],P.color)}
    else if(sp==="chuva"){msg(`🌧️ Choveu! ${P.name} volta 2 casas.`);await wait(500);await walk(turn,-2);if(pos[turn]>0)paintCell(pos[turn],P.color)}
    else if(sp==="mel"){msg(`🍯 Mel! ${P.name} joga de novo.`);again=true}
    else if(sp==="teia"){msg(`🕸️ ${P.name} ficou presa na teia e perde a próxima vez.`);skip[turn]=true}}
  if(pos[turn]===N-1){over=true;renderPlayers();msg(`${P.name} venceu!`);
    document.getElementById("winTok").textContent=P.icon;document.getElementById("winTitle").textContent=`${P.name} venceu!`;document.getElementById("winTxt").textContent=`Chegou à flor com ${pts2[turn]} pitanga${pts2[turn]===1?"":"s"} colhida${pts2[turn]===1?"":"s"}!`;
    await wait(400);document.getElementById("win").hidden=false;busy=false;return}
  if(!again){let note="";
    do{turn=(turn+1)%count;if(skip[turn]){skip[turn]=false;note+=`${PLAYERS[turn].name} perdeu a vez. `}else break}while(true);
    await wait(700);msg(note+`Vez de ${PLAYERS[turn].name}.`)}
  renderPlayers();busy=false;btn.disabled=false;
}
document.getElementById("roll").onclick=roll;
document.getElementById("reset").onclick=start;
document.getElementById("again").onclick=start;
// tela de escolha dos jogadores
let names=["","","",""],picks=[0,1,2,3];
function renderSetup(){
  const box=document.getElementById("prows");box.innerHTML="";
  for(let i=0;i<count;i++){
    const row=document.createElement("div");row.className="prow";
    const lb=document.createElement("label");lb.htmlFor="name"+i;lb.textContent="Jogador "+(i+1);
    const inp=document.createElement("input");inp.id="name"+i;inp.maxLength=14;inp.placeholder="Digite o nome";inp.value=names[i];inp.autocomplete="off";
    inp.oninput=()=>names[i]=inp.value;
    inp.onkeydown=e=>{if(e.key==="Enter"){const nx=document.getElementById("name"+(i+1));nx?nx.focus():document.getElementById("go").click()}};
    const ch=document.createElement("div");ch.className="chars";ch.setAttribute("role","group");ch.setAttribute("aria-label","Personagem do jogador "+(i+1));
    CHARS.forEach((c,k)=>{const b=document.createElement("button");b.type="button";b.id=`c${i}_${k}`;b.textContent=c.icon;b.title=c.name;b.setAttribute("aria-label",c.name);
      b.style.background=c.color;b.setAttribute("aria-pressed",picks[i]===k);
      b.disabled=picks.slice(0,count).some((p,j)=>j!==i&&p===k);
      b.onclick=()=>{picks[i]=k;renderSetup();document.getElementById(`c${i}_${k}`).focus()};ch.appendChild(b)});
    row.append(lb,inp,ch);box.appendChild(row)}
}
function setCount(n){count=n;[2,3,4].forEach(m=>document.getElementById("q"+m).setAttribute("aria-pressed",m===n));
  // evita personagem repetido ao aumentar o número de jogadores
  for(let i=0;i<n;i++){if(picks.slice(0,i).includes(picks[i]))picks[i]=CHARS.findIndex((_,k)=>!picks.slice(0,i).includes(k))}
  renderSetup()}
[2,3,4].forEach(n=>document.getElementById("q"+n).onclick=()=>setCount(n));
function buildPlayers(){PLAYERS=[];for(let i=0;i<count;i++){const c=CHARS[picks[i]];const nm=names[i].trim();PLAYERS.push({...c,name:nm||c.name})}}
document.getElementById("go").onclick=()=>{buildPlayers();document.getElementById("setup").hidden=true;start()};
const showCount=()=>{document.getElementById("setup").hidden=true;document.getElementById("countScr").hidden=false;document.getElementById("n"+count).focus()};
[2,3,4].forEach(n=>document.getElementById("n"+n).onclick=()=>{setCount(n);document.getElementById("countScr").hidden=true;document.getElementById("setup").hidden=false;document.getElementById("name0").focus()});
document.getElementById("backCount").onclick=showCount;
document.getElementById("change").onclick=()=>{if(busy)return;showCount()};
setCount(2);buildPlayers();start();
document.getElementById("play").onclick=()=>{document.getElementById("cover").hidden=true;showCount()};