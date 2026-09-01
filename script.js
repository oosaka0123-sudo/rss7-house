const header=document.querySelector('.header');
const button=document.querySelector('.menu-button');
const menu=document.querySelector('.mobile-menu');
const setHeader=()=>header.classList.toggle('scrolled',scrollY>40);
addEventListener('scroll',setHeader,{passive:true});setHeader();
const setMenu=open=>{menu.classList.toggle('open',open);menu.toggleAttribute('inert',!open);menu.setAttribute('aria-hidden',String(!open));button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');document.body.classList.toggle('menu-open',open);if(open)menu.querySelector('a').focus()};
button.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);button.focus()}});
const reveals=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.14});reveals.forEach(el=>observer.observe(el))}else reveals.forEach(el=>el.classList.add('visible'));
document.querySelector('#demo-form').addEventListener('submit',e=>{e.preventDefault();e.currentTarget.querySelector('.form-status').textContent='デモ確認完了：入力内容は送信・保存されていません。'});

const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress=document.querySelector('.progress');
const heroImage=document.querySelector('.hero>img');
let ticking=false;
const motionFrame=()=>{const max=document.documentElement.scrollHeight-innerHeight;const ratio=max>0?scrollY/max:0;progress.style.transform=`scaleX(${ratio})`;if(!reduceMotion&&scrollY<innerHeight)heroImage.style.translate=`0 ${scrollY*.16}px`;ticking=false};
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(motionFrame);ticking=true}},{passive:true});motionFrame();

if(matchMedia('(pointer:fine)').matches&&!reduceMotion){const cursor=document.querySelector('.cursor');let x=innerWidth/2,y=innerHeight/2,cx=x,cy=y;addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY});const cursorFrame=()=>{cx+=(x-cx)*.18;cy+=(y-cy)*.18;cursor.style.left=`${cx}px`;cursor.style.top=`${cy}px`;requestAnimationFrame(cursorFrame)};cursorFrame();document.querySelectorAll('.project,.button,.header-cta').forEach(el=>{el.addEventListener('mouseenter',()=>cursor.classList.add('active'));el.addEventListener('mouseleave',()=>cursor.classList.remove('active'))});document.querySelectorAll('.project').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const rx=(e.clientY-r.top-r.height/2)/r.height*-4;const ry=(e.clientX-r.left-r.width/2)/r.width*4;card.style.transform=`rotateX(${rx}deg) rotateY(${ry}deg)`});card.addEventListener('mouseleave',()=>card.style.transform='')})}
