Main.k.refreshAll = function() {
	// TODO: loading screen -- Optimize

	Main.refreshChat();
	Main.acListMaintainer.refresh(true);
	Main.syncInvOffset(null,true);
	Main.doChatPacks();
	Main.topChat();
	Main.onChanDone(ChatType.Local[1],true)
}