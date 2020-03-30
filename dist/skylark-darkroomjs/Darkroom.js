/**
 * skylark-darkroomjs - A version of darkroomjs that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-darkroomjs/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-noder","skylark-domx-finder","skylark-widgets-base/Widget","skylark-fabric"],function(t,e,i,n,a,s){"use strict";var o={};function r(t){return{height:Math.abs(t.getScaledWidth()*Math.sin(t.angle*Math.PI/180))+Math.abs(t.getScaledHeight()*Math.cos(t.angle*Math.PI/180)),width:Math.abs(t.getScaledHeight()*Math.sin(t.angle*Math.PI/180))+Math.abs(t.getScaledWidth()*Math.cos(t.angle*Math.PI/180))}}function h(t){this.element=t}function l(t){this.element=t}function c(t){this.element=t}h.prototype={createButtonGroup:function(t){var e=document.createElement("div");return e.className="darkroom-button-group",this.element.appendChild(e),new l(e)}},l.prototype={createButton:function(t){t=e.mixin({},{image:"help",type:"default",group:"default",hide:!1,disabled:!1},t);var i=document.createElement("button");i.type="button",i.className="darkroom-button darkroom-button-"+t.type,i.innerHTML='<svg class="darkroom-icon"><use xlink:href="#'+t.image+'" /></svg>',this.element.appendChild(i);var n=new c(i);return n.hide(t.hide),n.disable(t.disabled),n}},c.prototype={addEventListener:function(t,e){this.element.addEventListener?this.element.addEventListener(t,e):this.element.attachEvent&&this.element.attachEvent("on"+t,e)},removeEventListener:function(t,e){this.element.removeEventListener&&this.element.removeEventListener(t,e)},active:function(t){t?this.element.classList.add("darkroom-button-active"):this.element.classList.remove("darkroom-button-active")},hide:function(t){t?this.element.classList.add("darkroom-button-hidden"):this.element.classList.remove("darkroom-button-hidden")},disable:function(t){this.element.disabled=!!t}};var m=a.inherit({klassName:"Darkroom",_construct:function(t,e,i){"string"==typeof t&&(t=n.find(t)),this._initializeDOM(t),this.overrided(this.containerElement,e),this.plugins={},this._initializeImage(),this._initializePlugins(),this.refresh(function(){this.options.initialize.bind(this).call()}.bind(this))},containerElement:null,canvas:null,image:null,sourceCanvas:null,sourceImage:null,originalImageElement:null,transformations:[],options:{minWidth:null,minHeight:null,maxWidth:null,maxHeight:null,ratio:null,backgroundColor:"#fff",plugins:{},initialize:function(){}},selfDestroy:function(){var t=this.containerElement,e=new Image;e.onload=function(){t.parentNode.replaceChild(e,t)},e.src=this.sourceImage.toDataURL()},addEventListener:function(t,e){var i=this.canvas.getElement();i.addEventListener?i.addEventListener(t,e):i.attachEvent&&i.attachEvent("on"+t,e)},dispatchEvent:function(t){var e=document.createEvent("Event");e.initEvent(t,!0,!0),this.canvas.getElement().dispatchEvent(e)},refresh:function(t){var e=new Image;e.onload=function(){this._replaceCurrentImage(new s.Image(e)),t&&t()}.bind(this),e.src=this.sourceImage.toDataURL()},_replaceCurrentImage:function(t){this.image&&this.image.canvas.remove(this.image),this.image=t,this.image.selectable=!1;var e=r(this.image),i=e.width,n=e.height;if(null!==this.options.ratio){var a=+this.options.ratio,s=i/n;s>a?n=i/a:s<a&&(i=n*a)}var o,h=1,l=1;null!==this.options.maxWidth&&this.options.maxWidth<i&&(h=this.options.maxWidth/i),null!==this.options.maxHeight&&this.options.maxHeight<n&&(l=this.options.maxHeight/n),o=Math.min(h,l),h=1,l=1,null!==this.options.minWidth&&this.options.minWidth>i&&(h=this.options.minWidth/i),null!==this.options.minHeight&&this.options.minHeight>n&&(l=this.options.minHeight/n);var c=Math.max(h,l)*o;i*=c,n*=c,this.image.scaleX=1*c,this.image.scaleY=1*c,this.canvas.add(this.image),this.canvas.setWidth(i),this.canvas.setHeight(n),this.canvas.centerObject(this.image),this.image.setCoords()},applyTransformation:function(t){this.transformations.push(t),t.applyTransformation(this.sourceCanvas,this.sourceImage,this._postTransformation.bind(this))},_postTransformation:function(t){t&&(this.sourceImage=t),this.refresh(function(){this.dispatchEvent("core:transformation")}.bind(this))},reinitializeImage:function(){this.canvas.remove(this.sourceImage),this._initializeImage(),this._popTransformation(this.transformations.slice())},_popTransformation:function(t){if(0===t.length)return this.dispatchEvent("core:reinitialized"),void this.refresh();t.shift().applyTransformation(this.sourceCanvas,this.sourceImage,function(e){e&&(this.sourceImage=e),this._popTransformation(t)}.bind(this))},_initializeDOM:function(t){var e=document.createElement("div");e.className="darkroom-container";var i=document.createElement("div");i.className="darkroom-toolbar",e.appendChild(i);var n=document.createElement("div");n.className="darkroom-image-container";var a=this.canvasElement=document.createElement("canvas");n.appendChild(a),e.appendChild(n);var s=document.createElement("div");s.className="darkroom-source-container",s.style.display="none";var o=this.sourceCanvasElement=document.createElement("canvas");s.appendChild(o),e.appendChild(s),t.parentNode.replaceChild(e,t),t.style.display="none",e.appendChild(t),this.containerElement=e,this.originalImageElement=t,this.toolbar=new h(i)},_initializeImage:function(){this.canvas=new s.Canvas(this.canvasElement,{selection:!1,backgroundColor:this.options.backgroundColor}),this.sourceCanvas=new s.Canvas(this.sourceCanvasElement,{selection:!1,backgroundColor:this.options.backgroundColor}),this.sourceImage=new s.Image(this.originalImageElement,{selectable:!1,evented:!1,lockMovementX:!0,lockMovementY:!0,lockRotation:!0,lockScalingX:!0,lockScalingY:!0,lockUniScaling:!0,hasControls:!1,hasBorders:!1}),this.sourceCanvas.add(this.sourceImage);var t=r(this.sourceImage),e=t.width,i=t.height;this.sourceCanvas.setWidth(e),this.sourceCanvas.setHeight(i),this.sourceCanvas.centerObject(this.sourceImage),this.sourceImage.setCoords()},_initializePlugins:function(){for(var t in o){var e=o[t],i=this.options.plugins[t];!1!==i&&(o.hasOwnProperty(t)&&(this.plugins[t]=new e.ctor(this,i)))}}});return m.Plugin=e.Evented.inherit({klassName:"Plugin",defaults:{},init:function(t,i){this.Darkroom=t,this.options=e.mixin({},this.defaults,i)}}),m.Transformation=e.Evented.inherit({klassName:"Transformation",init:function(t){this.options=t}}),m.installPlugin=function(t){o[t.name]=t},t.attach("intg.Darkroom",m)});
//# sourceMappingURL=sourcemaps/Darkroom.js.map
