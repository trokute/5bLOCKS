<script>
import { onMount } from 'svelte'

const POOL={'102':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30"><path fill="#FFAD04" stroke="none" d="M 0 0L 0 30 30 30 30 0 Z"/></svg>','21':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30"><path fill="#000000" stroke="none" d="M 0 18.75L 0 26.25 30 22.5 0 18.75M 0 26.25L 0 30 30 30 0 26.25M 0 0L 0 3.75 30 0 0 0M 0 3.75L 0 11.25 30 7.5 0 3.75M 0 11.25L 0 18.75 30 15 0 11.25 Z"/></svg>','89':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30"><path fill="#707070" stroke="none" d="M 20 6.05L 17.5 6.05 17.5 0 12.5 0 12.5 6.05 10 6.05 10 11.05 12.5 11.05 12.5 21.05 10 21.05 10 26.05 12.5 26.05 12.5 30 17.5 30 17.5 26.05 20 26.05 20 21.05 17.5 21.05 17.5 11.05 20 11.05 20 6.05 Z"/></svg>','42':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30"><path fill="#303030" stroke="none" d="M 0 0L 0 30 30 30 30 0 Z"/><path fill="#202020" stroke="none" d="M 30 7.3L 30 0 0 0 0 7.4 3.6 10 8.2 7.5 14.15 13 20.8 4.55 25.5 9.45 30 7.3 Z"/><path fill="#101010" stroke="none" d="M 0 0L 30 0 30 2.4 0 2.4 Z"/></svg>','134':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="32px" height="31px" viewBox="-1 -1 32 31"><path stroke="#0066FF" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M 2 0L 0 0 0 1M 9 0L 6 0M 16 0L 13 0M 23 0L 20 0M 30 3L 30 0 27 0M 30 10L 30 10M 23 10L 26 10M 16 10L 19 10M 9 10L 12 10M 2 10L 5 10M 0 5L 0 8"/></svg>','34':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="32px" height="32px" viewBox="-1 -1 32 32"><path stroke="#D5AA00" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M 29.6 18.05L 29.6 15.05M 29.6 11.05L 29.6 8.05M 29.55 4.15Q 29.3 2.45 28.3 1.55M 24.5 0.4L 21.5 0.4M 0.4 13.1L 0.4 16.1M 17.5 0.4L 14.5 0.4M 10.5 0.4L 7.5 0.4M 3.55 0.6Q 1.95 1 1.15 2.2M 0.4 6.1L 0.4 9.1M 0.4 20.1L 0.4 23.1M 0.8 27.05Q 1.35 28.55 2.85 29.15M 6.8 29.6L 9.8 29.6M 13.8 29.6L 16.8 29.6M 20.8 29.6L 23.8 29.6M 27.7 28.95Q 29 28.15 29.4 26.5M 29.6 25.05L 29.6 22.05"/></svg>','55':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30"><path fill="#303030" stroke="none" d="M 30 30L 30 0 0 0 0 30 30 30 Z"/><path fill="#181818" stroke="none" d="M 1.4 27.95L 5 28.95 2.4 25.4 1.4 27.95 Z"/><path fill="#655B3A" stroke="none" d="M 15.1 24L 19.5 19.15 15.1 20.75 15.1 24 Z"/><path fill="#505050" stroke="none" d="M 12.65 3.45L 10.5 7.9 5.9 6.35 3.8 9.6 7.75 10.05 8.6 12.85 14.85 8.15 12.65 3.45 Z"/><path fill="#61413F" stroke="none" d="M 23.75 2.6L 22.4 5.4 25.05 8.05 20.85 9.35 28 9.7 26.1 5.75 26.9 4.4 23.75 2.6 Z"/><path fill="#FFFFFF" fill-opacity="0.4980392156862745" stroke="none" d="M 30 -0.05L 0 -0.05 0 9.95 30 9.95 30 -0.05 Z"/><path fill="#FFFFFF" stroke="none" d="M 30 3L 30 0 0 0 0 3 30 3 Z"/></svg>','78':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="32px" height="32px" viewBox="-1 -1 32 32"><path id="Layer0_0_1_STROKES" stroke="#FFCC00" stroke-width="1" stroke-linejoin="round" stroke-linecap="round" fill="none" d="M 24.65 3.15L 22.05 4.75M 29.25 0.9L 29.75 0 28.05 1.05M 25.65 6.9L 27.15 4.3M 23.25 12.4L 22.45 12.1 23.55 10.3M 29.75 15L 26.95 13.9M 25.65 23.25L 24.15 20.65M 23.05 17.65L 25.85 16.55M 18.65 6.85L 17.75 7.35 17.05 5.55M 15.6 1.8L 14.9 0.1 14.5 1.2M 13 4.9L 12 7.35 11.7 7.15M 8.3 5.05L 5.7 3.5M 2.3 1.4L 0 0M 2.25 3.7L 3.75 6.3M 5.85 9.7L 7.25 12.1M 5.9 20.05L 4.4 22.65M 3.15 16.25L 5.95 17.35M 3.35 13.7L 0.6 14.8M 15.5 28.35L 16.6 25.55M 12.9 24.85L 14 27.65M 2.2 28.6L 4.8 27M 2.3 26.05L 0.8 28.6M 29.35 29.3L 27.75 26.7M 24.45 26.65L 27.05 28.2M 18.45 22.95L 21.05 24.55M 8.2 24.9L 10.8 23.3"/></svg>','0':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30"><defs><g id="Layer1_0_FILL"><path fill="#00FFFF" fill-opacity="0.5019607843137255" stroke="none" d="M 0 0L 0 30 30 30 30 0 0 0 Z"/></g><g id="Layer0_0_FILL"><path fill="#000000" stroke="none" d="M 26.7 12.2Q 26.7 11.25 26.2 10.55 25.75 9.8 24.95 9.5 24.2 9.2 22.45 9.2L 17.9 9.2 17.9 19.95 20.05 19.95 20.05 15.45 20.5 15.45Q 21.25 15.45 21.6 15.6 21.95 15.7 22.25 16.05 22.55 16.35 23.4 17.6L 24.95 19.95 27.55 19.95 26.25 17.85Q 25.45 16.6 25 16.1 24.55 15.6 23.85 15.2 25.25 15 25.95 14.2 26.7 13.45 26.7 12.2M 23.35 11.05Q 23.85 11.15 24.15 11.5 24.45 11.8 24.45 12.35 24.45 12.85 24.25 13.15 24 13.5 23.6 13.6 23.25 13.75 21.65 13.75L 20.05 13.75 20.05 11.05 23.35 11.05M 15.85 9.2L 13.7 9.2 13.7 19.95 15.85 19.95 15.85 9.2M 8.3 9.2L 6.05 9.2 1.85 19.95 4.15 19.95 5.05 17.5 9.35 17.5 10.25 19.95 12.6 19.95 8.3 9.2M 8.65 15.7L 5.7 15.7 7.15 11.7 8.65 15.7 Z"/></g></defs><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#Layer1_0_FILL"/></g><g transform="matrix( 1, 0, 0, 1, 0,0) "><use xlink:href="#Layer0_0_FILL"/></g></svg>','50':'<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="30px" height="30px" viewBox="0 0 30 30"><path fill="#CCCCCC" fill-opacity="0.37" stroke="none" d="M 5.35 13.65L 2.5 18.55 4.95 30 9.9 30 5.35 13.65M 19 13.35L 13.6 15.15 12.4 24.5 14.1 30 15.05 30 19.05 13.45 19.1 13.3 19 13.35 Z"/><path fill="#999999" fill-opacity="0.37" stroke="none" d="M 9.7 15.85L 5.35 13.65 9.9 30 14.1 30 12.4 24.5 9.7 15.85M 24.5 21.05L 23.05 21.05 18.85 26.15Q 20.05 21.75 21.1 15.85L 19.05 13.45 15.05 30 18.55 30 24.5 21.05 Z"/><path fill="#666666" fill-opacity="0.37" stroke="none" d="M 27.6 24L 25 21.05 24.5 21.05 18.55 30 22.3 30 27.6 24 Z"/><path fill="#333333" stroke="none" d="M 26.25 30.1Q 27 30.1 27.55 29.55 28.1 29.05 28.15 28.4 28.1 27.7 27.55 27.15 27 26.65 26.25 26.65 25.45 26.65 24.9 27.15 24.35 27.7 24.35 28.4L 24.4 28.8 24.15 28.75Q 23.85 28.7 23.6 28.95L 23.4 29.65 23.6 30.25 24.15 30.55 24.6 30.25 24.9 29.65 24.9 29.55Q 25.45 30.1 26.25 30.1M 4.25 29.85L 4.6 29.1 4.25 28.2Q 3.95 27.9 3.45 27.9 2.95 27.9 2.6 28.2 2.3 28.6 2.3 29.1 2.3 29.55 2.6 29.85 2.95 30.25 3.45 30.25 3.95 30.25 4.25 29.85M 16.7 30.05Q 17.1 29.6 16.95 28.95 16.9 28.3 16.35 27.75 15.8 27.2 15.05 27.05 14.5 27 14.1 27.4 13.65 27.8 13.7 28.45 13.85 29.1 14.45 29.7 14.95 30.2 15.55 30.3 16.3 30.45 16.7 30.05 Z"/></svg>'}
const IDS=Object.keys(POOL)
const IMG={}
for(const k of IDS){const im=new Image();im.src='data:image/svg+xml,'+encodeURIComponent(POOL[k]);IMG[k]=im}
const FONT="'Shag Lounge', Helvetica, sans-serif"

let cv,cx
let W=0,H=0,DPR=1
const rows=6,cols=5
let tray=[],answer=[],board=[],colors=[],curRow=0,curCol=0,state='play'
let fillGrid=[],fillN=0,fillTotal=0,fillWait=0,fillWin=false
let toast=0
let mx=0,my=0,mdown=false,mpressed=false,plastX=0,plastY=0
let cellSize=64,gap=10
let raf

function shuf(a){
	a=a.slice()
	for(let i=a.length-1;i>0;i--){
		const j=Math.floor(Math.random()*(i+1))
		const t=a[i];a[i]=a[j];a[j]=t
	}
	return a
}
function pTray(){return shuf(IDS).slice(0,5)}
function pAns(){
	const a=[]
	for(let i=0;i<cols;i++)a.push(tray[Math.floor(Math.random()*tray.length)])
	return a
}
function nGame(){
	tray=pTray()
	answer=pAns()
	board=[];colors=[]
	for(let r=0;r<rows;r++){
		board.push(new Array(cols).fill(null))
		colors.push(new Array(cols).fill(0))
	}
	curRow=0;curCol=0
	state='play'
}
function sRow(){
	const guess=board[curRow]
	const rc=new Array(cols).fill(1)
	const counts={}
	for(const id of answer)counts[id]=(counts[id]||0)+1
	for(let i=0;i<cols;i++){
		if(guess[i]===answer[i]){rc[i]=3;counts[guess[i]]--}
	}
	for(let i=0;i<cols;i++){
		if(rc[i]!==3&&counts[guess[i]]>0){rc[i]=2;counts[guess[i]]--}
	}
	colors[curRow]=rc
	const win=rc.every(v=>v===3)
	curRow++
	if(win)sFill(true)
	else if(curRow>=rows)sFill(false)
	else curCol=0
}
function sFill(win){
	state='fill'
	fillWin=win
	const s=Math.max(28,Math.min(48,Math.floor(Math.min(W,H)/16)))
	const fc=Math.ceil(W/s),fr=Math.ceil(H/s)
	fillGrid=[]
	for(let y=0;y<fr;y++)for(let x=0;x<fc;x++)fillGrid.push({x:x*s,y:y*s,s:s,id:IDS[Math.floor(Math.random()*IDS.length)]})
	fillGrid=shuf(fillGrid)
	fillN=0;fillTotal=fillGrid.length;fillWait=0
}
function sText(){
	const lines=[]
	lines.push('5bLOCKS '+(fillWin?curRow:'X')+'/'+rows)
	for(let r=0;r<curRow;r++){
		let line=''
		for(let c=0;c<cols;c++){
			const sym=colors[r][c]===3?'#':colors[r][c]===2?'+':'.'
			line+=board[r][c]+sym+' '
		}
		lines.push(line.trim())
	}
	lines.push('ANSWER '+answer.join(' '))
	return lines.join('\n')
}
function ePos(e){
	const rc=cv.getBoundingClientRect()
	const t=e.touches&&e.touches[0]?e.touches[0]:e
	return{x:t.clientX-rc.left,y:t.clientY-rc.top}
}
function onR(px,py,x,y,w,h){return px>=x&&px<x+w&&py>=y&&py<y+h}
function rsz(){
	W=window.innerWidth;H=window.innerHeight
	DPR=Math.min(window.devicePixelRatio||1,2)
	cv.width=W*DPR;cv.height=H*DPR
	cv.style.width=W+'px';cv.style.height=H+'px'
	cx.setTransform(DPR,0,0,DPR,0,0)
}
function lyt(){
	cellSize=Math.max(38,Math.min(64,Math.floor((Math.min(W*0.86,cols*74))/cols)))
	gap=Math.floor(cellSize*0.16)
}
function dTile(id,x,y,s,tint){
	cx.fillStyle=tint||'#4d4d4d'
	cx.fillRect(x,y,s,s)
	cx.lineWidth=2
	cx.strokeStyle='#2b2b2b'
	cx.strokeRect(x,y,s,s)
	if(id!==null){
		const im=IMG[id]
		const pad=s*0.16
		if(im.complete)cx.drawImage(im,x+pad,y+pad,s-pad*2,s-pad*2)
	}
}
function dPlay(){
	lyt()
	const gridW=cols*cellSize+(cols-1)*gap
	const gridH=rows*cellSize+(rows-1)*gap
	const gx=(W-gridW)/2
	const gy=Math.max(70,H*0.14)
	cx.fillStyle='#404040'
	cx.fillRect(0,0,W,H)
	cx.font='bold 24px '+FONT
	cx.fillStyle='#e6e6e6'
	const title='5bLOCKS'
	const tw=cx.measureText(title).width
	cx.textBaseline='top'
	cx.fillText(title,(W-tw)/2,24)
	for(let r=0;r<rows;r++){
		for(let c=0;c<cols;c++){
			const x=gx+c*(cellSize+gap)
			const y=gy+r*(cellSize+gap)
			let tint='#4d4d4d'
			const v=colors[r][c]
			if(v===3)tint='#47cb46'
			else if(v===2)tint='#ffe000'
			else if(v===1)tint='#5a5a5a'
			dTile(board[r][c],x,y,cellSize,tint)
		}
	}
	const trayS=cellSize
	const trayW=5*trayS+4*gap
	const tx=(W-trayW)/2
	const ty=gy+gridH+40
	const trayHit=[]
	for(let i=0;i<5;i++){
		const x=tx+i*(trayS+gap)
		const y=ty
		let bg='#585858'
		if(onR(mx,my,x,y,trayS,trayS))bg=mdown?'#454545':'#6e6e6e'
		dTile(tray[i],x,y,trayS,bg)
		trayHit.push({x,y,s:trayS,id:tray[i]})
	}
	const by=ty+trayS+30
	const bw=140,bh=44
	const bx1=(W-bw*2-20)/2
	const bx2=bx1+bw+20
	const canSubmit=curCol===cols
	let ebg=canSubmit?'#404040':'#2c2c2c'
	if(canSubmit&&onR(mx,my,bx1,by,bw,bh))ebg=mdown?'#2c2c2c':'#525252'
	cx.fillStyle=ebg
	cx.fillRect(bx1,by,bw,bh)
	cx.font='bold 18px '+FONT
	cx.fillStyle=canSubmit?'#ffffff':'#777777'
	const et='ENTER'
	cx.fillText(et,bx1+(bw-cx.measureText(et).width)/2,by+(bh-18)/2)
	let dbg='#404040'
	if(curCol>0&&onR(mx,my,bx2,by,bw,bh))dbg=mdown?'#2c2c2c':'#525252'
	cx.fillStyle=dbg
	cx.fillRect(bx2,by,bw,bh)
	cx.fillStyle=curCol>0?'#ffffff':'#777777'
	const dt='DELETE'
	cx.fillText(dt,bx2+(bw-cx.measureText(dt).width)/2,by+(bh-18)/2)
	if(mpressed){
		for(const t of trayHit){
			if(onR(plastX,plastY,t.x,t.y,t.s,t.s)&&curCol<cols){
				board[curRow][curCol]=t.id;curCol++;break
			}
		}
		for(let c=0;c<cols;c++){
			const x=gx+c*(cellSize+gap)
			if(onR(plastX,plastY,x,gy+curRow*(cellSize+gap),cellSize,cellSize)&&board[curRow][c]!==null){
				curCol=c
				for(let k=c;k<cols;k++)board[curRow][k]=null
			}
		}
		if(canSubmit&&onR(plastX,plastY,bx1,by,bw,bh))sRow()
		if(curCol>0&&onR(plastX,plastY,bx2,by,bw,bh)){curCol--;board[curRow][curCol]=null}
	}
}
function dFill(){
	const speed=Math.max(6,Math.floor(fillTotal/40))
	if(fillN<fillTotal){
		fillN+=speed
		if(fillN>fillTotal)fillN=fillTotal
	}else fillWait++
	for(let i=0;i<fillN;i++){
		const g=fillGrid[i]
		const im=IMG[g.id]
		if(im.complete)cx.drawImage(im,g.x,g.y,g.s,g.s)
	}
	if(fillWait>36){
		if(fillWin)state='share'
		else nGame()
	}
}
function dShare(){
	cx.fillStyle='#404040'
	cx.fillRect(0,0,W,H)
	cx.font='bold 26px '+FONT
	cx.fillStyle='#ffffff'
	const t='SOLVED IN '+curRow+'/'+rows
	cx.textBaseline='top'
	cx.fillText(t,(W-cx.measureText(t).width)/2,60)
	const boxW=Math.min(520,W*0.86)
	const boxX=(W-boxW)/2
	const boxY=130
	const txt=sText()
	const lines=txt.split('\n')
	const lh=26
	const boxH=lines.length*lh+30
	cx.fillStyle='#2f2f2f'
	cx.fillRect(boxX,boxY,boxW,boxH)
	cx.font='16px '+FONT
	cx.fillStyle='#cfcfcf'
	for(let i=0;i<lines.length;i++){
		cx.fillText(lines[i],boxX+18,boxY+16+i*lh)
	}
	const bw=180,bh=46
	const by=boxY+boxH+30
	const bx1=(W-bw*2-20)/2
	const bx2=bx1+bw+20
	let cbg='#404040'
	if(onR(mx,my,bx1,by,bw,bh))cbg=mdown?'#2c2c2c':'#525252'
	cx.fillStyle=cbg
	cx.fillRect(bx1,by,bw,bh)
	cx.font='bold 18px '+FONT
	cx.fillStyle='#ffffff'
	const ct=toast>0?'COPIED':'COPY'
	cx.fillText(ct,bx1+(bw-cx.measureText(ct).width)/2,by+(bh-18)/2)
	let nbg='#404040'
	if(onR(mx,my,bx2,by,bw,bh))nbg=mdown?'#2c2c2c':'#525252'
	cx.fillStyle=nbg
	cx.fillRect(bx2,by,bw,bh)
	cx.fillStyle='#ffffff'
	const nt='NEW GAME'
	cx.fillText(nt,bx2+(bw-cx.measureText(nt).width)/2,by+(bh-18)/2)
	if(toast>0)toast--
	if(mpressed){
		if(onR(plastX,plastY,bx1,by,bw,bh)){
			try{navigator.clipboard.writeText(sText())}catch(err){}
			toast=60
		}
		if(onR(plastX,plastY,bx2,by,bw,bh))sFill(false)
	}
}
function frm(){
	if(state==='play')dPlay()
	else if(state==='fill')dFill()
	else if(state==='share')dShare()
	mpressed=false
	raf=requestAnimationFrame(frm)
}
onMount(()=>{
	cx=cv.getContext('2d')
	rsz()
	nGame()
	const onDown=e=>{const p=ePos(e);mx=p.x;my=p.y;mdown=true;plastX=mx;plastY=my}
	const onUp=e=>{const p=ePos(e);mx=p.x;my=p.y;mdown=false;mpressed=true}
	const onMove=e=>{const p=ePos(e);mx=p.x;my=p.y}
	const onKey=e=>{
		if(state!=='play')return
		if(e.key==='Enter'){if(curCol===cols)sRow()}
		else if(e.key==='Backspace'){if(curCol>0){curCol--;board[curRow][curCol]=null}}
	}
	cv.addEventListener('mousedown',onDown)
	cv.addEventListener('touchstart',e=>{e.preventDefault();onDown(e)},{passive:false})
	window.addEventListener('mouseup',onUp)
	window.addEventListener('touchend',onUp)
	window.addEventListener('mousemove',onMove)
	window.addEventListener('touchmove',onMove,{passive:true})
	window.addEventListener('resize',rsz)
	document.addEventListener('keydown',onKey)
	raf=requestAnimationFrame(frm)
	return()=>{
		cancelAnimationFrame(raf)
		cv.removeEventListener('mousedown',onDown)
		window.removeEventListener('mouseup',onUp)
		window.removeEventListener('touchend',onUp)
		window.removeEventListener('mousemove',onMove)
		window.removeEventListener('touchmove',onMove)
		window.removeEventListener('resize',rsz)
		document.removeEventListener('keydown',onKey)
	}
})
</script>

<canvas bind:this={cv}></canvas>

<style>
:global(html),:global(body){margin:0;padding:0;width:100%;height:100%;overflow:hidden;background:#404040}
:global(canvas){display:block;touch-action:none}
@font-face{font-family:'Shag Lounge';src:url('/ShagLounge.ttf'),url('/ShagLounge.otf')}
</style>
