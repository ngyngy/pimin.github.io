(function(b,a){if(typeof window==="object"){window[b]=a()}})("Ribbons",function(){var d=window,c=document.body,b=document.documentElement;var f=function(){if(arguments.length===1){if(Array.isArray(arguments[0])){var i=Math.round(f(0,arguments[0].length-1));return arguments[0][i]}return f(0,arguments[0])}else{if(arguments.length===2){return Math.random()*(arguments[1]-arguments[0])+arguments[0]}}return 0};var h=function(k){var j=Math.max(0,d.innerWidth||b.clientWidth||c.clientWidth||0),i=Math.max(0,d.innerHeight||b.clientHeight||c.clientHeight||0),m=Math.max(0,d.pageXOffset||b.scrollLeft||c.scrollLeft||0)-(b.clientLeft||0),l=Math.max(0,d.pageYOffset||b.scrollTop||c.scrollTop||0)-(b.clientTop||0);return{width:j,height:i,ratio:j/i,centerx:j/2,centery:i/2,scrollx:m,scrolly:l}};var g=function(l){var i=h(l),k=l?Math.max(0,l.pageX||l.clientX||0):0,j=l?Math.max(0,l.pageY||l.clientY||0):0;return{mousex:k,mousey:j,centerx:k-i.width/2,centery:j-i.height/2}};var e=function(i,j){this.x=0;this.y=0;this.set(i,j)};e.prototype={constructor:e,set:function(i,j){this.x=i||0;this.y=j||0},copy:function(i){this.x=i.x||0;this.y=i.y||0;return this},multiply:function(i,j){this.x*=i||1;this.y*=j||1;return this},divide:function(i,j){this.x/=i||1;this.y/=j||1;return this},add:function(i,j){this.x+=i||0;this.y+=j||0;return this},subtract:function(i,j){this.x-=i||0;this.y-=j||0;return this},clampX:function(j,i){this.x=Math.max(j,Math.min(this.x,i));return this},clampY:function(j,i){this.y=Math.max(j,Math.min(this.y,i));return this},flipX:function(){this.x*=-1;return this},flipY:function(){this.y*=-1;return this}};var a=function(i){this._canvas=null;this._context=null;this._sto=null;this._width=0;this._height=0;this._scroll=0;this._ribbons=[];this._options={id:"bgCanvas",colorSaturation:"80%",colorBrightness:"60%",colorAlpha:0.65,colorCycleSpeed:6,verticalPosition:"center",horizontalSpeed:200,ribbonCount:3,strokeSize:0,parallaxAmount:-0.5,animateSections:true};this._onDraw=this._onDraw.bind(this);this._onResize=this._onResize.bind(this);this._onScroll=this._onScroll.bind(this);this.setOptions(i);this.init()};a.prototype={constructor:a,setOptions:function(i){if(typeof i==="object"){for(var j in i){if(i.hasOwnProperty(j)){this._options[j]=i[j]}}}},init:function(){try{this._canvas=document.createElement("canvas");this._canvas.style.display="block";this._canvas.style.position="fixed";this._canvas.style.margin="0";this._canvas.style.padding="0";this._canvas.style.border="0";this._canvas.style.outline="0";this._canvas.style.left="0";this._canvas.style.top="0";this._canvas.style.width="100%";this._canvas.style.height="100%";this._canvas.style["z-index"]="-1";this._canvas.style["background-color"]=this._options.backgroundColor;this._canvas.id=this._options.id;this._onResize();this._context=this._canvas.getContext("2d");this._context.clearRect(0,0,this._width,this._height);this._context.globalAlpha=this._options.colorAlpha;window.addEventListener("resize",this._onResize);window.addEventListener("scroll",this._onScroll);document.body.appendChild(this._canvas)}catch(i){console.warn("Canvas Context Error: "+i.toString());return}this._onDraw()},addRibbon:function(){var l=Math.round(f(1,9))>5?"right":"left",t=1000,p=200,n=0-p,u=this._width+p,w=0,v=0,j=l==="right"?n:u,i=Math.round(f(0,this._height));if(/^(top|min)$/i.test(this._options.verticalPosition)){i=0+p}else{if(/^(middle|center)$/i.test(this._options.verticalPosition)){i=this._height/2}else{if(/^(bottom|max)$/i.test(this._options.verticalPosition)){i=this._height-p}}}if(this._options.parallaxAmount!==0){i+=this._scroll}var k=[],s=new e(j,i),r=new e(j,i),q=null,m=Math.round(f(0,360)),o=0;while(true){if(t<=0){break}t--;w=Math.round((Math.random()*1-0.2)*this._options.horizontalSpeed);v=Math.round((Math.random()*1-0.5)*(this._height*0.25));q=new e();q.copy(r);if(l==="right"){q.add(w,v);if(r.x>=u){break}}else{if(l==="left"){q.subtract(w,v);if(r.x<=n){break}}}k.push({point1:new e(s.x,s.y),point2:new e(r.x,r.y),point3:q,color:m,delay:o,dir:l,alpha:0,phase:0});s.copy(r);r.copy(q);o+=4;m+=this._options.colorCycleSpeed}this._ribbons.push(k)},_drawRibbonSection:function(m){if(m){if(m.phase>=1&&m.alpha<=0){return true}if(m.delay<=0){m.phase+=0.02;m.alpha=Math.sin(m.phase)*1;m.alpha=m.alpha<=0?0:m.alpha;m.alpha=m.alpha>=1?1:m.alpha;if(this._options.animateSections){var j=Math.sin(1+m.phase*Math.PI/2)*0.1;if(m.dir==="right"){m.point1.add(j,0);m.point2.add(j,0);m.point3.add(j,0)}else{m.point1.subtract(j,0);m.point2.subtract(j,0);m.point3.subtract(j,0)}m.point1.add(0,j);m.point2.add(0,j);m.point3.add(0,j)}}else{m.delay-=0.5}var k=this._options.colorSaturation,i=this._options.colorBrightness,n="hsla("+m.color+", "+k+", "+i+", "+m.alpha+" )";this._context.save();if(this._options.parallaxAmount!==0){this._context.translate(0,this._scroll*this._options.parallaxAmount)}this._context.beginPath();this._context.moveTo(m.point1.x,m.point1.y);this._context.lineTo(m.point2.x,m.point2.y);this._context.lineTo(m.point3.x,m.point3.y);this._context.fillStyle=n;this._context.fill();if(this._options.strokeSize>0){this._context.lineWidth=this._options.strokeSize;this._context.strokeStyle=n;this._context.lineCap="round";this._context.stroke()}this._context.restore()}return false},_onDraw:function(){for(var o=0,n=this._ribbons.length;o<n;++o){if(!this._ribbons[o]){this._ribbons.splice(o,1)}}this._context.clearRect(0,0,this._width,this._height);for(var l=0;l<this._ribbons.length;++l){var p=this._ribbons[l],k=p?p.length:0,m=0;for(var j=0;j<k;++j){if(this._drawRibbonSection(p[j])){m++}}if(m>=k){this._ribbons[l]=null}}if(this._ribbons.length<this._options.ribbonCount&&Math.random()>0.99){this.addRibbon()}requestAnimationFrame(this._onDraw)},_onResize:function(j){var i=h(j);this._width=i.width;this._height=i.height;if(this._canvas){this._canvas.width=this._width;this._canvas.height=this._height;if(this._context){this._context.globalAlpha=this._options.colorAlpha}}},_onScroll:function(j){var i=h(j);this._scroll=i.scrolly}};return a});new Ribbons({ribbonCount:5,parallaxAmount:-0.99});
