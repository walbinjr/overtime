// Note: There's no need to call webkitNotifications.checkPermission().
// Extensions that declare the notifications permission are always
// allowed create notifications.

// Create a simple text notification:
var notificationRegular, notificationMin, notificationMax, intervalMin, intervalReg, intervalMax;

function clearTimers() {
	clearInterval(intervalMin);
	clearInterval(intervalReg);
	clearInterval(intervalMax);
}
function startTimer(interval, minTime, regularTime, maxTime) {
	var calcMin = interval - (20 * 60 * 1000);
	var calcReg = interval - (5 * 60 * 1000);
	var calcMax = interval + (10 * 60 * 1000);

	if(calcMin > 0) {
		notificationMin = webkitNotifications.createNotification(
			'assets/images/overtime.png',  // icon url - can be relative
			'Horário Mínimo - ' + minTime,  // notification title
			'5 min para o Horário Mínimo ' + minTime + '... ARRUME SUAS COISAS!'  // notification body text
		);
		intervalMin = setInterval(showMin, calcMin);
	}
	
	if(calcReg > 0) {
		notificationRegular = webkitNotifications.createNotification(
			'assets/images/overtime.png',
			'Horário Normal - ' + regularTime,
			'5 min para o Horário Normal ' + regularTime + '... AINDA ESTÁ AQUI?'
		);
		intervalReg = setInterval(showRegular, calcReg);
	}

	if(calcMax > 0) {
		notificationMax = webkitNotifications.createNotification(
			'assets/images/overtime.png',
			'Horário Máximo - ' + maxTime,
			'5 min para o Horário Máximo ' + maxTime + '... ÚLTIMO AVISO!'
		);
		intervalMax = setInterval(showMax, calcMax);
	}
}

// Then show the notification.
function showMin(){
	notificationMin.show();
}
function showRegular(){
	notificationRegular.show();
}
function showMax(){
	notificationMax.show();
}
