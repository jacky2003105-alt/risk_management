document.addEventListener('DOMContentLoaded',()=>{
window.mathErrors=[];
renderMathInElement(document.body,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'$',right:'$',display:false}],throwOnError:false,errorCallback:(m,e)=>window.mathErrors.push(m),strict:'ignore'});
const select=document.querySelector('#jump');const sync=()=>{const id=location.hash.slice(1);if([...select.options].some(o=>o.value===id))select.value=id;};sync();addEventListener('hashchange',sync);select.addEventListener('change',()=>{if(select.value==='top'){window.scrollTo({top:0,behavior:'smooth'});return}history.replaceState(null,'','#'+select.value);document.getElementById(select.value)?.scrollIntoView({behavior:'instant'});});
document.querySelector('#top').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
// The requested one-page format keeps every section visible. The select is a table of contents.
const solutions=[];
for(const unit of document.querySelectorAll('.unit')){
const standalone=/^(09|10|24)｜/.test(unit.querySelector('h2').textContent);
if(standalone){let start=false;for(const e of unit.children){if(e.tagName==='H3'&&e.textContent.includes('參考解答'))start=true;if(e.tagName==='H3'&&e.textContent.includes('課程提示'))start=false;if(start)solutions.push(e);}}
else {for(const h of unit.querySelectorAll('h3')){if(!h.textContent.includes('參考解答'))continue;let e=h.nextElementSibling;while(e&&e.tagName!=='H3'){if(!e.textContent.startsWith('題目'))solutions.push(e);e=e.nextElementSibling;}}}
}
for(const id of ['s04','s05','s15','s19']){const unit=document.getElementById(id);for(const h of unit.querySelectorAll('h3')){if(!h.textContent.includes('易錯提醒'))continue;let e=h;while(e){solutions.push(e);e=e.nextElementSibling;}}}
const b=document.querySelector('#answers');b.onclick=()=>{const hide=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(hide));b.textContent=hide?'顯示參考解答':'隱藏參考解答';solutions.forEach(e=>e.classList.toggle('answer-hidden',hide));};
window.notesReady=true;
});
