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
function startTimer(intervalRemains, minTime, regularTime, maxTime, maxTimeExtra, minutosExtraInMili) {
	interval = intervalRemains;
	var fiveMinutes = (5 * 60 * 1000);
	var twoHours = (120 * 60 * 1000);
	var calcMin = interval - minutosExtraInMili - fiveMinutes;
	var calcReg = interval - fiveMinutes;
	var calcMax = interval + minutosExtraInMili - fiveMinutes;
	var calcMaxExtra = interval + twoHours - fiveMinutes;
	//alert(calcMin/1000/60 + " : " + calcReg/1000/60 + " : " + calcMax/1000/60 + " : " + calcMaxExtra/1000/60);
	if(calcMin > 0 && minutosExtraInMili > 0) {
		notificationMin = {
			tag: 'overtimeAlertMin',
			icon: 'assets/images/overtime.png',
			title: '5min para o Horário Mínimo: ' + minTime,
			body: 'ARRUME SUAS COISAS!'
		}
		intervalMin = setInterval(showMin, calcMin);
	}
	
	if(calcReg > 0) {
		notificationRegular = {
			tag: 'overtimeAlertRegular',
			icon: 'assets/images/overtime.png',
			title: '5min para o Horário Normal: ' + regularTime,
			body: 'AINDA ESTÁ AQUI?'
		}
		intervalReg = setInterval(showRegular, calcReg);
	}

	if(calcMax > 0 && minutosExtraInMili > 0) {
		notificationMax = {
			tag: 'overtimeAlertMax',
			icon: 'assets/images/overtime.png',
			title: '5min para o Horário Máximo: ' + maxTime,
			body: 'ÚLTIMO AVISO!'
		}
		intervalMax = setInterval(showMax, calcMax);
	}

	if(calcMaxExtra > 0) {
		notificationMaxExtra = {
			tag: 'overtimeAlertMaxExtra',
			icon: 'assets/images/overtime.png',
			title: '5min para o Máximo de Extra: ' + maxTimeExtra,
			body: 'AGORA É POR SUA CONTA E RISCO!'
		}
		intervalMaxExtra = setInterval(showMaxExtra, calcMaxExtra);
	}

	//intervalPerm = setInterval(updateBadge, 60000); // 1 min
}

// Then show the notification.
function showMin(){
	new Notification(notificationMin.title, notificationMin);
	clearInterval(intervalMin);
}
function showRegular(){
	new Notification(notificationRegular.title, notificationRegular);
	clearInterval(intervalReg);
}
function showMax(){
	new Notification(notificationMax.title, notificationMax);
	clearInterval(intervalMax);
}
function showMaxExtra(){
	new Notification(notificationMaxExtra.title, notificationMaxExtra);
	clearInterval(intervalMaxExtra);
}
function updateBadge(){
	var remaining = (interval - (10 * 60 * 1000)) - (1 * 60 * 1000);

	if( remaining > -1800000 ) {
		var timeBadge = new Date();
		timeBadge.setHours(0,0);
		timeBadge = new Date(timeBadge.getTime() + remaining);

		chrome.browserAction.setBadgeText({ text: timeAsString(timeBadge) });
	} else {
		clearInterval(intervalPerm);
	}
}
