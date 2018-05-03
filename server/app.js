const EDIT_DISABLE_TIME = 60 * 1000	// After a minute editing is disabled
const RECENT_MESSAGES_NUM = 10 // 10 recent messages are available for the new chat visitor

var express = require('express'), http = require('http'), path = require('path');
var app = express();
var server = http.createServer(app);
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({server: server});

var colors = ['red', 'green', 'blue', 'magenta', 'purple', 'plum', 'orange'];
colors.sort(function (a, b) {
	return Math.random() > 0.5;
});

var clients = [];
var observers = [];
var messages = [];

function findReceiver(name) {
	for (var i = 0; i < clients.length; i++) {
		if (clients[i].username === name)
			return clients[i]
	}
}

function publicMessagesNum() {
	var res = 0
	for (var i = 0; i < messages.length; i++) {
		var {data} = JSON.parse(messages[i])
		if (data.to === 'MAIN_PUBLIC_CHAT') res++
	}
	return res
}

function getMessages(index, user) {
	result = []
	for (var i = 0; i < messages.length; i++) {
		var {data} = JSON.parse(messages[i])
		if ((i > index - RECENT_MESSAGES_NUM && data.to === 'MAIN_PUBLIC_CHAT') || (data.to === user) || (data.author === user)) {
			result.push(messages[i])
		}
	}
	return result
}

function getEditedObject({time, author, color, to, editable}, text) {
	return {
		time, text, author, color, to, editable,
		edited: true
	};
}

function disableEdit(id) {
	for (var i = 0; i < messages.length; i++) {
		var {type, data} = JSON.parse(messages[i])
		if (data.time === id) {
			data.editable = false
			messages[i] = JSON.stringify({type, data});
		}
	}
}

function editMessage(id, newText) {
	var newData = {}
	for (var i = 0; i < messages.length; i++) {
		var {type, data} = JSON.parse(messages[i])
		if (data.time === id) {
			newData = getEditedObject(data, newText)
			messages[i] = JSON.stringify({type, data: newData});
		}
	}
}

wss.on('connection', function (ws) {

	var username = false;
	var userColor = false;
	ws.on('message', function (message) {
		var {type, data, to, messageId, flag} = JSON.parse(message)
		switch (type) {
			case 'connected_new_observer':
				var publicLen = publicMessagesNum()
				observers.push(Object.assign(ws, {id: Date.now(), username: null, index: (publicLen - 1)}));
				// Inform the new observer about all the clients
				for (var i = 0; i < clients.length; i++) {
					ws.send(JSON.stringify({
						type: 'connected_new_user',
						userID: clients[i].id,
						username: clients[i].username
					}));
				}
				// Inform the new observer about all the public messages
				var publicMessages = getMessages(publicLen - 1)
				for (var i = 0; i < publicMessages.length; i++) {
					ws.send(publicMessages[i]);
				}
				break;

			case 'connected_new_user':
				var username = data
				// If a user`s name is not unique, his authorization is rejected
				if (username === 'MAIN_PUBLIC_CHAT' || username === 'Main Public Chat') {
					ws.send(JSON.stringify({type: 'auth', flag: false}))
					return
				}
				for (var i = 0; i < clients.length; i++) {
					if (clients[i].username === username) {
						ws.send(JSON.stringify({type: 'auth', flag: false}))
						return;
					}
				}
				ws.send(JSON.stringify({type: 'auth', flag: true}))


				var index = observers.indexOf(ws);
				observers.splice(index, 1);
				ws.username = username
				clients.push(ws);
				userColor = colors.shift();
				for (var i = 0; i < clients.length; i++) {
					// Inform all the other clients about the current one
					if (clients[i].username === ws.username) continue
					clients[i].send(JSON.stringify({
						type: type,
						userID: ws.id,
						username: ws.username
					}));
				}
				// Inform all the observers about the current client
				for (var i = 0; i < observers.length; i++) {
					observers[i].send(JSON.stringify({
						type: type,
						userID: ws.id,
						username: ws.username
					}))
				}

				break;

			case 'send_message':

				// Broadcasting messages from existing user
				var obj = {
					time: (new Date()).getTime(),
					text: data,
					author: ws.username,
					color: userColor,
					to: 'MAIN_PUBLIC_CHAT',
					editable: true
				};
				var json = JSON.stringify({type: 'message', data: obj});
				messages.push(json)
				// Inform all the clients about new message
				for (var i = 0; i < clients.length; i++) {
					clients[i].send(json);
				}
				// Inform all the observers about new message
				for (var i = 0; i < observers.length; i++) {
					observers[i].send(json);
				}

				// after 1 min after sending editing is disabled
				setTimeout(() => {
					try {
						ws.send(JSON.stringify({type: 'disable_edit', time: obj.time}))
						disableEdit(obj.time)
					} catch (e) {
						// To handle the case when a user already left the chat
						// console.error(e)
					}
				}, EDIT_DISABLE_TIME)

				break;
			case 'send_private_message':
				// Sending messages from user to user privately
				var obj = {
					time: (new Date()).getTime(),
					text: data,
					author: ws.username,
					color: userColor,
					to: to,
					editable: true
				};
				var json = JSON.stringify({type: 'message', data: obj});
				messages.push(json)
				ws.send(json)
				findReceiver(to).send(json)

				// after 1 min after sending editing is disabled
				setTimeout(() => {
					try {
						ws.send(JSON.stringify({type: 'disable_edit', time: obj.time}))
						disableEdit(obj.time)
					} catch (e) {
						// To handle the case when a user already left the chat
						// consol.error(e)
					}
				}, EDIT_DISABLE_TIME)

				break

			case 'edit_message':
				var editedMessages = []
				editMessage(messageId, data)

				if (to === 'MAIN_PUBLIC_CHAT') {
					for (var i = 0; i < clients.length; i++) {
						editedMessages = getMessages(clients[i].index, clients[i].username)
						clients[i].send(JSON.stringify({type: 'editing', data: editedMessages}));
					}
					for (var i = 0; i < observers.length; i++) {
						editedMessages = getMessages(observers[i].index)
						observers[i].send(JSON.stringify({type: 'editing', data: editedMessages}))
					}


				} else {
					editedMessages = getMessages(ws.index, ws.username)
					ws.send(JSON.stringify({type: 'editing', data: editedMessages}))
					let receiver = findReceiver(to)
					editedMessages = getMessages(receiver.index, to)
					receiver.send(JSON.stringify({type: 'editing', data: editedMessages}))
				}
				break
			case 'typing_message':
				if (to === 'MAIN_PUBLIC_CHAT') {
					// Notify all the clients and observers that a client is typing
					for (var i = 0; i < clients.length; i++) {
						if (ws.username !== clients[i].username) {
							clients[i].send(JSON.stringify({type: 'public_typing', from: ws.username, flag}));
						}
					}
					for (var i = 0; i < observers.length; i++) {
						observers[i].send(JSON.stringify({type: 'public_typing', from: ws.username, flag}))
					}
				} else {
					// Notify the receiver in the private chat that the client is typing
					findReceiver(to).send(JSON.stringify({type: 'private_typing', from: ws.username, flag}))
				}

		}

		// console.log('Observers: ', observers.length)
		// console.log('Clients: ', clients.length)

	});

	ws.on('close', function () {

		var clientIndex = clients.indexOf(ws);
		if (clientIndex !== -1) clients.splice(clientIndex, 1);

		var observerIndex = observers.indexOf(ws);
		if (observerIndex !== -1) observers.splice(observerIndex, 1)

		if (ws.username !== false && userColor != false) {
			colors.push(userColor);
		}
		var json = JSON.stringify({type: 'disconnected_user', userID: ws.id});
		for (var i = 0; i < clients.length; i++) {
			clients[i].send(json);
		}
		for (var i = 0; i < observers.length; i++) {
			observers[i].send(json);
		}
		// console.log('ON CLOSE--Observers: ', observers.length)
		// console.log('ON CLOSE--Clients: ', clients.length)
	});
})
;

app.configure(function () {
	app.set('port', process.env.PORT || 3000);
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

app.configure('development', function () {
	app.use(express.errorHandler());
});

server.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});

