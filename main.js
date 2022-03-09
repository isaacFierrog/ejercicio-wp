const d = document; 
const $site = d.getElementById('site');
const $posts = d.getElementById('posts');
const $loader = d.querySelector('.loader');
const $template = d.getElementById('post-template').content;
const $fragment = d.createDocumentFragment();
const DOMAIN = 'https://malvestida.com';
const SITE = `${DOMAIN}/wp-json`;
const API_WP = `${SITE}/wp/v2`;
const POSTS = `${API_WP}/posts`;
const PAGES = `${API_WP}/pages`;
const CATEGORIES = `${API_WP}/categories`

async function getSiteData(){
    try{
        const res = await fetch(SITE);

        if(!res.ok) throw { status: res.status, statusText: res.statusText };

        const data = await res.json();
        
        $site.innerHTML = `
            <h3>Sitio Web</h3>
            <h2>
                <a href="${data.url}" target="_blank">${data.name}</a>
            </h2>
            <p>${data.description}</p>
            <p>${data.timezone_string}</p>
        `
    }catch(err){
        const message = err.statusText || 'Ocurrio un error';
        $site.innerHTML = `<p>Error ${err.status}: ${message}</p>`
    }
}

async function getPosts(){
    try{
        const res = await fetch(POSTS);

        if(!res.ok) throw { status: res.status, statusText: res.statusText };

        const data = await res.json();
        console.log(data);
    }catch(err){
        const message = err.statusText || 'Ocurrio un error';
        $posts.innerHTML = `<p>Error ${err.status}: ${message}</p>`
        $loader.style.display = 'none';
    }
}

d.addEventListener('DOMContentLoaded', e => {
    getSiteData();
    getPosts();
});