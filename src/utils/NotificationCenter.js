
NotificationCenter = {}

NotificationCenter._messageList = []

NotificationCenter.registerNotification = (msg, callback) => {
	const list = NotificationCenter._messageList

	if (list[msg]) {
		list[msg].push(callback)
	} else {
		list[msg] = [callback]
	}
}

NotificationCenter.unregisterNotification = (msg, callback) => {
	const list = NotificationCenter._messageList

	if (list[msg]) {

		if (callback) {
			const index = list[msg].indexOf(callback)
			list[msg].splice(index, 1)
		} else {
			list[msg] = undefined
		}
	}	
}


NotificationCenter.sendNotification = (msg, data) => {
	const list = NotificationCenter._messageList[msg]

	if (list) {
		for (i in list) {
			list[i](data)
		}
	}
}


export default NotificationCenter