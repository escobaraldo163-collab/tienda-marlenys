
const DATA = window.MARLENYS_DATA;
function wa(message){ return `https://wa.me/${DATA.settings.whatsapp}?text=${encodeURIComponent(message)}`; }
function rel(path){ 
  const depth = location.pathname.split('/').filter(Boolean).length;
  if(depth===0) return path;
  return '../'.repeat(depth) + path;
}
function header(active=''){
  return `
  <header class="header">
    <div class="header-inner">
      <a class="brand" href="${rel('index.html')}">
        <div class="brand-mark">M</div>
        <div><strong>Tienda MARLENYS</strong><span>Catálogo oficial</span></div>
      </a>
      <nav class="nav">
        <a href="${rel('index.html')}">Inicio</a>
        ${DATA.categories.map(c=>`<a href="${rel('categoria/'+c.slug+'/index.html')}" class="${active===c.slug?'active':''}">${c.short}</a>`).join('')}
        <a href="${rel('index.html#ubicacion')}">Ubicación</a>
        <a class="panel-link" href="${rel('admin.html')}">Panel</a>
      </nav>
    </div>
  </header>`;
}
function footer(){
  return `<a class="wa-float" target="_blank" href="${wa('Hola Tienda MARLENYS, quiero información.')}">WhatsApp</a>
  <footer class="footer"><strong>Tienda MARLENYS</strong><span>Muebles • Electrodomésticos • REVASA</span></footer>`;
}
function productCard(p){
  return `<article class="product-card">
    <a href="${rel('producto/'+p.id+'/index.html')}"><img src="${rel(p.imagen)}" alt="${p.nombre}"></a>
    <div class="product-body">
      <div class="row"><span class="cat">${p.categoria}</span><span class="tag">${p.etiqueta}</span></div>
      <h3>${p.nombre}</h3>
      <p>${p.descripcion}</p>
      <div class="meta"><b>Marca:</b> ${p.marca} &nbsp; <b>Medidas:</b> ${p.medidas}</div>
      <div class="price">${p.precio}</div>
      <div class="card-actions">
        <a class="btn secondary" href="${rel('producto/'+p.id+'/index.html')}">Ver detalle</a>
        <a class="btn primary" target="_blank" href="${wa('Hola Tienda MARLENYS, quiero información sobre: '+p.nombre)}">WhatsApp</a>
      </div>
    </div>
  </article>`;
}
function getProducts(){
  try { return JSON.parse(localStorage.getItem('marlenys_products')) || DATA.products; }
  catch(e){ return DATA.products; }
}
function saveProducts(list){ localStorage.setItem('marlenys_products', JSON.stringify(list)); }
function slugify(text){ return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,""); }

window.renderHome = function(){
  document.body.innerHTML = header() + `
  <main>
    <section class="hero">
      <div class="hero-inner">
        <div>
          <span class="eyebrow">Catálogo digital</span>
          <h1>Muebles, electrodomésticos y maquinaria para tu hogar y negocio.</h1>
          <p>Una forma moderna y rápida de conocer los productos de Tienda MARLENYS desde tu celular.</p>
          <div class="actions">
            <a class="btn primary" href="${rel('categoria/salas/index.html')}">Ver productos</a>
            <a class="btn secondary" target="_blank" href="${wa('Hola Tienda MARLENYS, quiero información de un producto.')}">Consultar por WhatsApp</a>
          </div>
        </div>
        <div class="hero-card">
          <img src="assets/img/productos/hero.jpg" alt="Catálogo Tienda MARLENYS">
          <div class="float-card"><strong>Atención personalizada</strong><span>Consulta disponibilidad, precios y medidas.</span></div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="section-head"><span class="eyebrow">Categorías</span><h2>Compra por categoría</h2><p>Cada botón abre su apartado correspondiente.</p></div>
      <div class="category-grid">${DATA.categories.map(c=>`<a class="cat-card" href="categoria/${c.slug}/index.html"><img src="${c.imagen}"><div class="cat-body"><span>${c.nombre}</span><strong>${c.descripcion}</strong></div></a>`).join('')}</div>
    </section>
    <section class="section" id="catalogo">
      <div class="catalog-top"><div><span class="eyebrow">Catálogo</span><h2>Productos destacados</h2><p>Busca por nombre, marca o categoría.</p></div><div class="search"><input id="search" placeholder="Buscar producto..."></div></div>
      <div class="filters"><button class="filter-btn active" data-cat="todos">Todos</button>${DATA.categories.map(c=>`<button class="filter-btn" data-cat="${c.slug}">${c.short}</button>`).join('')}</div>
      <div class="product-grid" id="grid"></div>
    </section>
    <section class="revasa-section">
      <div class="revasa-box"><img class="revasa-logo" src="assets/img/logos/revasa.png" onerror="this.style.display='none'"><span class="eyebrow">Línea agrícola</span><h2>REVASA</h2><p>Generadores, bombas de agua, chapeadoras y maquinaria agrícola para trabajo fuerte.</p><a class="btn primary" href="categoria/revasa/index.html">Ver REVASA</a></div>
      <img class="revasa-img" src="assets/img/productos/revasa.jpg">
    </section>
    <section class="section location" id="ubicacion">
      <div class="info-card"><span class="eyebrow">Visítanos</span><h2>Ubicación y horario</h2><p><b>Dirección:</b> ${DATA.settings.direccion}</p><p><b>Horario:</b> ${DATA.settings.horario}</p><p><b>WhatsApp:</b> ${DATA.settings.displayWhatsapp}</p></div>
      <div class="map-card"><strong>Tienda MARLENYS</strong><span>Puerto Barrios, Izabal</span><a class="btn secondary" target="_blank" href="https://www.google.com/maps/search/6+Avenida+entre+12+y+13+Calle+Puerto+Barrios">Abrir mapa</a></div>
    </section>
  </main>` + footer();
  let current = 'todos';
  const render = () => {
    const q = (document.querySelector('#search').value||'').toLowerCase();
    let list = getProducts().filter(p => (current==='todos'||p.slugCategoria===current) && `${p.nombre} ${p.marca} ${p.categoria} ${p.descripcion}`.toLowerCase().includes(q));
    document.querySelector('#grid').innerHTML = list.map(productCard).join('') || '<div class="admin-card"><h3>No encontramos productos</h3></div>';
  };
  document.querySelectorAll('.filter-btn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');current=b.dataset.cat;render();});
  document.querySelector('#search').oninput = render;
  render();
}
window.renderCategory = function(slug){
  const cat = DATA.categories.find(c=>c.slug===slug);
  const list = getProducts().filter(p=>p.slugCategoria===slug);
  document.body.innerHTML = header(slug) + `<main>
    <section class="hero"><div class="hero-inner"><div><a class="eyebrow" href="${rel('index.html')}">← Inicio</a><h1>${cat.nombre}</h1><p>${cat.descripcion}</p></div><div class="hero-card"><img src="${rel(cat.imagen)}"></div></div></section>
    <section class="section"><div class="filters">${DATA.categories.map(c=>`<a class="filter-btn ${c.slug===slug?'active':''}" href="${rel('categoria/'+c.slug+'/index.html')}">${c.short}</a>`).join('')}</div><div class="product-grid">${list.map(productCard).join('')}</div></section>
  </main>` + footer();
}
window.renderProduct = function(id){
  const p = getProducts().find(x=>x.id===id) || DATA.products.find(x=>x.id===id);
  document.body.innerHTML = header(p.slugCategoria) + `<main class="section">
    <div class="location">
      <div class="hero-card"><img src="${rel(p.imagen)}" alt="${p.nombre}"></div>
      <div class="info-card"><a class="eyebrow" href="${rel('categoria/'+p.slugCategoria+'/index.html')}">← ${p.categoria}</a><h2>${p.nombre}</h2><p>${p.descripcion}</p><p><b>Marca:</b> ${p.marca}</p><p><b>Subcategoría:</b> ${p.subcategoria}</p><p><b>Medidas:</b> ${p.medidas}</p><div class="price">${p.precio}</div><a class="btn primary" target="_blank" href="${wa('Hola Tienda MARLENYS, quiero información sobre: '+p.nombre)}">Consultar por WhatsApp</a></div>
    </div>
  </main>` + footer();
}
window.renderAdmin = function(){
  document.body.innerHTML = header() + `<main class="admin-main">
    <section class="admin-card"><span class="eyebrow">Panel local</span><h2>Administrar productos</h2><p>Este panel guarda cambios en esta computadora. En la siguiente fase se conecta a una base de datos en internet.</p></section>
    <section class="admin-grid">
      <form class="admin-card form" id="form">
        <input type="hidden" id="edit">
        <label>Nombre<input id="nombre" required></label>
        <label>Categoría<select id="categoria">${DATA.categories.map(c=>`<option value="${c.slug}">${c.nombre}</option>`).join('')}</select></label>
        <label>Subcategoría<input id="subcategoria"></label>
        <label>Marca<input id="marca"></label>
        <label>Precio<input id="precio" value="Consultar"></label>
        <label>Etiqueta<input id="etiqueta" value="Disponible"></label>
        <label>Medidas<input id="medidas" value="Consultar"></label>
        <label>Ruta de imagen<input id="imagen" value="assets/img/productos/sin-foto.jpg"></label>
        <label>Descripción<textarea id="descripcion" rows="4"></textarea></label>
        <button class="btn primary">Guardar producto</button>
      </form>
      <div class="admin-card"><div class="admin-actions"><button class="btn secondary" id="reset">Restaurar iniciales</button></div><div class="admin-list" id="list"></div></div>
    </section>
  </main>` + footer();
  const form = document.querySelector('#form');
  const fields = ['nombre','subcategoria','marca','precio','etiqueta','medidas','descripcion','imagen'];
  function listRender(){
    const items = getProducts();
    document.querySelector('#list').innerHTML = items.map(p=>`<div class="admin-item"><div><strong>${p.nombre}</strong><span>${p.categoria} • ${p.marca} • ${p.precio}</span></div><div class="admin-actions"><button class="btn secondary" data-edit="${p.id}">Editar</button><button class="btn secondary" data-del="${p.id}">Eliminar</button></div></div>`).join('');
    document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>edit(b.dataset.edit));
    document.querySelectorAll('[data-del]').forEach(b=>b.onclick=()=>del(b.dataset.del));
  }
  function edit(id){
    const p = getProducts().find(x=>x.id===id);
    document.querySelector('#edit').value=p.id;
    fields.forEach(f=>document.querySelector('#'+f).value = f==='imagen'?p.imagen:p[f]||'');
    document.querySelector('#categoria').value=p.slugCategoria;
    scrollTo({top:0,behavior:'smooth'});
  }
  function del(id){ if(confirm('¿Eliminar este producto?')){ saveProducts(getProducts().filter(p=>p.id!==id)); listRender(); } }
  form.onsubmit = e => {
    e.preventDefault();
    const cat = DATA.categories.find(c=>c.slug===document.querySelector('#categoria').value);
    const editId = document.querySelector('#edit').value;
    const product = {
      id: editId || slugify(document.querySelector('#nombre').value)+'-'+Date.now(),
      nombre: document.querySelector('#nombre').value,
      categoria: cat.nombre,
      slugCategoria: cat.slug,
      subcategoria: document.querySelector('#subcategoria').value,
      marca: document.querySelector('#marca').value || 'Consultar',
      precio: document.querySelector('#precio').value || 'Consultar',
      etiqueta: document.querySelector('#etiqueta').value || 'Disponible',
      descripcion: document.querySelector('#descripcion').value,
      medidas: document.querySelector('#medidas').value || 'Consultar',
      imagen: document.querySelector('#imagen').value || 'assets/img/productos/sin-foto.jpg'
    };
    const next = editId ? getProducts().map(p=>p.id===editId?product:p) : [product,...getProducts()];
    saveProducts(next); form.reset(); document.querySelector('#edit').value=''; listRender();
  };
  document.querySelector('#reset').onclick=()=>{ if(confirm('¿Restaurar iniciales?')){ localStorage.removeItem('marlenys_products'); listRender(); } };
  listRender();
}
