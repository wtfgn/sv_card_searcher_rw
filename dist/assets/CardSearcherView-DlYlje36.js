import{d as f,u as m,s as h,h as l,i as _,o as p,c as v,a as e,f as c,w as i,j as w}from"./index-vfP7b7Qf.js";import{_ as x,a as b,u as g,b as k}from"./useFetchCards-AOfJUbeS.js";const C={class:"dark:bg-slate-900 bg-slate-100 p-6 transition-colors"},y=e("h1",{class:"text-3xl mb-4 dark:text-white text-black font-bold"}," Card Searcher ",-1),S={class:"flex flex-col gap-4 md:flex-row md:items-start"},$=e("h2",{class:"text-2xl dark:text-white font-semibold py-6 mx-4 border-b border-slate-900/10 dark:border-slate-50/[0.06] transition-colors"}," Cards ",-1),N={class:"hover:shadow-lg transition-shadow duration-300 ease-in-out w-fit rounded-lg hover:transform hover:scale-105 justify-self-center"},P=["href"],E=f({__name:"CardSearcherView",setup(B){const u=m(),{language:d}=h(u),r=l(null),o=l(null),s=l({cardName:"",clans:[],charTypes:[],tribeNames:[],cardSets:[],costs:[],atks:[],lifes:[],rarities:[],format:{},restrictedCounts:[],resurgentProperty:{}});return _([s,d],async()=>{r.value=null,o.value=null;const{cards:n,error:t}=await g(s);r.value=n.value,o.value=t.value},{debounce:500,immediate:!0,deep:!0,maxWait:2e3}),(n,t)=>(p(),v("div",C,[y,e("div",S,[c(x,{selectedProperties:s.value,"onUpdate:selectedProperties":t[0]||(t[0]=a=>s.value=a),class:"md:sticky md:top-[6.5rem] w-full md:w-2/6 xl:w-1/4 p-6 overflow-y-auto h-[80vh] mb-6"},null,8,["selectedProperties"]),c(b,{"filtered-cards":r.value,"fetch-error":o.value,class:"w-full md:w-4/6 xl:w-3/4"},{heading:i(()=>[$]),card:i(({card:a})=>[e("div",N,[e("a",{href:`https://shadowverse-portal.com/card/${a.card_id}?lang=${w(d)}`},[c(k,{card:a,class:"m-1"},null,8,["card"])],8,P)])]),_:1},8,["filtered-cards","fetch-error"])])]))}});export{E as default};