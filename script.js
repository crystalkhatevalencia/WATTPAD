// Feature 1: dark/light mode (remembered)
const body=document.body,tbtn=document.getElementById('themeToggle');
function setTheme(d){body.classList.toggle('dark',d);tbtn.textContent=d?'Light mode':'Dark mode';try{localStorage.setItem('dark',d)}catch(e){}}
let saved=false;try{saved=localStorage.getItem('dark')==='true'}catch(e){}
setTheme(saved);tbtn.addEventListener('click',()=>setTheme(!body.classList.contains('dark')));
// Feature 2: like button (remembered per story)
let likes={};try{likes=JSON.parse(localStorage.getItem('likes')||'{}')}catch(e){}
document.querySelectorAll('.like').forEach(b=>{
  const id=b.dataset.id,paint=()=>{const on=!!likes[id];b.setAttribute('aria-pressed',on);b.firstChild.textContent=on?'\u2665 ':'\u2661 ';b.querySelector('span').textContent=on?'Liked':'Like'};
  paint();b.addEventListener('click',()=>{likes[id]=!likes[id];try{localStorage.setItem('likes',JSON.stringify(likes))}catch(e){}paint()});
});
// Feature 3: show/hide synopsis
document.querySelectorAll('.toggle-syn').forEach(b=>b.addEventListener('click',()=>{
  const p=b.closest('.card-body').querySelector('.synopsis'),open=p.hidden;p.hidden=!open;
  b.textContent=open?'Hide synopsis':'Show synopsis';b.setAttribute('aria-expanded',open)}));
// Feature 4: reading progress bar
const bar=document.getElementById('progress');
if(bar)addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%'});
// Feature 5: search + genre filter (library page)
const q=document.getElementById('search'),gs=document.getElementById('genre'),count=document.getElementById('count');
function filter(){if(!q)return;const t=q.value.toLowerCase().trim(),g=gs.value;let n=0;
  document.querySelectorAll('.card').forEach(c=>{const ok=(!g||c.dataset.genre===g)&&c.dataset.title.includes(t);c.hidden=!ok;if(ok)n++});
  count.textContent=n+' stor'+(n===1?'y':'ies')+' found'}
if(q){q.addEventListener('input',filter);gs.addEventListener('change',filter);filter()}
