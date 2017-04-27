// Note: There's no need to call webkitNotifications.checkPermission().
// Extensions that declare the notifications permission are always
// allowed create notifications.

// Create a simple text notification:
var notificationRegularOptions, notificationMinOptions, notificationMaxOptions, notificationMaxExtraOptions, notificationResetTimeOptions,
	notificationRegular, notificationMin, notificationMax, notificationMaxExtra, notificationResetTime,
	interval, intervalMin, intervalReg, intervalMax, intervalMaxExtra, intervalResetTime, intervalPerm;

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
	clearInterval(intervalResetTime);
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
	var calcResetTime = interval + twoHours;
	//alert(calcMin/1000/60 + " : " + calcReg/1000/60 + " : " + calcMax/1000/60 + " : " + calcMaxExtra/1000/60);
	if(calcMin > 0 && minutosExtraInMili > 0) {
		notificationMinOptions = {
			tag: 'overtimeAlertMin',
			icon: 'assets/images/overtime.png',
			title: '5min para o Horário Mínimo: ' + minTime,
			body: 'ARRUME SUAS COISAS!'
		}
		intervalMin = setInterval(showMin, calcMin);
	}
	
	if(calcReg > 0) {
		notificationRegularOptions = {
			tag: 'overtimeAlertRegular',
			icon: 'assets/images/overtime.png',
			title: '5min para o Horário Normal: ' + regularTime,
			body: 'AINDA ESTÁ AQUI?'
		}
		intervalReg = setInterval(showRegular, calcReg);
	}

	if(calcMax > 0 && minutosExtraInMili > 0) {
		notificationMaxOptions = {
			tag: 'overtimeAlertMax',
			icon: 'assets/images/overtime.png',
			title: '5min para o Horário Máximo: ' + maxTime,
			body: 'ÚLTIMO AVISO!'
		}
		intervalMax = setInterval(showMax, calcMax);
	}

	if(calcMaxExtra > 0) {
		notificationMaxExtraOptions = {
			tag: 'overtimeAlertMaxExtra',
			icon: 'assets/images/overtime.png',
			title: '5min para o Máximo de Extra: ' + maxTimeExtra,
			body: 'AGORA É POR SUA CONTA E RISCO!'
		}
		intervalMaxExtra = setInterval(showMaxExtra, calcMaxExtra);
	}

	if(calcResetTime > 0) {
		notificationResetTimeOptions = {
			tag: 'overtimeAlertResetTime',
			icon: 'assets/images/overtime.png',
			title: 'Horário de entrada apagado',
			body: 'ATÉ AMANHÃ!'
		}
		intervalResetTime = setInterval(showResetTime, calcResetTime);
	}

	//intervalPerm = setInterval(updateBadge, 60000); // 1 min
}

// Then show the notification.
function showMin(){
	notificationMin = new Notification(notificationMinOptions.title, notificationMinOptions);
	clearInterval(intervalMin);
}
function showRegular(){
	notificationMin.close();
	notificationRegular = new Notification(notificationRegularOptions.title, notificationRegularOptions);
	clearInterval(intervalReg);
}
function showMax(){
	notificationRegular.close();
	notificationMax = new Notification(notificationMaxOptions.title, notificationMaxOptions);
	clearInterval(intervalMax);
}
function showMaxExtra(){
	notificationMax.close();
	notificationMaxExtra = new Notification(notificationMaxExtraOptions.title, notificationMaxExtraOptions);
	clearInterval(intervalMaxExtra);
}
function showResetTime(){
	notificationMaxExtra.close();
	window.localStorage.removeItem('time');
	chrome.browserAction.setBadgeText({ text: '' });
	notificationResetTime = new Notification(notificationResetTimeOptions.title, notificationResetTimeOptions);
	clearInterval(intervalResetTime);
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
