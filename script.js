// Leon Kabange — Portfolio interactions
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('show');
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      if(id.length > 1){
        const el = document.querySelector(id);
        if(el){
          e.preventDefault();
          window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 64, behavior: 'smooth' });
          navMenu?.classList.remove('show');
        }
      }
    });
  });

  // Animate skill bars when visible
  const bars = document.querySelectorAll('.bar');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const v = el.getAttribute('data-val') || '0';
        const span = el.querySelector('span');
        span.style.width = v + '%';
        io.unobserve(el);
      }
    });
  }, { threshold: .4 });
  bars.forEach(b=> io.observe(b));

  // Project modals
  function openModal(id){
    const m = document.getElementById(id);
    if(!m) return;
    m.classList.add('show');
    m.setAttribute('aria-hidden', 'false');
  }
  function closeModals(){
    document.querySelectorAll('.modal').forEach(m=>{
      m.classList.remove('show');
      m.setAttribute('aria-hidden', 'true');
    });
  }
  document.querySelectorAll('[data-modal]').forEach(btn=>{
    btn.addEventListener('click', ()=> openModal(btn.getAttribute('data-modal')));
  });
  document.querySelectorAll('.modal').forEach(m=>{
    m.addEventListener('click', (e)=>{ if(e.target === m) closeModals(); });
    m.querySelector('.modal-close')?.addEventListener('click', closeModals);
  });

  // Footer year
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
})();
