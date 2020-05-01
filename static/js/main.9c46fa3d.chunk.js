(this.webpackJsonpseis=this.webpackJsonpseis||[]).push([[0],{49:function(e,n,t){e.exports=t(95)},54:function(e,n,t){},55:function(e,n,t){},91:function(e,n){},95:function(e,n,t){"use strict";t.r(n);var i=t(1),o=t.n(i),r=t(44),a=t.n(r);t(54),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var l=t(47),c=(t(55),t(15)),d=t(45),u=t.n(d),s=["red","blue","yellow","green"],p={boardSize:410,pieceSize:20,players:4,cells:[[10,220],[40,220],[70,220],[100,220],[130,220],[160,220],[160,250],[160,280],[160,310],[160,340],[160,370],[190,370],[220,370],[220,340],[220,310],[220,280],[220,250],[220,220],[250,220],[280,220],[310,220],[340,220],[370,220],[370,190],[370,160],[340,160],[310,160],[280,160],[250,160],[220,160],[220,130],[220,100],[220,70],[220,40],[220,10],[190,10],[160,10],[160,40],[160,70],[160,100],[160,130],[160,160],[130,160],[100,160],[70,160],[40,160],[10,160],[10,190],[40,190],[70,190],[100,190],[130,190],[190,340],[190,310],[190,280],[190,250],[340,190],[310,190],[280,190],[250,190],[190,40],[190,70],[190,100],[190,130],[10,310],[30,330],[50,350],[70,370],[310,370],[330,350],[350,330],[370,310],[310,10],[330,30],[350,50],[370,70],[10,70],[30,50],[50,30],[70,10]]},f=t(2),m=t(0),v={pieces:[{playerId:"0",id:0,position:64},{playerId:"0",id:1,position:65},{playerId:"0",id:2,position:66},{playerId:"0",id:3,position:67},{playerId:"1",id:0,position:68},{playerId:"1",id:1,position:69},{playerId:"1",id:2,position:70},{playerId:"1",id:3,position:71},{playerId:"2",id:0,position:72},{playerId:"2",id:1,position:73},{playerId:"2",id:2,position:74},{playerId:"2",id:3,position:75},{playerId:"3",id:0,position:76},{playerId:"3",id:1,position:77},{playerId:"3",id:2,position:78},{playerId:"3",id:3,position:79}],players:[{id:"0",position:0,name:"Player 1",color:"red"},{id:"1",position:1,name:"Player 2",color:"blue"},{id:"2",position:2,name:"Player 3",color:"yellow"},{id:"3",position:3,name:"Player 4",color:"green"}]};function y(e,n){var t=e.players.find((function(e){return e.id===n.currentPlayer}));if(void 0===t)throw Error("undefined player");return t}function h(e,n){var t=e.players.find((function(e){return e.id===n}));if(void 0===t)throw Error("undefined player");return t}function E(e,n,t){if(void 0===e.dieRoll)throw new Error("Cannot calculate position from current game state.");var i=y(e,n),o=12*i.position;if(t.position>=64)return 1===e.dieRoll||6===e.dieRoll?o-1+e.dieRoll:t.position;var r=(48+t.position-o)%48+e.dieRoll;return r>=48?4*i.position+r:(r+o)%48}var b={name:"seis",setup:function(){return v},moves:{rollDie:function(e,n){var t,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return"undefined"!==typeof e.dieRoll||i>6||i<0?m.f:Object(f.a)({},e,{dieRoll:i>0?i:null===(t=n.random)||void 0===t?void 0:t.D6()})},movePiece:function(e,n,t){if(void 0===e.dieRoll)return m.f;var i=function(e,n,t){var i=e.pieces.find((function(e){return e.playerId===n.currentPlayer&&e.id===t}));if(!i)throw new Error("Piece not found");return i}(e,n,t),o=E(e,n,i);if(!n.events||!n.events.endTurn)throw new Error("ctx.events is undefined");if(e.dieRoll<6||i.position===o){var r;if(!(null===(r=n.events)||void 0===r?void 0:r.endTurn))throw new Error("ctx.events.endTurn is undefined");n.events.endTurn()}return Object(f.a)({},e,{dieRoll:void 0,pieces:e.pieces.map((function(e){return e===i?Object(f.a)({},e,{position:o}):e}))})}},turn:{}},I=function(e){var n=e.color,t=e.x,i=e.y,r=e.h,a=e.highlight,l=e.children,c={top:t,left:i,height:r,width:r,borderWidth:.1*r};return o.a.createElement("div",{className:"Cell "+n+(a?" highlight":""),style:c},l)},g=function(e){var n=e.value,t=e.onRoll,i=n?String.fromCodePoint(n+9855):"roll";return o.a.createElement("div",{className:"Dice",onClick:function(e){!n&&t&&t()}},i)},w=function(e){e.G,e.ctx;var n=e.player,t=e.piece,i=e.enabled,r=e.onSelect,a=e.onActivate,l=e.onDeactivate,c=function(e){};return o.a.createElement("div",{className:"Piece "+n.color+(i?" enabled":""),onClick:function(){(r||c)(t)},onMouseEnter:function(){(a||c)(t)},onMouseLeave:function(){(l||c)(t)}})},P=function(e){var n=e.G,t=e.ctx,r=e.moves,a=Object(i.useState)(),l=Object(c.a)(a,2),d=l[0],m=l[1],v=u()(),b=(v.innerHeight,v.innerWidth,y(n,t));n.dieRoll?"".concat(b.name," rolled a ").concat(n.dieRoll):"Waiting for ".concat(b.name," to roll...");var P=n.dieRoll?function(e,n){return e.pieces.filter((function(e){return e.playerId===n.currentPlayer})).map((function(t){var i=E(e,n,t);return t.position===i?t:Object(f.a)({},t,{position:i})})).filter((function(n){return-1===e.pieces.indexOf(n)}))}(n,t):[],R=P.find((function(e){return d&&e.playerId===d.playerId&&e.id===d.id})),N=function(e){P.find((function(n){return n.playerId===e.playerId&&n.id===e.id}))?(r.movePiece(e.id),m(void 0)):console.log("this piece cannot be moved")},x=function(e){P.find((function(n){return n.playerId===e.playerId&&n.id===e.id}))||console.log("this piece cannot be activated"),m(e)},k=function(e){m(void 0)};return o.a.createElement("div",{className:"BoardWrapper"},o.a.createElement("div",{className:"PlayerName1"},"Player 1"),o.a.createElement("div",{className:"PlayerName2"},"Player 2"),o.a.createElement("div",{className:"PlayerName3"},"Player 3"),o.a.createElement("div",{className:"PlayerName4"},"Player 4"),o.a.createElement("div",{className:"Board",style:{width:410,height:410}},o.a.createElement("div",{className:"controls controls-".concat(b.position)},o.a.createElement(g,{value:n.dieRoll,onRoll:function(){r.rollDie()}}),n.dieRoll&&0===P.length&&o.a.createElement("button",{onClick:function(){r.movePiece(0)}},"Skip")),p.cells.map((function(e,i){var r=Object(c.a)(e,2),a=r[0],l=r[1],d=n.pieces.find((function(e){return e.position===i})),u=i>=12*p.players?s[Math.floor(i/p.players)%p.players]:"";return o.a.createElement(I,{key:i,x:1*a,y:1*l,h:20,color:u,highlight:R&&R.position===i},d&&o.a.createElement(w,{G:n,ctx:t,player:h(n,d.playerId),piece:d,onSelect:N,onActivate:x,onDeactivate:k,enabled:P.some((function(e){return e.playerId===d.playerId&&e.id===d.id}))}))}))),o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("button",null,"1"),o.a.createElement("button",null,"2"),o.a.createElement("button",null,"3"),o.a.createElement("br",null),o.a.createElement("button",null,"4"),o.a.createElement("button",null,"5"),o.a.createElement("button",null,"6"),o.a.createElement("br",null),o.a.createElement("button",null,"?")))},R=Object(l.a)({game:b,board:P});var N=function(){return o.a.createElement("div",null,o.a.createElement(R,{debug:!0}))};a.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(N,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[49,1,2]]]);
//# sourceMappingURL=main.9c46fa3d.chunk.js.map