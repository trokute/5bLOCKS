<script>
import { onMount } from 'svelte'
import { POOL } from './blocks.js'

const IDS=Object.keys(POOL)
const IMG={}
const IMGA={}
for(const k of IDS){
	const v=POOL[k]
	if(Array.isArray(v)){
		IMGA[k]=v.map(s=>{const im=new Image();im.src='data:image/svg+xml,'+encodeURIComponent(s);return im})
	}else{
		const im=new Image();im.src='data:image/svg+xml,'+encodeURIComponent(v);IMG[k]=im
	}
}
let animT=0
function curImg(id){
	const arr=IMGA[id]
	if(arr)return arr[Math.floor(animT/6)%arr.length]
	return IMG[id]
}
const FONT="'Shag Lounge', Helvetica, sans-serif"

let cv,cx
let W=0,H=0,DPR=1
let rows=6,cols=5,hardMode=false
let tray=[],answer=[],board=[],colors=[],curRow=0,curCol=0,state='play'
let fillGrid=[],fillN=0,fillTotal=0,fillWait=0,fillWin=false,fillReset=false
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
function pTray(){return shuf(IDS).slice(0,cols)}
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
	if(win)sFill('win')
	else if(curRow>=rows)sFill('lose')
	else curCol=0
}
function sFill(mode){
	state='fill'
	fillWin=mode==='win'
	fillReset=mode==='reset'
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
function dTile(g,id,x,y,s,tint,frz){
	g.fillStyle=tint||'#4d4d4d'
	g.fillRect(x,y,s,s)
	g.lineWidth=2
	g.strokeStyle='#2b2b2b'
	g.strokeRect(x,y,s,s)
	if(id!==null){
		const im=frz===undefined?curImg(id):(IMGA[id]?IMGA[id][frz%IMGA[id].length]:IMG[id])
		const pad=s*0.16
		if(im.complete)g.drawImage(im,x+pad,y+pad,s-pad*2,s-pad*2)
	}
}
function dPlay(){
	cx.fillStyle='#404040'
	cx.fillRect(0,0,W,H)
	cx.font='bold 24px '+FONT
	cx.fillStyle='#e6e6e6'
	const title='5bLOCKS'
	const tw=cx.measureText(title).width
	const titleX=(W-tw)/2
	const titleY=24
	cx.textBaseline='top'
	cx.fillText(title,titleX,titleY)
	if(mpressed&&onR(plastX,plastY,titleX,titleY,tw,26)){
		hardMode=!hardMode
		cols=hardMode?8:5
		rows=hardMode?5:6
		nGame()
		mpressed=false
		return
	}
	lyt()
	const gridW=cols*cellSize+(cols-1)*gap
	const gridH=rows*cellSize+(rows-1)*gap
	const gx=(W-gridW)/2
	const gy=Math.max(70,H*0.14)
	for(let r=0;r<rows;r++){
		for(let c=0;c<cols;c++){
			const x=gx+c*(cellSize+gap)
			const y=gy+r*(cellSize+gap)
			let tint='#4d4d4d'
			const v=colors[r][c]
			if(v===3)tint='#47cb46'
			else if(v===2)tint='#ffe000'
			else if(v===1)tint='#5a5a5a'
			dTile(cx,board[r][c],x,y,cellSize,tint)
		}
	}
	const trayS=cellSize
	const trayW=cols*trayS+(cols-1)*gap
	const tx=(W-trayW)/2
	const ty=gy+gridH+40
	const trayHit=[]
	for(let i=0;i<cols;i++){
		const x=tx+i*(trayS+gap)
		const y=ty
		let bg='#585858'
		if(onR(mx,my,x,y,trayS,trayS))bg=mdown?'#454545':'#6e6e6e'
		dTile(cx,tray[i],x,y,trayS,bg)
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
		const im=curImg(g.id)
		if(im.complete)cx.drawImage(im,g.x,g.y,g.s,g.s)
	}
	if(fillWait>36){
		if(fillReset)nGame()
		else state='share'
	}
}
function pic(){
	const s=64,gap=10
	const pr=curRow
	const gridW=cols*s+(cols-1)*gap
	const gridH=pr*s+Math.max(0,pr-1)*gap
	const padX=40,padY=40,titleH=50,gapMid=30,ansH=s
	const w=gridW+padX*2
	const h=padY+gridH+gapMid+titleH+gapMid+ansH+padY
	const oc=document.createElement('canvas')
	oc.width=w;oc.height=h
	const g=oc.getContext('2d')
	g.fillStyle='#404040'
	g.fillRect(0,0,w,h)
	let y=padY
	for(let r=0;r<pr;r++){
		for(let c=0;c<cols;c++){
			const x=padX+c*(s+gap)
			let tint='#4d4d4d'
			const v=colors[r][c]
			if(v===3)tint='#47cb46'
			else if(v===2)tint='#ffe000'
			else if(v===1)tint='#5a5a5a'
			dTile(g,board[r][c],x,y,s,tint,0)
		}
		y+=s+gap
	}
	y=padY+gridH+gapMid
	g.font='bold 28px '+FONT
	g.fillStyle='#e6e6e6'
	g.textBaseline='top'
	const title='5bLOCKS'
	const tw=g.measureText(title).width
	g.fillText(title,(w-tw)/2,y)
	y+=titleH+gapMid
	for(let c=0;c<cols;c++){
		const x=padX+c*(s+gap)
		dTile(g,answer[c],x,y,s,'#4d4d4d',0)
	}
	try{
		oc.toBlob(b=>{
			const u=URL.createObjectURL(b)
			const a=document.createElement('a')
			a.href=u
			a.download='5blocks.png'
			a.click()
			URL.revokeObjectURL(u)
		})
	}catch(err){}
}
function dShare(){
	cx.fillStyle='#404040'
	cx.fillRect(0,0,W,H)
	cx.font='bold 26px '+FONT
	cx.fillStyle='#ffffff'
	const t=fillWin?('SOLVED IN '+curRow+'/'+rows):'OUT OF TRIES'
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
	const by2=by+bh+16
	let pbg='#404040'
	if(onR(mx,my,bx1,by2,bw,bh))pbg=mdown?'#2c2c2c':'#525252'
	cx.fillStyle=pbg
	cx.fillRect(bx1,by2,bw,bh)
	cx.fillStyle='#ffffff'
	const pt='PIC'
	cx.fillText(pt,bx1+(bw-cx.measureText(pt).width)/2,by2+(bh-18)/2)
	if(toast>0)toast--
	if(mpressed){
		if(onR(plastX,plastY,bx1,by,bw,bh)){
			try{navigator.clipboard.writeText(sText())}catch(err){}
			toast=60
		}
		if(onR(plastX,plastY,bx2,by,bw,bh))sFill('reset')
		if(onR(plastX,plastY,bx1,by2,bw,bh))pic()
	}
}
function frm(){
	animT++
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
