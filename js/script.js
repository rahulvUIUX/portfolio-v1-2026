const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
e.target.querySelectorAll('.n').forEach(n=>{const t=+n.dataset.t;let c=0;const s=setInterval(()=>{c++;n.textContent=c;if(c>=t)clearInterval(s)},900/t)});
io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
requestAnimationFrame(()=>requestAnimationFrame(()=>{
document.querySelectorAll('.hero .rv').forEach(e=>e.classList.add('in'));
}));
const projectCards=[...document.querySelectorAll('.proj')];
const viewAllButton=document.querySelector('#viewAllProjects');
const initialProjectCount=3;
let visibleProjectCount=initialProjectCount;
function updateProjects(){
const activeTab=document.querySelector('.tab.on');
const filter=activeTab?activeTab.dataset.f:'all';
const filteredProjects=projectCards.filter(p=>filter==='all'||p.dataset.c.split(' ').includes(filter));
const visibleProjects=new Set(filteredProjects.slice(0,visibleProjectCount));
projectCards.forEach(p=>{p.hidden=!visibleProjects.has(p)});
}
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));t.classList.add('on');
visibleProjectCount=initialProjectCount;updateProjects()}));
viewAllButton.addEventListener('click',()=>{
const activeTab=document.querySelector('.tab.on');
const filter=activeTab?activeTab.dataset.f:'all';
visibleProjectCount=projectCards.filter(p=>filter==='all'||p.dataset.c.split(' ').includes(filter)).length;
updateProjects()});
updateProjects();
const secs=[...document.querySelectorAll('#top,#work,#process,#about')],ls=[...document.querySelectorAll('.links a')];
addEventListener('scroll',()=>{let i=0;secs.forEach((s,k)=>{if(s.getBoundingClientRect().top<140)i=k});ls.forEach((a,k)=>a.classList.toggle('on',k===i))},{passive:true});
const themeToggle=document.querySelector('#themeToggle');
const menuToggle=document.querySelector('#menuToggle');
const primaryLinks=document.querySelector('#primaryLinks');
const systemTheme=matchMedia('(prefers-color-scheme: dark)');
function syncThemeToggle(){
const isDark=document.documentElement.dataset.theme?document.documentElement.dataset.theme==='dark':systemTheme.matches;
themeToggle.setAttribute('aria-pressed',String(isDark));
themeToggle.setAttribute('aria-label',`Switch to ${isDark?'light':'dark'} theme`);
themeToggle.title=`Switch to ${isDark?'light':'dark'} theme`;
}
syncThemeToggle();
themeToggle.addEventListener('click',()=>{
const nextTheme=(document.documentElement.dataset.theme==='dark'||(!document.documentElement.dataset.theme&&systemTheme.matches))?'light':'dark';
document.documentElement.dataset.theme=nextTheme;
syncThemeToggle();
try{localStorage.setItem('portfolio-theme',nextTheme)}
catch(error){console.warn('Unable to save the theme preference.',error)}
});
systemTheme.addEventListener('change',()=>{
if(!document.documentElement.dataset.theme)syncThemeToggle();
});
menuToggle.addEventListener('click',()=>{
const isOpen=menuToggle.getAttribute('aria-expanded')==='true';
menuToggle.setAttribute('aria-expanded',String(!isOpen));
menuToggle.setAttribute('aria-label',isOpen?'Open navigation menu':'Close navigation menu');
primaryLinks.classList.toggle('is-open',!isOpen);
});
primaryLinks.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
menuToggle.setAttribute('aria-expanded','false');
menuToggle.setAttribute('aria-label','Open navigation menu');
primaryLinks.classList.remove('is-open');
}));
document.addEventListener('keydown',event=>{
if(event.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true'){
menuToggle.setAttribute('aria-expanded','false');
menuToggle.setAttribute('aria-label','Open navigation menu');
primaryLinks.classList.remove('is-open');
menuToggle.focus();
}
});
