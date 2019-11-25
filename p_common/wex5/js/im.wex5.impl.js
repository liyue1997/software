define(function(require) {
	// var $ = require("jquery");
	var Push = require("$UI/system/lib/base/push");
	var justep = require("$UI/system/lib/justep");
	var IMImpl = require('../../base/js/im.impl');
	var Person = require("../../base/js/person");
	var store = require('$UI/system/lib/base/store');
	var Uploader = require('$UI/p_common/wex5/js/uploader-html5');
	var webjs=require("$UI/p_common/webjs");

	var loginByWex5 = function(params) {
		var ret = {};
		
			ret.CurrentDeptID= "C76FBA5C86200001D7B21F6E29801188";
			ret.CurrentDeptName= "用户";
			ret. CurrentFID= "/ORG01.ogn/C76FBA5C86200001D7B21F6E29801188.dpt/C76FBE1F50500001F4D11770F460B7E0.psm";
			ret.CurrentFName= "/金融/用户/李总";
			ret.CurrentFunRole= "3";
			ret.CurrentOgnID= "ORG01";
			ret.CurrentOgnName="金融";
			ret.flag= true;
			ret.isInOrg= false;
			ret.personID=params.username;// "C76FBE1F50500001F4D11770F460B7E1";
			ret.personName=params.nick;


		ret.flag=true;
		ret.isInOrg=true;
		ret.message="ok";
		console.log("ret",ret);
		var userParams = {};
		userParams.CurrentPersonID = ret.personID;
		userParams.CurrentPersonName = ret.personName;
		userParams.CurrentPersonFID = "";
		userParams.CurrentPersonFName = "";
		userParams.CurrentOgnID = "";
		userParams.CurrentOgnName = "";
		userParams.CurrentDeptID = "";
		userParams.CurrentDeptName = "";
		userParams.CurrentDeptFID = "";
		userParams.CurrentDeptFName = "";
		userParams.CurrentOgnFID = "";
		userParams.CurrentOgnFName = "";
		userParams.CurrentFunRole = "3";// 默认为3：普通员工。（1:公司领导；2:部门主管；3:普通员工）
		saveLoginDataToStore(userParams);
		/*
		justep.Baas.sendRequest({
			"url" : "/org/login",
			"action" : "loginAction",
			"async" : false,
			"params" : {
				"userName" : params.username,
				"password" : params.password
			},
			"success" : function(data) {
				ret = data;
				if (ret.flag) {
					userParams.CurrentPersonID = ret.personID;
					userParams.CurrentPersonName = ret.personName;
					userParams.CurrentPersonFID = ret.CurrentFID;
					userParams.CurrentPersonFName = ret.CurrentFName;
					userParams.CurrentOgnID = ret.CurrentOgnID;
					userParams.CurrentOgnName = ret.CurrentOgnName;
					userParams.CurrentFunRole = ret.CurrentFunRole;

					userParams.CurrentOgnFID = "/" + ret.CurrentFID.split("/")[1];
					userParams.CurrentOgnFName = "/" + ret.CurrentFName.split("/")[1];
					if (ret.CurrentFID.indexOf("dpt") > 0) {
						userParams.CurrentDeptID = ret.CurrentDeptID;
						userParams.CurrentDeptName = ret.CurrentDeptName;
						userParams.CurrentDeptFID = ret.CurrentFID.substring(0, ret.CurrentFID.indexOf("dpt") + 3);
						userParams.CurrentDeptFName = ret.CurrentFName.substring(0, ret.CurrentFName.indexOf("/", ret.CurrentFName.indexOf("/", 2) + 1));
					}
					saveLoginDataToStore(userParams);
				}
			}
		});*/
		return ret;
	};

	var password = [ 15, 52, 60, 73, 12, 11, 86, 35 ];
	var encrypt = function(str, key) {
		var ret = '', keyLen = key.length;
		for (var i = 0; i < str.length; i++) {
			ret += String.fromCharCode(str.charCodeAt(i) ^ key[i % keyLen]);
		}
		return ret;
	};

	var saveLoginDataToStore = function(data) {
		data = JSON.stringify(data);
		store.set('work_loginData', encrypt(data, password));
	};

	var _orgPersons;
	var _orgDepts;
	var orgPersonsDeferred = $.Deferred();
	var orgDeptsDeferred = $.Deferred();
	var IMWex5Impl = IMImpl.extend({
		loadPerson : function(persons, pid) {
			var deferred = $.Deferred();
			this.getOrgPersons(pid).done(function(orgPersons) {
				$.each(orgPersons, function(i, v) {
					var p = {
						id : v.sPersonID,
						name : v.sName,
						uid : v.sNumb,
						avatar : getPersonAvatar(v.sPhoto),
						nick : '',
						phones : [],
						about : ''
					};
					persons[v.sPersonID] = new Person(p);
				});
				deferred.resolve(persons);
			});
			return deferred.promise();
		},
		getOrgPersons : function(pid) {
			//alert("getOrgPersons");
			if (!_orgPersons) {
				webjs.pushdata("imgetusers","",function(data){
					_orgPersons = data.persons;
					orgPersonsDeferred.resolve(_orgPersons);
				},function (info)
				{
					alert(info);
				}
						);
			}
			return orgPersonsDeferred.promise();
		},
		getOrgDepts : function(pid){
			//alert("getOrgDepts");
			if (!_orgDepts) {
				/*
				justep.Baas.sendRequest({
					"url" : "/org/loadPerson",
					"action" : "getDepts",
					"async" : true,
					"params" : {
						"sPersonID" : pid
					},
					"success" : function(data) {
						_orgDepts = data.depts;
						orgDeptsDeferred.resolve(_orgDepts);
					}
				});*/
			}
			return orgDeptsDeferred.promise();
		},
		doLogin : function(param) {
			return loginByWex5(param);
		},
		doLoginAfter : function(result) {
			if (!result.isInOrg) {
				justep.Shell.fireEvent('toChooseOrg', {
					personID : result.personID
				});
			} else
				this.callParent(result);
		},
		doLogout : function() {
			//hcr 添加推送相关
			Push.disConnect();
		},
		updatePersonUid : function(uid, pid) {
			var self = this;
			var deferred = $.Deferred();
			webjs.pushdata("updateimid","&userid="+uid+"&imid="+pid,function(data){
				if (data.state) {
					var person = self._getPerson(pid);
					if (person) {
						person.uid = uid;
					}
				}
				deferred.resolve();
			},function (info)
			{
				alert(info);
			}
					);
			/*
			justep.Baas.sendRequest({
				"url" : "/org/updatePersonUid",
				"action" : "updatePersonUid",
				"async" : true,
				"params" : {
					"uid" : uid,
					"pid" : pid
				},
				"success" : function(data) {
					if (data.state) {
						var person = self._getPerson(pid);
						if (person) {
							person.uid = uid;
						}
					}
					deferred.resolve();
				}
			});*/
			return deferred.promise();
		},
		bindChangeMyAvatar : function(url, name, domNode, params) {
			//alert("bindChangeMyAvatar");
			return null;
			var uploader = new Uploader(domNode, {
				actionUrl : url,
				requestHeader : {
					Accept : 'application/json'
				},
				accept : "image/*",
				name : name,
				compress : true
			});
			// 需要修改原数据
			var person = this._getPerson(this.loginResult.personID);
			uploader.on('onStart', function() {
				var params = {
					id : person.id
				};
				uploader.addData(params);
			});
			uploader.on('onSuccess', function(evt) {
				person.avatar = getPersonAvatar(evt.response.imgFile);
			});
			return uploader;
		},
		loadLoginDataByStore : function() {
			var _loginData_;
			if (_loginData_)
				return _loginData_;
			var data = store.get('work_loginData');
			if (data) {
				data = encrypt(data, password);
				_loginData_ = JSON.parse(data);
				return _loginData_;
			}
		},
	});

	var getPersonAvatar = function(imgFile) {
		//alert("getPersonAvatar");
		return null;
		if (imgFile) {
			return justep.Baas.BASE_URL + "/org/personAvatar/getPersonAvatar?imgFile=" + imgFile;
		} else {
			return null;
		}

	};

	return IMWex5Impl;
});