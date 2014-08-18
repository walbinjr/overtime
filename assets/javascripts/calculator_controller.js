var CalculatorController = function(calculator) {
  var bindCalcButton = function() {
    $("form").submit(function(event) {
      event.preventDefault();
      calcTimeToLeave();
    });
  };

  var bindHolidayCheckbox = function() {
    $("#sat_holiday_check").click(function(event) {
      window.localStorage.checkHolidays = $(this).prop('checked');
      if( $(this).prop('checked') ) {
        calculator.setBaseTime(window.localStorage.baseTime);
      } else {
        $("#sat_holiday").fadeOut();
      }
    });
  }

  var bindEditBaseTimeLink = function() {
    $("#edit_base_time").click(function(event) {
      event.preventDefault();

      if ($(this).html() == "Alterar") {
        $("#base_time").html("<input type='time' value='" + window.localStorage.baseTime + "' id='base_time_input' class='mini' />");
        $("#edit_base_time").html("Ok");
      } else {
        var baseTime = $("#base_time_input").val();
        calculator.setBaseTime(baseTime);
        $("#base_time").html(window.localStorage.baseTime);
        $("#edit_base_time").html("Alterar");
      }
    });
  };

  var lpad = function(padString, str, length) {
    while (str.length < length)
        str = padString + str;
    return str;
  };

  var calcTimeToLeave = function() {
    var arrivedAt = $("#arrived_at").val();
    window.localStorage.time = arrivedAt;

    $("#min_time").html(calculator.minTime(arrivedAt));
    $("#regular_time").html(calculator.regularTime(arrivedAt));
    $("#max_time").html(calculator.maxTime(arrivedAt));
    $("#max_extra_time").html(calculator.maxExtraTime(arrivedAt));

    var fiveMinutes = (5 * 60 * 1000);
    var remainingTime = calculator.remainingTime(arrivedAt);
    var percentElapsed = calculator.percentElapsed(arrivedAt).toFixed(2) + "%";
    var remainingTimeFormated = (((remainingTime + fiveMinutes*3) / 1000) / 60).toFixed(1);
    var minutosTime = Math.abs(remainingTimeFormated);
    var minimoTime = minutosTime - 30;
    var minimoTimeBG = "#d9534f";
    var hmin = parseInt(minimoTime / 60).toString();
    var mmin = parseInt(minimoTime % 60).toString();
    minimoTime = (minimoTime < 60) ? mmin + "m" : hmin + "h" + lpad("0", mmin, 2) + "min";
    minimoTimeToBagde = (minimoTime < 60) ? mmin + "m" : hmin + ":" + lpad("0", mmin, 2);

    $(".progress .sr-only").html(minimoTime + " para o mínimo");
    $(".progress-bar").width(percentElapsed);
    $(".progress-bar").removeClass("progress-bar-danger").removeClass("progress-bar-warning").removeClass("progress-bar-success");

    chrome.extension.getBackgroundPage().clearTimers();

    if( (remainingTime + fiveMinutes*3) <= 0 ) { // Hora Extra
      $(".progress-bar").addClass("progress-bar-danger");

      var msgExtra;
      var minutosExtra = 15;
      var h = parseInt((minutosTime + minutosExtra) / 60).toString();
      var m = parseInt((minutosTime + minutosExtra) % 60).toString();

      if(minutosTime == 0) {
        msgExtra = "Já era! Vai gerar HORA EXTRA!";
      } else if((minutosTime + minutosExtra) < 60) {
        msgExtra = (minutosTime + minutosExtra) + " minutos de HORA EXTRA!";
      } else if((minutosTime + minutosExtra) <= 120) {
        msgExtra = lpad("0", h, 2) + "h" + lpad("0", m, 2) + "min de HORA EXTRA!";
      } else {
        msgExtra = "Acima de 2 Horas Extras! Parei de contar!";
      }

      $(".progress .sr-only").html(msgExtra);
      chrome.browserAction.setBadgeText({ text: "Extra" });
    } else {
      minimoTimeBG = "#5bc0de";
      if( (remainingTime + fiveMinutes*3) <= fiveMinutes ) { // 5min para o maximo
        $(".progress-bar").addClass("progress-bar-danger");
        $(".progress .sr-only").html(minutosTime + ((minutosTime == 1) ? " MINUTO!!!" : " MINUTOS!!!"));
        minimoTimeBG = "#d9534f";
      } else if( (remainingTime + fiveMinutes*2) <= fiveMinutes*3 ) { // 5min para o normal
        $(".progress-bar").addClass("progress-bar-warning");
        $(".progress .sr-only").html("Ainda está aqui?");
        minimoTimeBG = "#f0ad4e";
      } else if( remainingTime <= fiveMinutes*4 ) { // 5min para o minimo
        $(".progress-bar").addClass("progress-bar-success");
        $(".progress .sr-only").html("Arrume suas coisas!");
        minimoTimeBG = "#5cb85c";
      }

      // Label Icon with the earlier time
      chrome.browserAction.setBadgeText({ text: minimoTimeToBagde.toString() });
    }

    // Call timers
    chrome.extension.getBackgroundPage().startTimer(
      remainingTime,
      calculator.minTime(arrivedAt),
      calculator.regularTime(arrivedAt),
      calculator.maxTime(arrivedAt)
    );

    // Label Icon with the earlier time bg
    chrome.browserAction.setBadgeBackgroundColor({ color: minimoTimeBG });
  };

  if ($("#arrived_at").val() != "") {
    calcTimeToLeave();
  }

  bindCalcButton();
  bindEditBaseTimeLink();
  bindHolidayCheckbox();
}
