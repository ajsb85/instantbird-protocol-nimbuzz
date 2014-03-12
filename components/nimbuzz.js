let {interfaces: Ci, utils: Cu} = Components;

Cu.import("resource:///modules/imXPCOMUtils.jsm");
Cu.import("resource:///modules/jsProtoHelper.jsm");
Cu.import("resource:///modules/xmpp.jsm");
Cu.import("resource:///modules/xmpp-session.jsm");

function NimbuzzAccount(aProtoInstance, aImAccount) {
  this._init(aProtoInstance, aImAccount);
}

NimbuzzAccount.prototype = {
  __proto__: XMPPAccountPrototype,
  get canJoinChat() false,
  connect: function() {
    this._jid = this._parseJID(this.name.replace("@","\\40") + "@nimbuzz.com/instantbird");
    this._connection = new XMPPSession("openfire.nimbuzz.com", 5222,
                                       "allow_unencrypted_plain_auth", this._jid,
                                       this.imAccount.password, this);
  }
};

//XMPPSession(aHost, aPort, aSecurity, aJID, aPassword, aAccount)

function NimbuzzProtocol() { }

NimbuzzProtocol.prototype = {
  __proto__: GenericProtocolPrototype,
  get normalizedName() "nimbuzz",
  get name() "Nimbuzz",
  get iconBaseURI() "chrome://prpl-nimbuzz/skin/",
  getAccount: function(aImAccount) new NimbuzzAccount(this, aImAccount),
  classID: Components.ID("{9e6365d0-a957-11e3-a5e2-0800200c9a66}")
};

const NSGetFactory = XPCOMUtils.generateNSGetFactory([NimbuzzProtocol]);
