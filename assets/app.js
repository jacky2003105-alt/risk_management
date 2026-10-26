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
document.querySelectorAll('.exans').forEach(e=>solutions.push(e));
// 改寫後的章節把易錯的地方寫回推導裡，只有仍以「易錯提醒」獨立成節的舊章節需要收合。
for(const unit of document.querySelectorAll('.unit')){for(const h of unit.querySelectorAll('h3')){if(!h.textContent.includes('易錯提醒'))continue;let e=h;while(e&&!(e!==h&&e.tagName==='H3')){solutions.push(e);e=e.nextElementSibling;}}}
const b=document.querySelector('#answers');b.onclick=()=>{const hide=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(hide));b.textContent=hide?'顯示參考解答':'隱藏參考解答';solutions.forEach(e=>e.classList.toggle('answer-hidden',hide));};
// ── 名詞按鈕：點一下顯示定義 ──────────────────────────────
const gdefs={};
document.querySelectorAll('#glossary .gdef').forEach(d=>gdefs[d.dataset.term]=d);
let pop=null;
function closePop(){if(pop){pop.remove();pop=null;}document.querySelectorAll('button.term[aria-expanded="true"]').forEach(b=>b.setAttribute('aria-expanded','false'));}
function openPop(btn){
 const src=gdefs[btn.dataset.term];if(!src)return;
 pop=document.createElement('div');pop.className='termpop';pop.dataset.for=btn.dataset.term;
 pop.innerHTML=src.innerHTML+'<button type="button" class="termclose" aria-label="關閉">×</button>';
 document.body.appendChild(pop);
 btn.setAttribute('aria-expanded','true');
 const r=btn.getBoundingClientRect();
 const w=Math.min(430,window.innerWidth-24);
 pop.style.width=w+'px';
 let left=r.left+scrollX+r.width/2-w/2;
 left=Math.max(scrollX+12,Math.min(left,scrollX+window.innerWidth-w-12));
 pop.style.left=left+'px';
 // 下方放不下就翻到上方
 const below=window.innerHeight-r.bottom;
 pop.style.top=(r.bottom+scrollY+8)+'px';
 if(below<pop.offsetHeight+24&&r.top>pop.offsetHeight+24)pop.style.top=(r.top+scrollY-pop.offsetHeight-8)+'px';
}
document.addEventListener('click',e=>{
 const btn=e.target.closest('button.term');
 if(btn){const same=pop&&pop.dataset.for===btn.dataset.term;closePop();if(!same)openPop(btn);e.preventDefault();return;}
 if(pop&&!e.target.closest('.termpop'))closePop();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePop();});
addEventListener('scroll',()=>{if(pop)closePop();},{passive:true});
addEventListener('resize',closePop);
window.notesReady=true;
});
