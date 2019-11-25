define(function(require) {
//	var $ = require("jquery");
//	var justep = require("$UI/system/lib/justep");
	var SuperInput = require("$UI/p_common/lib/superInput/superInput");
	var Utils = require("$UI/p_common/lib/utils");
	var ChinesePY = require("$UI/system/lib/base/chinesePY");
	var IM = require("$UI/p_common/base/js/im");
	var Model = function() {
		this.callParent();
	};

	Model.prototype.modelModelConstructDone = function(event) {
		var self = this;
		IM.bindDialogs(function(dialogs) {
			var data = self.comp("dialogData");
			Utils.loadData(data, dialogs, self.getRowCallback);
		});
	};
	
	Model.prototype.getRowCallback = function(item, row) {
		var person = item.peer.peer.type === "user" ? IM.getPersonByUID(item.peer.peer.id) : {};
		var nickName = item.peer.peer.type === "user" ? person.name || item.peer.title : item.peer.title;
		var img = item.peer.peer.type === "user" ? IM.getPersonDefaultIcon() : IM.getGroupDefaultIcon();
		if (row) {
			row.val('fID', item.peer.peer.id);
			row.val('fType', item.peer.peer.type);
			row.val('fNickName', nickName);
			row.val('fNickNamePY', ChinesePY.makeFirstPY(nickName));
			row.val('fCounter', item.counter);
			row.val('fImg', img);
			row.val('fLatestChat', SuperInput.emojiParse(Utils.getLatestChat(item)));
			row.val('fLatestChatDate', Utils.getDate(item.date));
		} else {
			row = {
				fID : item.peer.peer.id,
				fType : item.peer.peer.type,
				fNickName : nickName,
				fNickNamePY : ChinesePY.makeFirstPY(nickName),
				fCounter : item.counter,
				fImg : item.peer.peer.type === "user" ? IM.getPersonDefaultIcon(): IM.getGroupDefaultIcon(),
				fLatestChat : SuperInput.emojiParse(Utils.getLatestChat(item)),
				fLatestChatDate : Utils.getDate(item.date)
			};
		}
		return row;
	};
	Model.prototype.li1Click = function(event){
			var a = {};
			var row = event.bindingContext.$object;
			a.id = row.val("fID");
			a.type = row.val("fType");
			this.owner.send(a);
			//this.close();
	};
	return Model;
});