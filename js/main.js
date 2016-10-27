require.config({
	paths:{
		jquery:"jquery.min",
		jqueryUI:"https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.js"
	}
});

require(['jquery','window'],function($,w){
	$("#a").click(function(){
		var win = new w.Window();

		win.alert(
		// 	"welcome!",function(){
		// 	alert("you click the button");
		// },{
		// 	width:300,
		// 	height:150,
		// 	y:50
		// }
		{
			hasCloseBtn:true,
			title:"提示",
			content:"welcome!",
			// handler:function(){
			// 	alert("you click the button");
			// },
			handler4CloseBtn:function(){
				alert("you click the close button");
			},
			handler4AlertBtn:function(){
				alert("you click the alert button");
			},
			width:300,
			height:150,
			y:50,
			skinClassName:"",
			textAlertButton:"OK",
			dragHandle:".window_header"
		}
		);
		
	}); 

	$('#b').click(function(){
		new w.Window().confirm({
			title:"系统消息",
			content:"您确定要删除这个文件吗？",
			width:300,
			height:150,
			y:50,
			text4ConfirmBtn:"是",
			text4CancelBtn:"否",
			dragHandle:".window_header"
		}).on("confirm",function(){
			alert("确定");
		}).on("cancel",function(){
			alert("取消");
		});
	});

	$('#c').click(function(){
		new w.Window().prompt({
			title:"请输入您的名字",
			content:"我们将会为您保密您输入的信息",
			width:300,
			height:150,
			y:50,
			text4PromptBtn:"输入",
			text4CancelBtn:"取消",
			defaultValue4PromptInput:"蕾蕾",
			dragHandle:".window_header",
			handler4PromptBtn:function(inputvalue){
				alert("您输入的名字："+inputvalue);
			},
			handler4CancelBtn:function(){
				alert("取消");
			}
		});
	});

	$("#d").click(function(){
		new w.Window().common({
			content:"我是一个通用弹窗",
			width:300,
			height:150,
			y:50,
			hasCloseBtn:true
		});
	});

});