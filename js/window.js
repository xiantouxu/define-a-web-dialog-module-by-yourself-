define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	function Window(){
		this.cfg = {
			width:500,
			height:500,
			content:"",
			//handler:null,
			title:"系统消息",
			hasCloseBtn:false,
			handler4AlertBtn:null,
			handler4CloseBtn:null,
			skinClassName:null,
			textAlertButton:"确定",
			hasMask:true,
			isDraggable:true,
			dragHandle:null,
//confirm
			text4ConfirmBtn:"确定",
			text4CancelBtn:"取消",
			handler4ConfirmBtn:null,
			handler4CancelBtn:null,

			text4PromptBtn:"确定",
			isPromptInputPassword:false,
			defaultValue4PromptInput:"",
			maxlength4PromptInput:10,
			handler4PromptBtn:null
		};
	}
	/*
	Window.prototype = {
		alert:function(content,handler,cfg){
			var boundingBox =$('<div class = "window_boundingBox"></div>');
			boundingBox.appendTo('body');
			boundingBox.html(content);
			var btn = $('<button value = "确定">确定</button>');
			btn.appendTo(boundingBox);
			btn.click(function(){
				handler && handler();
				boundingBox.remove();
			});
			$.extend(this.cfg,cfg);
			boundingBox.css({
				width:this.cfg.width +'px',
				height:this.cfg.height + 'px',
				left:(this.cfg.x || (window.innerWidth-this.cfg.width)/2) + 'px',
				top:(this.cfg.y ||(window.innerHeight-this.cfg.height)/2) +'px'
			});
			console.log(boundingBox);
		},
		confirm:function(){

		},
		prompt:function(){

		}
	}*/
	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI:function(){
			var footerContent = "";
		
			switch(this.cfg.winType){
				case "alert":
					footerContent = '<button class = "window_alertBtn" value = "确定">'+this.cfg.textAlertButton+'</button>';
					break;
				case "confirm":
					footerContent = '<button class = "window_confirmBtn" value = "确定">'+this.cfg.text4ConfirmBtn+'</button><button class = "window_cancelBtn" value = "取消">'+
						this.cfg.text4CancelBtn+'</button>';
					break;
				case "prompt":this.cfg.content +=
				'<p class="window_promptInputWrapper"><input type = "'+(this.cfg.isPromptInputPassword? "password":"text")+
				'" value="'+this.cfg.defaultValue4PromptInput+'" maxlength = "'+
				this.cfg.maxlength4PromptInput+'" class="window_promptInput"></p>';
				footerContent = '<button class = "window_promptBtn">'+this.cfg.text4PromptBtn+'</button><button class = "window_cancelBtn" value = "取消">'+this.cfg.text4CancelBtn+'</button>';
				break;
			}
			
			this.boundingBox = $(
				'<div class = "window_boundingBox">'+
					'<div class = "window_body">'+this.cfg.content+'</div>'+
				'</div>'
				);
			if (this.cfg.winType != "common") {
				this.boundingBox.prepend('<div class = "window_header">'+this.cfg.title+'</div>');
				this.boundingBox.append('<div class = "window_footer">'+footerContent+'</div>');
			}
			this._prompInput = this.boundingBox.find('.window_promptInput');
			if (this.cfg.hasMask) {
				this._mask = $('<div class = "window_mask"></div>');
				this._mask.appendTo('body');
			}
			if (this.cfg.hasCloseBtn) {
				this.boundingBox.append('<span class ="window_closeBtn">X</span>');
			}
			this.boundingBox.appendTo('document.body');
		},
		bindUI:function(){
			var _this = this;
			this.boundingBox.delegate('.window_alertBtn', 'click', function() {
				_this.fire("alert");
				_this.destroy();
			}).delegate('.window_closeBtn', 'click', function() {
				_this.fire("close");
				_this.destroy();
			}).delegate('.window_confirmBtn', 'click', function() {
				_this.fire("confirm");
				_this.destroy();
			}).delegate('.window_cancelBtn', 'click', function() {
				_this.fire("cancel");
				_this.destroy();
			}).delegate('.window_promptBtn', 'click', function() {
				_this.fire("prompt",_this._prompInput.val());
				_this.destroy();
			});
			if (this.cfg.handler4AlertBtn) {
				this.on("alert",this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on("close",this.cfg.handler4CloseBtn);
			}
			if (this.cfg.handler4ConfirmBtn) {
				this.on("confirm",this.cfg.handler4ConfirmBtn);
			}
			if(this.cfg.handler4CancelBtn){
				this.on("cancel",this.cfg.handler4CancelBtn);
			}
			if(this.cfg.handler4PromptBtn){
				this.on("prompt",this.cfg.handler4PromptBtn);
			}
		},
		syncUI:function(){
			this.boundingBox.css({
				width:this.cfg.width +"px",
				height:this.cfg.height +"px",
				left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2+'px'),
				top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2+'px')
			});
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable){
				if (this.cfg.dragHandle) {
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}else{
					this.boundingBox.draggable();
				}
			}
		},
		destructor:function(){
			this._mask && this._mask.remove();
		},
		alert:function(cfg){
			$.extend(this.cfg,cfg,{winType:"alert"});
			this.render();
			return this;
		},
		confirm:function(cfg){
			$.extend(this.cfg,cfg,{winType:"confirm"});
			this.render();
			return this;

		},
		prompt:function(cfg){
			$.extend(this.cfg,cfg,{winType:"prompt"});
			this.render();
			this._prompInput.focus();
			return this;
		},
		common:function(cfg){
			$.extend(this.cfg,cfg,{winType:"common"});
			this.render();
			return this;
		}

	});
	return {
		Window:Window
	}
	
})