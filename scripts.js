/* Defined in: "Textual.app -> Contents -> Resources -> JavaScript -> API -> core.js" */

Whisper = {
	
	mappedSelectedUsers : [],
	
	getLine: function(lineNum) {
		return document.getElementById('line-' + lineNum);
	},

	getSender: function(line) {
		if (line) {
			return line.querySelector('.sender');
		} else {
			return null;
		}
	},
	
	getInnerMessage : function(line) {
		if (line) {
			return line.querySelector('.innerMessage');
		} else {
			return null;
		}
	},

	getSenderNick: function(sender) {
		if (sender) { return sender.getAttribute('data-nickname'); }
	},

	getPreviousLine: function(line) {
		var prevLine = line.previousElementSibling;
		if (prevLine && prevLine.classList && prevLine.classList.contains('line')) {
			return prevLine;
		}
	},

	getLineType: function(line) {
		return line ? line.getAttribute('data-line-type') : null;
	},

	coalesceLines: function(lineNum) {
		var line = Whisper.getLine(lineNum);
		var prevLine = Whisper.getPreviousLine(line);

		var sender = Whisper.getSender(line);
		var prevSender = Whisper.getSender(prevLine);

		var senderNick = Whisper.getSenderNick(sender);
		var prevSenderNick = Whisper.getSenderNick(prevSender);

		var type = Whisper.getLineType(line);
		var prevType = Whisper.getLineType(line);


		if (!sender || !prevSender ) { return; }

		if (senderNick === prevSenderNick && type === 'privmsg' && prevType === 'privmsg') {
			line.classList.add('coalesced');
			sender.innerHTML = '';
		}
	},
};

Textual.viewFinishedLoading = function()
{
	Textual.fadeOutLoadingScreen(1.00, 0.95);

	setTimeout(function() {
		Textual.scrollToBottomOfView();
	}, 500);
};

Textual.viewFinishedReload = function()
{
	Textual.viewFinishedLoading();
};

Textual.messageAddedToView = function (lineNum, fromBuffer) {
	Whisper.coalesceLines(lineNum);
    var element = document.getElementById("line-" + lineNum);
    ConversationTracking.updateNicknameWithNewMessage(element);
}

Textual.nicknameSingleClicked = function(e)
{
    ConversationTracking.nicknameSingleClickEventCallback(e);
}
