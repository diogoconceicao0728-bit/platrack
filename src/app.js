const glow=document.getElementById('cursorGlow');
window.addEventListener('pointermove',e=>{
  glow.style.left=e.clientX+'px';
  glow.style.top=e.clientY+'px';
});

document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

const visual=document.querySelector('.hero-visual');
const world=document.querySelector('.world');
if(window.matchMedia('(pointer:fine)').matches&&visual&&world){
  visual.addEventListener('mousemove',e=>{
    const r=visual.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    world.style.transform=`rotateY(${(-8+x*5).toFixed(2)}deg) rotateX(${(2-y*3).toFixed(2)}deg) translate3d(${x*8}px,${y*8}px,0)`;
  });
  visual.addEventListener('mouseleave',()=>{
    world.style.transform='rotateY(-8deg) rotateX(2deg)';
  });
}

const reveal=document.querySelectorAll('.card,.value,.t-line');
const obs=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.animate(
        [{opacity:.15,transform:'translateY(22px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:650,easing:'cubic-bezier(.2,.72,.15,1)',fill:'forwards'}
      );
      obs.unobserve(entry.target);
    }
  });
},{threshold:.12});
reveal.forEach(el=>obs.observe(el));
