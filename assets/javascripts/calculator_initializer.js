$(document).ready(function () {
  $("#arrived_at").val(window.localStorage.time);
  $("#sat_holiday_check").prop('checked', JSON.parse(window.localStorage.checkHolidays || false));
  var baseTime = window.localStorage.baseTime || "09:48";
  var calculator = new Calculator();
  calculator.setBaseTime(baseTime);
  $("#base_time").html(window.localStorage.baseTime);
  new CalculatorController(calculator);
  $("#arrived_at").focus();
});

