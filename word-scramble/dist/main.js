(()=>{var e={912:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>a});var s=n(645),r=n.n(s)()((function(e){return e[1]}));r.push([e.id,"\n.won[data-v-10307660] {\n  background: green;\n}\n.lost[data-v-10307660] {\n  background: red;\n}\n",""]);const a=r},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,s){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(s)for(var a=0;a<this.length;a++){var o=this[a][0];null!=o&&(r[o]=!0)}for(var i=0;i<e.length;i++){var u=[].concat(e[i]);s&&r[u[0]]||(n&&(u[2]?u[2]="".concat(n," and ").concat(u[2]):u[2]=n),t.push(u))}},t}},906:(e,t,n)=>{var s=n(912);"string"==typeof s&&(s=[[e.id,s,""]]),s.locals&&(e.exports=s.locals),(0,n(346).Z)("4cbaaf1e",s,!1,{})},346:(e,t,n)=>{"use strict";function s(e,t){for(var n=[],s={},r=0;r<t.length;r++){var a=t[r],o=a[0],i={id:e+":"+r,css:a[1],media:a[2],sourceMap:a[3]};s[o]?s[o].parts.push(i):n.push(s[o]={id:o,parts:[i]})}return n}n.d(t,{Z:()=>m});var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},o=r&&(document.head||document.getElementsByTagName("head")[0]),i=null,u=0,l=!1,d=function(){},c=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function m(e,t,n,r){l=n,c=r||{};var o=s(e,t);return v(o),function(t){for(var n=[],r=0;r<o.length;r++){var i=o[r];(u=a[i.id]).refs--,n.push(u)}for(t?v(o=s(e,t)):o=[],r=0;r<n.length;r++){var u;if(0===(u=n[r]).refs){for(var l=0;l<u.parts.length;l++)u.parts[l]();delete a[u.id]}}}}function v(e){for(var t=0;t<e.length;t++){var n=e[t],s=a[n.id];if(s){s.refs++;for(var r=0;r<s.parts.length;r++)s.parts[r](n.parts[r]);for(;r<n.parts.length;r++)s.parts.push(g(n.parts[r]));s.parts.length>n.parts.length&&(s.parts.length=n.parts.length)}else{var o=[];for(r=0;r<n.parts.length;r++)o.push(g(n.parts[r]));a[n.id]={id:n.id,refs:1,parts:o}}}}function h(){var e=document.createElement("style");return e.type="text/css",o.appendChild(e),e}function g(e){var t,n,s=document.querySelector("style["+p+'~="'+e.id+'"]');if(s){if(l)return d;s.parentNode.removeChild(s)}if(f){var r=u++;s=i||(i=h()),t=S.bind(null,s,r,!1),n=S.bind(null,s,r,!0)}else s=h(),t=b.bind(null,s),n=function(){s.parentNode.removeChild(s)};return t(e),function(s){if(s){if(s.css===e.css&&s.media===e.media&&s.sourceMap===e.sourceMap)return;t(e=s)}else n()}}var _,y=(_=[],function(e,t){return _[e]=t,_.filter(Boolean).join("\n")});function S(e,t,n,s){var r=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=y(t,r);else{var a=document.createTextNode(r),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(a,o[t]):e.appendChild(a)}}function b(e,t){var n=t.css,s=t.media,r=t.sourceMap;if(s&&e.setAttribute("media",s),c.ssrId&&e.setAttribute(p,t.id),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={id:s,exports:{}};return e[s](r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";var e=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main"},[n("h1",[e._v("Word Scramble")]),e._v(" "),e.name?n("div",[n("p",[e._v("Welcome "+e._s(e.name))]),e._v(" "),n("div",[n("strong",[e._v(e._s(e.mysteryWords[0][0]))])]),e._v(" "),n("p",[e._v(e._s(e.mysteryWords[0][1]))])]):e._e(),e._v(" "),n("label",[e._v(e._s(e.label)+"\n    "),n("input",{directives:[{name:"show",rawName:"v-show",value:null===e.gameState.won||null===e.gameState.lost,expression:"gameState.won === null || gameState.lost === null"},{name:"model",rawName:"v-model",value:e.inputVal,expression:"inputVal"}],attrs:{type:"text"},domProps:{value:e.inputVal},on:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.submitFn(t)},input:function(t){t.target.composing||(e.inputVal=t.target.value)}}})]),e._v(" "),n("guess-message",{attrs:{gameState:e.gameState,guesses:e.guesses},on:{"reset-state":e.resetState}},[e._v("\n    "+e._s(e.guessMessage)+"\n  ")])],1)};e._withStripped=!0;var t=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.guesses.length>0,expression:"guesses.length > 0"}]},[n("span",{class:{won:e.gameState.won,lost:!e.gameState.won}},[e._t("default")],2),e._v(" "),n("button",{directives:[{name:"show",rawName:"v-show",value:e.gameState.won||e.gameState.lost,expression:"gameState.won || gameState.lost"}],on:{click:function(t){return e.$emit("reset-state")}}},[e._v("\n    Play again\n  ")])])};t._withStripped=!0;function s(e,t,n,s,r,a,o,i){var u,l="function"==typeof e?e.options:e;if(t&&(l.render=t,l.staticRenderFns=n,l._compiled=!0),s&&(l.functional=!0),a&&(l._scopeId="data-v-"+a),o?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),r&&r.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},l._ssrRegister=u):r&&(u=i?function(){r.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:r),u)if(l.functional){l._injectStyles=u;var d=l.render;l.render=function(e,t){return u.call(t),d(e,t)}}else{var c=l.beforeCreate;l.beforeCreate=c?[].concat(c,u):[u]}return{exports:e,options:l}}n(906);var r=s({props:["gameState","guesses"]},t,[],!1,null,"10307660",null);r.options.__file="src/components/GuessMessage.vue";var a=s({data:function(){return this.initialState()},components:{"guess-message":r.exports},methods:{startGame(){this.name=this.inputVal,this.inputVal=""},submitGuess(){this.guesses.push(this.inputVal),this.inputVal==this.mysteryWords[0][0]?this.gameState={won:!0,lost:!1}:this.guesses.length>2&&(this.gameState={won:!1,lost:!0}),this.inputVal=""},initialState:()=>({inputVal:"",name:"",mysteryWords:[["howdy","this is a howdy hint"]],gameState:{won:null,lost:null},guesses:[]}),resetState(){Object.assign(this.$data,this.initialState())}},computed:{label:function(){return this.name?"Guess Word":"Name"},submitFn:function(){return this.name?this.submitGuess:this.startGame},guessMessage:function(){return this.gameState.won?"You Won":"Please Try Again"}}},e,[],!1,null,null,null);a.options.__file="src/components/Main.vue";const o=a.exports;new Vue({el:"#app",components:{"main-component":o},template:"<main-component/>"})})()})();