
const products = [
  {id:1, title:'Front Brake Disc', category:'brake', img:'img/product-disc.svg', desc:'High-carbon alloy brake disc, balanced and pre-scored for consistent bedding.'},
  {id:2, title:'Suspension Arm', category:'suspension', img:'img/product-arm.svg', desc:'Forged suspension arm with reinforced mounting points.'},
  {id:3, title:'Engine Mount', category:'engine', img:'img/product-mount.svg', desc:'Vibration-damped engine mount with high-temperature elastomer.'},
  {id:4, title:'Alternator Pulley', category:'electrical', img:'img/product-pulley.svg', desc:'Precision pulley for latest alternator assemblies.'},
  {id:5, title:'Brake Pad Set', category:'brake', img:'img/product-pad.svg', desc:'Low-dust compound pads for long life and stable braking.'},
  {id:6, title:'Connecting Rod', category:'engine', img:'img/product-rod.svg', desc:'Lightweight alloy connecting rod machined for balance.'}
];

function el(q){return document.querySelector(q)}
function renderGrid(targetId, items){
  const grid = el('#'+targetId);
  if(!grid) return;
  grid.innerHTML = '';
  items.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <img loading="lazy" src="${p.img}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <div style="margin-top:.7rem">
        <a class="btn" href="contact.html?product=${encodeURIComponent(p.title)}">Enquire</a>
      </div>
    `;
    grid.appendChild(card);
    // subtle animation
    card.style.opacity = 0;
    card.style.transform = 'translateY(18px)';
    setTimeout(()=>{ card.style.transition='all .6s cubic-bezier(.2,.9,.3,1)'; card.style.opacity=1; card.style.transform='translateY(0)'; }, 70 * p.id);
  });
}

document.addEventListener('DOMContentLoaded',()=>{
  // featured grid on home page
  renderGrid('featured-grid', products.slice(0,4));
  // products page
  renderGrid('product-grid', products);

  // filtering
  const filter = el('#category-filter');
  if(filter){
    filter.addEventListener('change', (e)=>{
      const val = e.target.value;
      const search = el('#search').value.toLowerCase();
      const filtered = products.filter(p=> (val==='all' || p.category===val) && p.title.toLowerCase().includes(search));
      renderGrid('product-grid', filtered);
    });
    el('#search').addEventListener('input', (e)=>{
      const val = filter.value;
      const q = e.target.value.toLowerCase();
      const filtered = products.filter(p=> (val==='all' || p.category===val) && p.title.toLowerCase().includes(q));
      renderGrid('product-grid', filtered);
    });
  }

  // menu toggle for small screens
  const mt = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  mt && mt.addEventListener('click', ()=>{ if(nav.style.display==='flex'){nav.style.display='none'}else{nav.style.display='flex'; nav.style.flexDirection='column'; nav.style.gap='8px'} });

});

// contact demo submit
function submitContact(e){
  e.preventDefault();
  const f = e.target;
  const data = new FormData(f);
  const name = data.get('name');
  alert('Thanks, '+name+'. This is a demo contact form. Integrate an email/CRM to receive messages.');
  f.reset();
}
