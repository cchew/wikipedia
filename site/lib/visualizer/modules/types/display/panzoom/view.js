define(["src/util/api","src/util/debug","modules/default/defaultview","src/util/util","lodash","components/jquery.panzoom/dist/jquery.panzoom","components/jquery-mousewheel/jquery.mousewheel"],function(a,b,c,d,e){function f(){}var g=Promise.resolve();return f.prototype=$.extend(!0,{},c,{init:function(){this.dom||(this._id=d.getNextUniqueId(),this.dom=$(' <div id="'+this._id+'"></div>').css("height","100%").css("width","100%"),this.module.getDomContent().html(this.dom))},blank:{picture:function(){this.clearImages()}},inDom:function(){this.resolveReady()},update:{picture:function(){var a=this;g=g.then(function(){return a.clearImages(),a.addImages()}).then(function(){a.panzoomMode(),a.onResize(),a.reorderImages()})}},clearImages:function(){if(!this.images)return void(this.images=[]);for(var a=0;a<this.images.length;a++)this.images[a].$panzoomEl.panzoom("destroy");this.dom.html(""),this.images=[]},reorderImages:function(){for(var a=0;a<this.images.length;a++)this.images[a].$panzoomEl.css("z-index",parseInt(this.images[a].conf.order)||a)},addImages:function(){function c(c){var d=a.getData(c.variable);if(void 0!==d){g[c.variable]=d;var e=parseFloat(c.opacity);if(e&&e>=0&&1>=e)return!0}return b.warn("Panzoom: ignoring invalid configuration line"),!1}var d,f=this,g={},h=this.module.getConfiguration("img");return h=e.filter(h,c),0===h.length&&(h=this._buildConfFromVarsIn(),h=e.filter(h,c)),d=e.map(h,function(a){return new Promise(function(b){var c={},d=$('<div class="parent"><div class="panzoom"><img/></div></div>'),e=d.find("img");e.css("opacity",a.opacity).addClass(a.rendering).attr("src",g[a.variable].get()).load(function(){c.name=a.variable,c.$panzoomEl=d.find(".panzoom"),c.$img=d.find("img"),c.$parent=d.find(".parent"),c.width=this.width,c.height=this.height,c.conf=a,f.dom.append(d),f.images.push(c),b()})})}),Promise.all(d)},panzoomMode:function(){for(var a=this,b=0;b<this.images.length;b++)a.images[b].$panzoomEl.panzoom({increment:.1,maxScale:100,minScale:1e-6,duration:0}),a.images[b].$panzoomEl.on("panzoompan",function(b,c){for(var d=0;d<a.images.length;d++){var e=a.images[d].$panzoomEl.panzoom("instance");e!==c&&e.setMatrix(c.getMatrix())}});a.dom.off("mousewheel.focal"),a.dom.on("mousewheel.focal",function(b){b.preventDefault();var c=1,d=.2;if(a.images.length>0){var e=a.images[0].$panzoomEl.panzoom("getMatrix")[0];c=d*e}var f=b.delta||b.originalEvent.wheelDelta,g=f?0>f:b.originalEvent.deltaY>0;a.images[0].$panzoomEl.panzoom("zoom",g,{increment:c,animate:!1,focal:b});for(var h=a.images[0].$panzoomEl.panzoom("getMatrix"),i=1;i<a.images.length;i++){var j=a.images[i].$panzoomEl.panzoom("instance");j.setMatrix(h)}}),a.dom.off("click.panzoom"),a.dom.on("click.panzoom",function(b){for(var c={},d=0;d<a.images.length;d++){var e=a.images[d].$img[0].getBoundingClientRect(),f={x:Math.floor((b.pageX-e.left)*a.images[d].width/e.width),y:Math.floor((b.pageY-e.top)*a.images[d].height/e.height)};f.x>=0&&f.x<a.images[d].width&&f.y>=0&&f.y<a.images[d].height&&(0===d&&a.module.controller.clickedPixel(f),c[a.images[d].name]=f)}Object.keys(c).length>0&&a.module.controller.allClickedPixels(c)}),this.dom.off("dblclick"),this.dom.dblclick(function(){for(var b=0;b<a.images.length;b++)a.images[b].$panzoomEl.panzoom("reset")})},onResize:function(){if(this.images)for(var a=0;a<this.images.length;a++){var b=this.images[a].conf.scaling,c=this.images[a].$img[0],d=1;"max"===b&&(this.images[a].width/this.images[a].height>this.dom.width()/this.dom.height()?(c.width=this.dom.width()*d,c.height=this.images[a].height/this.images[a].width*this.dom.width()*d):(c.height=this.dom.height()*d,c.width=this.images[a].width/this.images[a].height*this.dom.height()*d)),this.images[a].$parent.width(this.dom.parent().width()).height(this.dom.parent().height()),this.images[a].$panzoomEl.panzoom("resetDimensions")}},getDom:function(){return this.dom},_buildConfFromVarsIn:function(){var a=1;return e.map(this.module.definition.vars_in,function(b){return{variable:b.name,opacity:.5,"z-index":a++,rendering:"Normal",scaling:"max"}})}}),f});