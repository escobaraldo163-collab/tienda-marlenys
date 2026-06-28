const DATA = window.MARLENYS_DATA || window.MARLENYS_FALLBACK;
const ADMIN_EMAIL = "escobaraldo163@gmail.com";
let CLIENT = null;
let PRODUCTS_TABLE = null;
let SETTINGS_TABLE = null;
let STORAGE_BUCKET = "productos";
let CURRENT_PRODUCTS = [];
let CURRENT_SETTINGS = DATA.settings || {};

function rel(path){
  const depth = location.pathname.split("/").filter(Boolean).length;
  return depth === 0 ? path : "../".repeat(depth) + path;
}
function slugify(text){
  return String(text || "").toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}
function imgPath(path){
  if(!path) return rel("assets/img/productos/sin-foto.jpg");
  if(path.startsWith("http")) return path;
  return rel(path);
}
function wa(message){
  const phone = (CURRENT_SETTINGS && CURRENT_SETTINGS.whatsapp) || DATA.settings.whatsapp;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
function loadScript(src){
  return new Promise((resolve,reject)=>{
    if([...document.scripts].some(s=>s.src.includes(src))) return resolve();
    const s=document.createElement("script");
    s.src=src; s.onload=resolve; s.onerror=reject; document.head.appendChild(s);
  });
}
async function initSupabase(){
  if(CLIENT) return CLIENT;
  try{
    if(!window.supabase) await loadScript("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");
    if(!window.SUPABASE_CONFIG && typeof supabase === "undefined") await loadScript(rel("supabase.js"));
  }catch(e){ console.warn("No se pudo cargar Supabase", e); }

  try{
    if(typeof supabase !== "undefined" && supabase && supabase.from) CLIENT = supabase;
  }catch(e){}

  if(!CLIENT && window.marlenysSupabase){
  CLIENT = window.marlenysSupabase;
}

  if(!CLIENT && window.SUPABASE_CONFIG && window.supabase && !String(window.SUPABASE_CONFIG.url).includes("PEGA_AQUI")){
    CLIENT = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
  }

  if(window.SUPABASE_CONFIG && window.SUPABASE_CONFIG.storageBucket) STORAGE_BUCKET = window.SUPABASE_CONFIG.storageBucket;
  if(CLIENT){
    PRODUCTS_TABLE = await detectTable(["products","productos"]);
    SETTINGS_TABLE = await detectTable(["settings","ajustes"]);
  }
  return CLIENT;
}
async function detectTable(names){
  for(const name of names){
    const { error } = await CLIENT.from(name).select("*").limit(1);
    if(!error) return name;
  }
  return null;
}
function mapProduct(row){
  return {
    id: row.id,
    nombre: row.nombre || row.name || "",
    categoria: row.categoria || row.category || "",
    slugCategoria: row.slugCategoria || row.slug_categoria || row.slug || "",
    subcategoria: row.subcategoria || row.subcategory || "",
    marca: row.marca || row.brand || "Consultar",
    precio: row.precio || row.price || "Consultar",
    etiqueta: row.etiqueta || row.tag || "Disponible",
    descripcion: row.descripcion || row.description || "",
    medidas: row.medidas || row.measures || "Consultar",
    imagen: row.imagen || row.image || row.image_url || "assets/img/productos/sin-foto.jpg",
    activo: row.activo !== false,
    destacado: !!row.destacado
  };
}
function toDb(p){
  return {
    id:p.id, nombre:p.nombre, categoria:p.categoria, slug_categoria:p.slugCategoria,
    subcategoria:p.subcategoria || "", marca:p.marca || "Consultar",
    precio:p.precio || "Consultar", etiqueta:p.etiqueta || "Disponible",
    descripcion:p.descripcion || "", medidas:p.medidas || "Consultar",
    imagen:p.imagen || "assets/img/productos/sin-foto.jpg",
    activo:p.activo !== false, destacado:!!p.destacado
  };
}
function mapSettings(row){
  return {
    ...DATA.settings,
    ...row,
    heroTitle: row.heroTitle || row.hero_title || row.titulo_principal || DATA.settings.heroTitle,
    heroSubtitle: row.heroSubtitle || row.hero_subtitle || row.subtitulo || DATA.settings.heroSubtitle,
    displayWhatsapp: row.displayWhatsapp || row.display_whatsapp || row.whatsapp || DATA.settings.displayWhatsapp,
    heroImage: row.heroImage || row.hero_image || DATA.settings.heroImage
  };
}
async function loadSettings(){
  await initSupabase();
  if(!CLIENT || !SETTINGS_TABLE){ CURRENT_SETTINGS = DATA.settings; return CURRENT_SETTINGS; }
  const { data, error } = await CLIENT.from(SETTINGS_TABLE).select("*").eq("id",1).maybeSingle();
  CURRENT_SETTINGS = error || !data ? DATA.settings : mapSettings(data);
  return CURRENT_SETTINGS;
}
async function loadProducts(opts={}){
  await initSupabase();
  if(!CLIENT || !PRODUCTS_TABLE){ CURRENT_PRODUCTS = DATA.products || []; return CURRENT_PRODUCTS; }
  let q = CLIENT.from(PRODUCTS_TABLE).select("*");
  if(!opts.all) q = q.eq("activo", true);
  q = q.order("created_at", { ascending:false });
  const { data, error } = await q;
  CURRENT_PRODUCTS = error || !data ? DATA.products || [] : data.map(mapProduct);
  return CURRENT_PRODUCTS;
}
async function currentUser(){
  await initSupabase();
  if(!CLIENT) return null;
  const { data } = await CLIENT.auth.getSession();
  return data && data.session ? data.session.user : null;
}

function header(active=""){
  return `
  <header class="header">
    <div class="header-inner">
      <a class="brand" href="${rel("index.html")}">
        <div class="brand-mark">M</div>
        <div><strong>Tienda MARLENYS</strong><span>Catálogo oficial</span></div>
      </a>
      <nav class="nav">
        <a href="${rel("index.html")}">Inicio</a>
        ${DATA.categories.map(c=>`<a href="${rel("categoria/"+c.slug+"/index.html")}" class="${active===c.slug?"active":""}">${c.short}</a>`).join("")}
        <a href="${rel("index.html#ubicacion")}">Ubicación</a>
        <a class="panel-link" href="${rel("admin.html")}">Panel</a>
      </nav>
    </div>
  </header>`;
}
function footer(){
  return `<a class="wa-float" target="_blank" href="${wa("Hola Tienda MARLENYS, quiero información.")}">WhatsApp</a>
  <footer class="footer"><strong>Tienda MARLENYS</strong><span>Muebles • Electrodomésticos • REVASA</span></footer>`;
}
function productCard(p){
  return `<article class="product-card">
    <a href="#" onclick="showProductDetail('${p.id}'); return false;"><img src="${imgPath(p.imagen)}" alt="${p.nombre}"></a>
    <div class="product-body">
      <div class="row"><span class="cat">${p.categoria}</span><span class="tag">${p.etiqueta}</span></div>
      <h3>${p.nombre}</h3><p>${p.descripcion}</p>
      <div class="meta"><b>Marca:</b> ${p.marca} &nbsp; <b>Medidas:</b> ${p.medidas}</div>
      <div class="price">${p.precio}</div>
      <div class="card-actions">
        <button class="btn secondary" onclick="showProductDetail('${p.id}')">Ver detalle</button>
        <a class="btn primary" target="_blank" href="${wa("Hola Tienda MARLENYS, quiero información sobre: "+p.nombre)}">WhatsApp</a>
      </div>
    </div>
  </article>`;
}
window.showProductDetail = function(id){
  const p = CURRENT_PRODUCTS.find(x=>x.id===id) || DATA.products.find(x=>x.id===id);
  if(!p) return alert("Producto no encontrado.");
  const modal=document.createElement("div");
  modal.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:200;display:grid;place-items:center;padding:18px;";
  modal.innerHTML=`<div data-box style="background:white;max-width:900px;width:100%;border-radius:28px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.25);"><img src="${imgPath(p.imagen)}" style="width:100%;max-height:420px;object-fit:cover;"><div style="padding:24px;"><button onclick="this.closest('[data-modal]').remove()" style="float:right;border:0;background:#fee4e2;color:#b42318;border-radius:999px;padding:8px 12px;font-weight:900;cursor:pointer;">Cerrar</button><span class="cat">${p.categoria}</span><h2 style="color:#061f3d;margin:10px 0;font-size:34px;">${p.nombre}</h2><p>${p.descripcion}</p><p><b>Marca:</b> ${p.marca}</p><p><b>Subcategoría:</b> ${p.subcategoria}</p><p><b>Medidas:</b> ${p.medidas}</p><div class="price">${p.precio}</div><a class="btn primary" target="_blank" href="${wa("Hola Tienda MARLENYS, quiero información sobre: "+p.nombre)}">Consultar por WhatsApp</a></div></div>`;
  modal.setAttribute("data-modal","true");
  modal.onclick=e=>{ if(e.target===modal) modal.remove(); };
  document.body.appendChild(modal);
};

window.renderHome = async function(){
  await loadSettings();
  const products = await loadProducts();
  document.body.innerHTML = header() + `
  <main>
    <section class="hero"><div class="hero-inner"><div><span class="eyebrow">Catálogo digital</span>
      <h1>${CURRENT_SETTINGS.heroTitle || "Muebles, electrodomésticos y maquinaria para tu hogar y negocio."}</h1>
      <p>${CURRENT_SETTINGS.heroSubtitle || "Una forma moderna y rápida de conocer los productos de Tienda MARLENYS desde tu celular."}</p>
      <div class="actions"><a class="btn primary" href="${rel("categoria/salas/index.html")}">Ver productos</a><a class="btn secondary" target="_blank" href="${wa("Hola Tienda MARLENYS, quiero información de un producto.")}">Consultar por WhatsApp</a></div>
      </div><div class="hero-card"><img src="${imgPath(CURRENT_SETTINGS.heroImage || "assets/img/productos/hero.jpg")}" alt="Catálogo"><div class="float-card"><strong>Atención personalizada</strong><span>Consulta disponibilidad, precios y medidas.</span></div></div></div></section>

    <section class="section"><div class="section-head"><span class="eyebrow">Categorías</span><h2>Compra por categoría</h2><p>Cada botón abre su apartado correspondiente.</p></div>
      <div class="category-grid">${DATA.categories.map(c=>`<a class="cat-card" href="categoria/${c.slug}/index.html"><img src="${c.imagen}"><div class="cat-body"><span>${c.nombre}</span><strong>${c.descripcion}</strong></div></a>`).join("")}</div></section>

    <section class="section" id="catalogo"><div class="catalog-top"><div><span class="eyebrow">Catálogo</span><h2>Productos destacados</h2><p>Busca por nombre, marca o categoría.</p></div><div class="search"><input id="search" placeholder="Buscar producto..."></div></div>
      <div class="filters"><button class="filter-btn active" data-cat="todos">Todos</button>${DATA.categories.map(c=>`<button class="filter-btn" data-cat="${c.slug}">${c.short}</button>`).join("")}</div><div class="product-grid" id="grid"></div></section>

    <section class="revasa-section"><div class="revasa-box"><img class="revasa-logo" src="assets/img/logos/revasa.png" onerror="this.style.display='none'"><span class="eyebrow">Línea agrícola</span><h2>REVASA</h2><p>Generadores, bombas de agua, chapeadoras y maquinaria agrícola para trabajo fuerte.</p><a class="btn primary" href="categoria/revasa/index.html">Ver REVASA</a></div><img class="revasa-img" src="assets/img/productos/revasa.jpg"></section>
    <section class="section location" id="ubicacion"><div class="info-card"><span class="eyebrow">Visítanos</span><h2>Ubicación y horario</h2><p><b>Dirección:</b> ${CURRENT_SETTINGS.direccion}</p><p><b>Horario:</b> ${CURRENT_SETTINGS.horario}</p><p><b>WhatsApp:</b> ${CURRENT_SETTINGS.displayWhatsapp}</p></div><div class="map-card"><strong>Tienda MARLENYS</strong><span>Puerto Barrios, Izabal</span><a class="btn secondary" target="_blank" href="https://www.google.com/maps/search/6+Avenida+entre+12+y+13+Calle+Puerto+Barrios">Abrir mapa</a></div></section>
  </main>` + footer();

  let current="todos";
  const render=()=>{
    const q=(document.querySelector("#search").value||"").toLowerCase();
    const list=products.filter(p=>(current==="todos"||p.slugCategoria===current)&&`${p.nombre} ${p.marca} ${p.categoria} ${p.descripcion}`.toLowerCase().includes(q));
    document.querySelector("#grid").innerHTML=list.map(productCard).join("") || '<div class="admin-card"><h3>No encontramos productos</h3></div>';
  };
  document.querySelectorAll(".filter-btn").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter-btn").forEach(x=>x.classList.remove("active"));b.classList.add("active");current=b.dataset.cat;render();});
  document.querySelector("#search").oninput=render;
  render();
};
window.renderCategory = async function(slug){
  await loadSettings();
  const products = await loadProducts();
  const cat = DATA.categories.find(c=>c.slug===slug);
  const list = products.filter(p=>p.slugCategoria===slug);
  document.body.innerHTML = header(slug)+`<main><section class="hero"><div class="hero-inner"><div><a class="eyebrow" href="${rel("index.html")}">← Inicio</a><h1>${cat.nombre}</h1><p>${cat.descripcion}</p></div><div class="hero-card"><img src="${rel(cat.imagen)}"></div></div></section><section class="section"><div class="filters">${DATA.categories.map(c=>`<a class="filter-btn ${c.slug===slug?"active":""}" href="${rel("categoria/"+c.slug+"/index.html")}">${c.short}</a>`).join("")}</div><div class="product-grid">${list.map(productCard).join("")}</div></section></main>`+footer();
};
window.renderProduct = async function(id){
  await loadSettings();
  const products = await loadProducts();
  const p = products.find(x=>x.id===id) || DATA.products.find(x=>x.id===id);
  document.body.innerHTML = header(p.slugCategoria)+`<main class="section"><div class="location"><div class="hero-card"><img src="${imgPath(p.imagen)}" alt="${p.nombre}"></div><div class="info-card"><a class="eyebrow" href="${rel("categoria/"+p.slugCategoria+"/index.html")}">← ${p.categoria}</a><h2>${p.nombre}</h2><p>${p.descripcion}</p><p><b>Marca:</b> ${p.marca}</p><p><b>Subcategoría:</b> ${p.subcategoria}</p><p><b>Medidas:</b> ${p.medidas}</p><div class="price">${p.precio}</div><a class="btn primary" target="_blank" href="${wa("Hola Tienda MARLENYS, quiero información sobre: "+p.nombre)}">Consultar por WhatsApp</a></div></div></main>`+footer();
};

window.renderAdmin = async function(){
  await loadSettings();
  await initSupabase();
  document.body.innerHTML = header()+`<main class="admin-main"><section class="admin-card"><span class="eyebrow">Panel privado</span><h2>Administrador Tienda MARLENYS</h2><div id="authBox"></div></section>
  <section id="adminContent" class="admin-grid" style="display:none;"><form class="admin-card form" id="form"><input type="hidden" id="edit"><label>Nombre<input id="nombre" required></label><label>Categoría<select id="categoria">${DATA.categories.map(c=>`<option value="${c.slug}">${c.nombre}</option>`).join("")}</select></label><label>Subcategoría<input id="subcategoria"></label><label>Marca<input id="marca"></label><label>Precio<input id="precio" value="Consultar"></label><label>Etiqueta<input id="etiqueta" value="Disponible"></label><label>Medidas<input id="medidas" value="Consultar"></label><label>Imagen principal<input type="file" id="file" accept="image/*"><input id="imagen" value="assets/img/productos/sin-foto.jpg" placeholder="URL de imagen"></label><img id="preview" style="display:none;width:150px;height:115px;object-fit:cover;border-radius:14px;"><label>Descripción<textarea id="descripcion" rows="4"></textarea></label><label><input type="checkbox" id="activo" checked> Producto activo</label><label><input type="checkbox" id="destacado"> Producto destacado</label><button class="btn primary">Guardar producto</button></form><div class="admin-card"><div class="admin-actions"><button class="btn secondary" id="newProduct">Nuevo producto</button><button class="btn secondary" id="editTexts">Editar textos</button><button class="btn danger" id="logout">Cerrar sesión</button></div><div class="admin-list" id="list"></div></div></section>
  <section id="settingsPanel" class="admin-card" style="display:none;margin-top:20px;"><h2>Textos principales</h2><form class="form" id="settingsForm"><label>Título principal<textarea id="heroTitle" rows="3"></textarea></label><label>Subtítulo<textarea id="heroSubtitle" rows="3"></textarea></label><label>WhatsApp<input id="whatsapp"></label><label>Dirección<input id="direccion"></label><label>Horario<input id="horario"></label><button class="btn primary">Guardar textos</button></form></section></main>`+footer();

  const authBox=document.querySelector("#authBox");
  const adminContent=document.querySelector("#adminContent");

  if(!CLIENT || !PRODUCTS_TABLE){ authBox.innerHTML='<div class="notice">Supabase todavía no está conectado correctamente. Revisa supabase.js y confirma Project URL y Publishable Key.</div>'; return; }

  async function showLoginOrPanel(){
    const user=await currentUser();
    if(!user){
      authBox.innerHTML=`<form class="form" id="loginForm"><label>Correo<input id="email" type="email" required></label><label>Contraseña<input id="password" type="password" required></label><button class="btn primary">Entrar al panel</button></form>`;
      document.querySelector("#loginForm").onsubmit=async(e)=>{
        e.preventDefault();
        const {error}=await CLIENT.auth.signInWithPassword({email:document.querySelector("#email").value,password:document.querySelector("#password").value});
        if(error) return alert(error.message);
        showLoginOrPanel();
      };
      return;
    }
    if(user.email!==ADMIN_EMAIL){ await CLIENT.auth.signOut(); authBox.innerHTML='<div class="notice">Este correo no está autorizado para administrar la página.</div>'; return; }
    authBox.innerHTML=`<div class="notice ok">Sesión iniciada como ${user.email}</div>`;
    adminContent.style.display="grid";
    renderAdminList();
  }
  async function uploadImage(){
    const file=document.querySelector("#file").files[0];
    if(!file) return document.querySelector("#imagen").value;
    const fileName=`productos/${Date.now()}-${slugify(file.name)}`;
    const {error}=await CLIENT.storage.from(STORAGE_BUCKET).upload(fileName,file,{upsert:false});
    if(error){ alert("No se pudo subir la imagen: "+error.message); return document.querySelector("#imagen").value; }
    return CLIENT.storage.from(STORAGE_BUCKET).getPublicUrl(fileName).data.publicUrl;
  }
  async function renderAdminList(){
    const items=await loadProducts({all:true});
    document.querySelector("#list").innerHTML=items.map(p=>`<div class="admin-item"><div><strong>${p.nombre}</strong><span>${p.categoria} • ${p.marca} • ${p.precio} • ${p.activo?"Activo":"Oculto"}</span></div><div class="admin-actions"><button class="btn secondary" data-edit="${p.id}">Editar</button><button class="btn danger" data-del="${p.id}">Eliminar</button></div></div>`).join("");
    document.querySelectorAll("[data-edit]").forEach(b=>b.onclick=()=>editProduct(b.dataset.edit,items));
    document.querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>deleteProduct(b.dataset.del));
  }
  function editProduct(id,items){
    const p=items.find(x=>x.id===id);
    document.querySelector("#edit").value=p.id;
    document.querySelector("#nombre").value=p.nombre;
    document.querySelector("#categoria").value=p.slugCategoria;
    document.querySelector("#subcategoria").value=p.subcategoria||"";
    document.querySelector("#marca").value=p.marca||"";
    document.querySelector("#precio").value=p.precio||"";
    document.querySelector("#etiqueta").value=p.etiqueta||"";
    document.querySelector("#medidas").value=p.medidas||"";
    document.querySelector("#descripcion").value=p.descripcion||"";
    document.querySelector("#imagen").value=p.imagen||"";
    document.querySelector("#activo").checked=p.activo!==false;
    document.querySelector("#destacado").checked=!!p.destacado;
    document.querySelector("#preview").src=imgPath(p.imagen);
    document.querySelector("#preview").style.display="block";
    scrollTo({top:0,behavior:"smooth"});
  }
  async function deleteProduct(id){
    if(!confirm("¿Eliminar este producto?")) return;
    const {error}=await CLIENT.from(PRODUCTS_TABLE).delete().eq("id",id);
    if(error) return alert(error.message);
    renderAdminList();
  }
  document.querySelector("#file").onchange=()=>{
    const file=document.querySelector("#file").files[0];
    if(!file) return;
    const preview=document.querySelector("#preview");
    preview.src=URL.createObjectURL(file);
    preview.style.display="block";
  };
  document.querySelector("#form").onsubmit=async(e)=>{
    e.preventDefault();
    const cat=DATA.categories.find(c=>c.slug===document.querySelector("#categoria").value);
    const editId=document.querySelector("#edit").value;
    const imageUrl=await uploadImage();
    const product={id:editId||slugify(document.querySelector("#nombre").value)+"-"+Date.now(),nombre:document.querySelector("#nombre").value,categoria:cat.nombre,slugCategoria:cat.slug,subcategoria:document.querySelector("#subcategoria").value,marca:document.querySelector("#marca").value||"Consultar",precio:document.querySelector("#precio").value||"Consultar",etiqueta:document.querySelector("#etiqueta").value||"Disponible",descripcion:document.querySelector("#descripcion").value,medidas:document.querySelector("#medidas").value||"Consultar",imagen:imageUrl||"assets/img/productos/sin-foto.jpg",activo:document.querySelector("#activo").checked,destacado:document.querySelector("#destacado").checked};
    const {error}=await CLIENT.from(PRODUCTS_TABLE).upsert(toDb(product));
    if(error) return alert(error.message);
    alert("Producto guardado correctamente.");
    e.target.reset();
    document.querySelector("#edit").value="";
    document.querySelector("#preview").style.display="none";
    renderAdminList();
  };
  document.querySelector("#newProduct").onclick=()=>{document.querySelector("#form").reset();document.querySelector("#edit").value="";document.querySelector("#preview").style.display="none";};
  document.querySelector("#logout").onclick=async()=>{await CLIENT.auth.signOut();location.reload();};
  document.querySelector("#editTexts").onclick=()=>{
    const panel=document.querySelector("#settingsPanel");
    panel.style.display=panel.style.display==="none"?"block":"none";
    panel.scrollIntoView({behavior:"smooth", block:"start"});
    document.querySelector("#heroTitle").value=CURRENT_SETTINGS.heroTitle||"";
    document.querySelector("#heroSubtitle").value=CURRENT_SETTINGS.heroSubtitle||"";
    document.querySelector("#whatsapp").value=CURRENT_SETTINGS.whatsapp||"";
    document.querySelector("#direccion").value=CURRENT_SETTINGS.direccion||"";
    document.querySelector("#horario").value=CURRENT_SETTINGS.horario||"";
  };
  document.querySelector("#settingsForm").onsubmit=async(e)=>{
    e.preventDefault();
    
    const payload={
  id:1,
  herotitle:document.querySelector("#heroTitle").value,
  herosubtitle:document.querySelector("#heroSubtitle").value,
  whatsapp:document.querySelector("#whatsapp").value,
  displaywhatsapp:document.querySelector("#whatsapp").value,
  direccion:document.querySelector("#direccion").value,
  horario:document.querySelector("#horario").value
};
    const {error}=await CLIENT.from(SETTINGS_TABLE).upsert(payload);
    if(error) return alert(error.message);
    alert("Textos guardados correctamente.");
    CURRENT_SETTINGS={...CURRENT_SETTINGS,...payload};
  };
  showLoginOrPanel();
};
