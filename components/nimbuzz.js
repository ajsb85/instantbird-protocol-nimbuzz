/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is by Alexander Salas, released
 * 2013.
 *
 * The Initial Developer of the Original Code is
 * Benedikt Pfeifer <benediktp@ymail.com>
 * Portions created by the Initial Developer are Copyright (C) 2011
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

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