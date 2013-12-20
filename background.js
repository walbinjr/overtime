// Note: There's no need to call webkitNotifications.checkPermission().
// Extensions that declare the notifications permission are always
// allowed create notifications.

// Create a simple text notification:
var notificationRegular, notificationMin, notificationMax, notificationMaxExtra,
	interval, intervalMin, intervalReg, intervalMax, intervalMaxExtra, intervalPerm;

function twoDigits(string) {
	var collection = ("00" + string).split("");
	return collection[collection.length - 2] + collection[collection.length - 1];
};
function timeAsString(time) {
	return time.getHours() + ":" + twoDigits(time.getMinutes());
};
function creationCallback(createdId) {
	console.log('Criado: ' + createdId);
}
function clearTimers() {
	clearInterval(intervalMin);
	clearInterval(intervalReg);
	clearInterval(intervalMax);
	clearInterval(intervalMaxExtra);
	clearInterval(intervalPerm);
}
function startTimer(intervalRemains, minTime, regularTime, maxTime) {
	interval = intervalRemains;
	var calcMin = interval - (20 * 60 * 1000);
	var calcReg = interval - (5 * 60 * 1000);
	var calcMax = interval + (10 * 60 * 1000);
	var calcMaxExtra = interval + (115 * 60 * 1000);
	//alert(calcMin/1000/60 + " : " + calcReg/1000/60 + " : " + calcMax/1000/60 + " : " + calcMaxExtra/1000/60);
	if(calcMin > 0) {
		notificationMin = {
			type: "basic",
			iconUrl: 'assets/images/overtime.png',
			title: 'Horário Mínimo - ' + minTime,
			message: '5 min para o Horário Mínimo ' + minTime + '... ARRUME SUAS COISAS!'
		}
		intervalMin = setInterval(showMin, calcMin);
	}
	
	if(calcReg > 0) {
		notificationRegular = {
			type: "basic",
			iconUrl: 'assets/images/overtime.png',
			title: 'Horário Normal - ' + regularTime,
			message: '5 min para o Horário Normal ' + regularTime + '... AINDA ESTÁ AQUI?'
		}
		intervalReg = setInterval(showRegular, calcReg);
	}

	if(calcMax > 0) {
		notificationMax = {
			type: "basic",
			iconUrl: 'assets/images/overtime.png',
			title: 'Horário Máximo - ' + maxTime,
			message: '5 min para o Horário Máximo ' + maxTime + '... ÚLTIMO AVISO!'
		}
		intervalMax = setInterval(showMax, calcMax);
	}

	if(calcMaxExtra > 0) {
		notificationMaxExtra = {
			type: "basic",
			iconUrl: 'assets/images/overtime.png',
			title: 'Máximo de Horas Extras!',
			message: '5 min para o Máximo de Horas Extras... AGORA É POR SUA CONTA E RISCO!'
		}
		intervalMaxExtra = setInterval(showMaxExtra, calcMaxExtra);
	}

	//intervalPerm = setInterval(updateBadge, 60000); // 1 min
}

// Then show the notification.
function showMin(){
	chrome.notifications.create('overtimeAlertMin', notificationMin, creationCallback);
	clearInterval(intervalMin);
}
function showRegular(){
	chrome.notifications.create('overtimeAlertRegular', notificationRegular, creationCallback);
	clearInterval(intervalReg);
}
function showMax(){
	chrome.notifications.create('overtimeAlertMax', notificationMax, creationCallback);
	clearInterval(intervalMax);
}
function showMaxExtra(){
	chrome.notifications.create('overtimeAlertMaxExtra', notificationMaxExtra, creationCallback);
	clearInterval(intervalMaxExtra);
}
function updateBadge(){
	var remaining = (interval - (15 * 60 * 1000)) - (1 * 60 * 1000);

	if( remaining > -1800000 ) {
		var timeBadge = new Date();
		timeBadge.setHours(0,0);
		timeBadge = new Date(timeBadge.getTime() + remaining);

		chrome.browserAction.setBadgeText({ text: timeAsString(timeBadge) });
	} else {
		clearInterval(intervalPerm);
	}
}
