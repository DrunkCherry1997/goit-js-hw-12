import{S as q,i as f,a as w}from"./assets/vendor-b52d9f5e.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))m(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const d of r.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&m(d)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function m(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();document.addEventListener("DOMContentLoaded",()=>{const p=document.querySelector(".searchForm"),l=document.querySelector(".searchInput"),c=document.querySelector(".loader"),m=document.querySelector(".gallery"),e=document.querySelector(".load-more-button"),r="42055816-5ec499474650eadfc6b07a02f",d="https://pixabay.com/api/",b=new q(".gallery a");let u=1;const h=15;p.addEventListener("submit",async o=>{o.preventDefault();const a=l.value.trim();if(a===""){f.error({title:"Error",position:"topRight",message:"Please enter a search term."});return}c.classList.remove("hidden"),m.innerHTML="",e.classList.add("hidden");try{const n=await w.get(`${d}?key=${r}&q=${a}&image_type=photo&orientation=horizontal&safesearch=true&page=${u}&per_page=${h}`);if(n.status!==200)throw new Error(`HTTP error! Status: ${n.status}`);const t=n.data;if(t.hits.length===0)f.warning({title:"No Results",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});else{const s=t.hits.map(i=>({webformatURL:i.webformatURL,largeImageURL:i.largeImageURL,tags:i.tags,likes:i.likes,views:i.views,comments:i.comments,downloads:i.downloads}));y(s),t.totalHits>u*h?e.classList.remove("hidden"):e.classList.add("hidden"),u++}}catch(n){console.error("Error fetching data:",n),f.error({title:"Error",position:"topRight",message:"An error occurred while fetching data. Please try again."})}finally{c.classList.add("hidden")}}),e.addEventListener("click",()=>{c.classList.remove("hidden"),e.classList.add("hidden"),v()});async function v(){try{const o=await w.get(`${d}?key=${r}&q=${l.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true&page=${u}&per_page=${h}`);if(o.status!==200)throw new Error(`HTTP error! Status: ${o.status}`);const a=o.data;if(a.hits.length===0)e.classList.add("hidden"),f.info({title:"End of Collection",position:"topRight",message:"We're sorry, but you've reached the end of search results."});else{const n=a.hits.map(t=>({webformatURL:t.webformatURL,largeImageURL:t.largeImageURL,tags:t.tags,likes:t.likes,views:t.views,comments:t.comments,downloads:t.downloads}));y(n),a.totalHits>u*h?e.classList.remove("hidden"):e.classList.add("hidden")}}catch(o){console.error("Error fetching data:",o),f.error({title:"Error",position:"topRight",message:"An error occurred while fetching data. Please try again."})}finally{c.classList.add("hidden")}}function y(o){var t;const a=o.map(s=>`
          <div class="gallery-item">
            <a href="${s.largeImageURL}" data-lightbox="gallery" data-title="${s.tags}">
              <img src="${s.webformatURL}" alt="${s.tags}" class="image-thumbnail">
            </a>
            <div class="image-details">
              <p><b>Likes:</b> ${s.likes}</p>
              <p><b>Views:</b> ${s.views}</p>
              <p><b>Comments:</b> ${s.comments}</p>
              <p><b>Downloads:</b> ${s.downloads}</p>
            </div>
          </div>
        `).join("");m.innerHTML+=a,b.refresh();const n=(t=document.querySelector(".gallery-item"))==null?void 0:t.getBoundingClientRect().height;n&&$(n*o.length,300)}function $(o,a){const n=window.scrollY;let t=null;function s(i){t||(t=i);const L=i-t,R=Math.min(L,a),S=g=>g<.5?2*g*g:-1+(4-2*g)*g;window.scrollTo(0,n+S(R/a)*o),L<a&&requestAnimationFrame(s)}requestAnimationFrame(s)}});
//# sourceMappingURL=commonHelpers.js.map