$(document).ready(function () {
  $("#arrived_at").val(window.localStorage.time);
  $("#sat_holiday_check").prop('checked', JSON.parse(window.localStorage.checkHolidays || false));
  var baseTime = window.localStorage.baseTime || "09:48";
  var toleranceTime = window.localStorage.toleranceTime || 0;
  var calculator = new Calculator();
  if(toleranceTime > 0) {
    $("#min_time_container").show();
    $("#max_time_container").show();
  } else {
    $("#min_time_container").hide();
    $("#max_time_container").hide();
  }
  calculator.setBaseTime(baseTime);
  calculator.setToleranceTime(toleranceTime);
  $("#base_time").html(window.localStorage.baseTime);
  $("#tolerance_time").html(window.localStorage.toleranceTime + " min");
  new CalculatorController(calculator);
  $("#arrived_at").focus();
});

