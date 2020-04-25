(this.webpackJsonpseis=this.webpackJsonpseis||[]).push([[0],{27:function(c,e,r){},32:function(c,e,r){c.exports=r(49)},42:function(c,e,r){},49:function(c,e,r){"use strict";r.r(e);var o=r(0),t=r.n(o),l=r(11),n=r.n(l),a=r(4),i=r(15),y=(r(42),r(29)),s=r(6),u=(r(27),r(51)),b=r(13),d=r(14),g=r(52),x=r(53);var m=Object(i.b)({name:"game",initialState:[{id:"g1",color:"green",cell:"g00"},{id:"g2",color:"green",cell:"g01"},{id:"g3",color:"green",cell:"g02"},{id:"g4",color:"green",cell:"g03"},{id:"y1",color:"yellow",cell:"y00"},{id:"y2",color:"yellow",cell:"y01"},{id:"y3",color:"yellow",cell:"y02"},{id:"y4",color:"yellow",cell:"y03"},{id:"b1",color:"blue",cell:"b00"},{id:"b2",color:"blue",cell:"b01"},{id:"b3",color:"blue",cell:"b02"},{id:"b4",color:"blue",cell:"b03"},{id:"r1",color:"red",cell:"r00"},{id:"r2",color:"red",cell:"r01"},{id:"r3",color:"red",cell:"r02"},{id:"r4",color:"red",cell:"r03"}],reducers:{movePiece:function(c,e){var r=e.payload;console.log(r);var o=c.find((function(c){return c.cell===r.cell}));o&&(o.cell=function(c,e){return{green:["g00","g01","g02","g03"],yellow:["y00","y01","y02","y03"],blue:["b00","b01","b02","b03"],red:["r00","r01","r02","r03"]}[e].find((function(e){return!c.find((function(c){return c.cell===e}))}))}(c,o.color)),c.find((function(c){return c.id===r.piece})).cell=r.cell}}}),f=m.actions.movePiece,p=m.reducer,v="ontouchstart"in window||"onmsgesturechange"in window,h={movePiece:f};var w=Object(a.b)(null,h)((function(c){var e=c.movePiece,r=c.color,o=c.id,l=Object(g.a)({item:{type:"piece",color:r,id:o},collect:function(c){return{isDragging:!!c.isDragging()}},end:function(c,r){var t=r.getDropResult();t&&e({piece:o,cell:t.cell})}}),n=Object(s.a)(l,2),a=n[0].isDragging,i=n[1];return t.a.createElement("span",{ref:i,className:"piece",style:{backgroundColor:r,cursor:"move",opacity:a?.5:1}},o)}));function O(){return t.a.createElement("div",{className:"cell spacer"})}function j(c){var e=c.id,r=c.color,o=c.children,l=Object(x.a)({accept:"piece",drop:function(){return{cell:e}},collect:function(c){return{isOver:!!c.isOver(),canDrop:!!c.canDrop()}},canDrop:function(c,e){return!r||r===c.color}}),n=Object(s.a)(l,2),a=n[0],i=a.isOver,y=a.canDrop,u=n[1];return t.a.createElement("div",{ref:u,className:"cell",style:{position:"relative"}},t.a.createElement("div",{className:"spot "+r},o),i&&y&&t.a.createElement("div",{style:{position:"absolute",top:0,left:0,height:"100%",width:"100%",zIndex:1,opacity:.5,backgroundColor:"yellow"}}))}Object(a.b)((function(c){return{gameState:c}}))((function(c){var e,r=c.gameState,o={"00":{color:"green",start:!0},"01":{color:"green",start:!0},"05":{},"06":{},"07":{},"0b":{color:"yellow",start:!0},"0c":{color:"yellow",start:!0},10:{color:"green",start:!0},11:{color:"green",start:!0},15:{},16:{color:"yellow"},17:{},"1b":{color:"yellow",start:!0},"1c":{color:"yellow",start:!0},25:{},26:{color:"yellow"},27:{},35:{},36:{color:"yellow"},37:{},45:{},46:{color:"yellow"},47:{},50:{},51:{},52:{},53:{},54:{},55:{safe:!0},57:{safe:!0},58:{},59:{},"5a":{},"5b":{},"5c":{},60:{},61:{color:"green"},62:{color:"green"},63:{color:"green"},64:{color:"green"},68:{color:"blue"},69:{color:"blue"},"6a":{color:"blue"},"6b":{color:"blue"},"6c":{},70:{},71:{},72:{},73:{},74:{},75:{safe:!0},77:{safe:!0},78:{},79:{},"7a":{},"7b":{},"7c":{},85:{},86:{color:"red"},87:{},95:{},96:{color:"red"},97:{},a5:{},a6:{color:"red"},a7:{},b0:{color:"red",start:!0},b1:{color:"red",start:!0},b5:{},b6:{color:"red"},b7:{},bb:{color:"blue",start:!0},bc:{color:"blue",start:!0},c0:{color:"red",start:!0},c1:{color:"red",start:!0},c5:{},c6:{},c7:{},cb:{color:"blue",start:!0},cc:{color:"blue",start:!0}},l={},n=Object(y.a)(r);try{for(n.s();!(e=n.n()).done;){var a=e.value;l[a.cell]=t.a.createElement(w,{color:a.color,id:a.id})}}catch(m){n.e(m)}finally{n.f()}for(var i=[],s=0;s<13;s++)for(var g=0;g<13;g++){var x=s.toString(16)+g.toString(16);x in o?i.push(t.a.createElement(j,Object.assign({id:x,key:x},o[x]),l[x]||null)):i.push(t.a.createElement(O,{key:x}))}return t.a.createElement(u.a,{backend:v?d.a:b.a},t.a.createElement("div",{className:"Board"},i))})),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D=r(7),E=r(30),k=r.n(E),N=r(25),S=r.n(N),P="ontouchstart"in window||"onmsgesturechange"in window,B={g00:{cx:20,cy:80},g01:{cx:40,cy:60},g02:{cx:60,cy:40},g03:{cx:80,cy:20},y00:{cx:320,cy:20},y01:{cx:340,cy:40},y02:{cx:360,cy:60},y03:{cx:380,cy:80},b00:{cx:320,cy:380},b01:{cx:340,cy:360},b02:{cx:360,cy:340},b03:{cx:380,cy:320},r00:{cx:20,cy:320},r01:{cx:40,cy:340},r02:{cx:60,cy:360},r03:{cx:80,cy:380},g10:{cx:20,cy:170},g11:{cx:50,cy:170},g12:{cx:80,cy:170},g13:{cx:110,cy:170},g14:{cx:140,cy:170},g15:{cx:170,cy:170},g16:{cx:170,cy:140},g17:{cx:170,cy:110},g18:{cx:170,cy:80},g19:{cx:170,cy:50},g1a:{cx:170,cy:20},g1b:{cx:200,cy:20},y10:{cx:230,cy:20},y11:{cx:230,cy:50},y12:{cx:230,cy:80},y13:{cx:230,cy:110},y14:{cx:230,cy:140},y15:{cx:230,cy:170},y16:{cx:260,cy:170},y17:{cx:290,cy:170},y18:{cx:320,cy:170},y19:{cx:350,cy:170},y1a:{cx:380,cy:170},y1b:{cx:380,cy:200},b10:{cx:380,cy:230},b11:{cx:350,cy:230},b12:{cx:320,cy:230},b13:{cx:290,cy:230},b14:{cx:260,cy:230},b15:{cx:230,cy:230},b16:{cx:230,cy:260},b17:{cx:230,cy:290},b18:{cx:230,cy:320},b19:{cx:230,cy:350},b1a:{cx:230,cy:380},b1b:{cx:200,cy:380},r10:{cx:170,cy:380},r11:{cx:170,cy:350},r12:{cx:170,cy:320},r13:{cx:170,cy:290},r14:{cx:170,cy:260},r15:{cx:170,cy:230},r16:{cx:140,cy:230},r17:{cx:110,cy:230},r18:{cx:80,cy:230},r19:{cx:50,cy:230},r1a:{cx:20,cy:230},r1b:{cx:20,cy:200},g20:{cx:50,cy:200},g21:{cx:80,cy:200},g22:{cx:110,cy:200},g23:{cx:140,cy:200},y20:{cx:200,cy:50},y21:{cx:200,cy:80},y22:{cx:200,cy:110},y23:{cx:200,cy:140},b20:{cx:350,cy:200},b21:{cx:320,cy:200},b22:{cx:290,cy:200},b23:{cx:260,cy:200},r20:{cx:200,cy:350},r21:{cx:200,cy:320},r22:{cx:200,cy:290},r23:{cx:200,cy:260}},W={color:{g:"green",y:"yellow",r:"red",b:"blue"},type:{0:"start",1:"common",2:"home"}};function C(c){return{id:c,color:W.color[c[0]],type:W.type[c[1]],safe:"1"===c[1]&&"5"===c[2],coords:B[c]}}var R=Object(a.b)(null,{movePiece:f})((function(c){var e,r=c.movePiece,o=c.cell,l=c.color,n=c.id,a=c.scale,i=void 0===a?1:a,y=Object(g.a)({item:{type:"piece",color:l,id:n},collect:function(c){return{isDragging:!!c.isDragging()}},end:function(c,e){var o=e.getDropResult();console.log("DropResult",o),console.log(r),o&&r({piece:n,cell:o.cell})}}),u=Object(s.a)(y,2),b=u[0].isDragging,d=u[1],m=Object(x.a)({accept:"piece",drop:function(){return{cell:o.id}},collect:function(c){return{isOver:!!c.isOver(),canDrop:!!c.canDrop()}},canDrop:function(c,e){return!0}}),f=Object(s.a)(m,2),p=f[0],v=p.isOver,h=p.canDrop,w=f[1],O=S()((e={Piece:!0},Object(D.a)(e,l,!0),Object(D.a)(e,"dragging",b),Object(D.a)(e,"over",v&&h),e)),j={top:(o.coords.cx-10)*i,left:(o.coords.cy-10)*i,height:20*i,width:20*i,padding:2*i};return t.a.createElement("div",{ref:d,className:O,style:j},t.a.createElement("div",{ref:w,style:{height:"100%",width:"100%"}}))}));function I(c){var e,r=c.id,o=c.color,l=c.type,n=c.safe,a=c.coords,i=c.scale,y=void 0===i?1:i,u=Object(x.a)({accept:"piece",drop:function(){return{cell:r}},collect:function(c){return{isOver:!!c.isOver(),canDrop:!!c.canDrop()}},canDrop:function(c,e){return"common"===l||o===c.color}}),b=Object(s.a)(u,2),d=b[0],g=d.isOver,m=d.canDrop,f=b[1],p=S()((e={Cell:!0},Object(D.a)(e,o,"common"!==l),Object(D.a)(e,"safe",n),Object(D.a)(e,"over",g&&m),e)),v={top:(a.cx-10)*y,left:(a.cy-10)*y,height:20*y,width:20*y,borderWidth:2*y};return t.a.createElement("div",{ref:f,className:p,style:v})}var J=Object(a.b)((function(c){return{gameState:c}}))((function(c){var e=c.gameState,r=k()(),o=r.innerHeight,l=r.innerWidth,n=Math.min(o,l)-40,a=n/410;return t.a.createElement(u.a,{backend:P?d.a:b.a},t.a.createElement("div",{className:"Board",style:{width:n,height:n}},Object.keys(B).map((function(c){var e=C(c);return t.a.createElement(I,Object.assign({key:c,scale:a},e))})),e.map((function(c){var e=c.id,r=c.color,o=c.cell;return t.a.createElement(R,{key:e,id:e,color:r,scale:a,cell:C(o)})}))))})),M=Object(i.a)({reducer:p});n.a.render(t.a.createElement(t.a.StrictMode,null,t.a.createElement(a.a,{store:M},t.a.createElement(J,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(c){c.unregister()})).catch((function(c){console.error(c.message)}))}},[[32,1,2]]]);
//# sourceMappingURL=main.4a7a2985.chunk.js.map