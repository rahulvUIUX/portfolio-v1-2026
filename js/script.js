const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');
e.target.querySelectorAll('.n').forEach(n=>{const t=+n.dataset.t;let c=0;const s=setInterval(()=>{c++;n.textContent=c;if(c>=t)clearInterval(s)},900/t)});
io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
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
