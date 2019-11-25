require.config({
	baseUrl : 'lib',
	map : {
		'*':{
			'css':'dist/css.min'
		}
	},
	paths : {
		jquery:'dist/jquery-3.4.1.min',
		/*jquery库*/
		require:'dist/require',
		/*require库*/
		tbase:'dist/tbase',
		/* 基础功能 */
		webjs:'dist/webjs',
		/*服务器*/
		layer:'dist/layer',
		/*弹层组件移动版*/
		wx:'http://res.wx.qq.com/open/js/jweixin-1.4.0',
		/*微信JS-SDK*/
		gcoord:'https://unpkg.com/gcoord/dist/gcoord',
		/*坐标转换工具*/
		JsBarcode:'dist/xx_DshowJsBarcode128.min',//条码
		
		xx_Dshow_09:'guangao/xx_Dshow_0.9',   //滚动广告
		xx_chepai:'compents/chepai/xx_chepai',   //报名表单
		xx_comchepai:'compents/chepai/xx_com_chepai',
		xx_Dshowtable:'tables/xx_Dshowtable',   //信息表格
		xx_Dshowcheckinfo:'checkinfo/xx_Dshowcheckinfo',   //信息校验
		xx_Dshowweixin:'wechat/xx_Dshowweixinapi',   //微信
		xx_test:'compents/testcompent/testcompent',   
		xx_Dshowcreathd:'xx_creat_hd/xx_Dshowcreathd',
		xx_Dshowcode:'eancode/xx_Dshowcode'
	},
	shim : {
			'layer' :{
				deps : [],
				exports: "layer"
			},
			'wx' :{
				deps : [],
				exports: "wx"
			},
			'JsBarcode' :{
				deps : [],
				exports: "JsBarcode"
			},
			'xx_Dshow_09' : ['css!../css/xx_Dshow-1.0.css'],
			'xx_chepai' : ['css!../css/xx_DshowCarinput.css','css!../css/xx_Dshowform.css'],
			'xx_comchepai' : ['css!../css/xx_DshowCarinput.css','css!../css/xx_Dshowform.css'],
			'layer' : ['css!../css/layer.css'],
			'xx_Dshowtable' : ['css!../css/xx_Dshowtable.css'],
			'xx_Dshowcreathd' : ['css!../css/xx_Dshowcreathd.css'],
			'xx_Dshowcode':['css!../css/xx_Dshowcode.css']
		}
});