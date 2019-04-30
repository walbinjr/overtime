var Calculator = function() {
  var holidays = new Holidays();
  var baseTolerance = 10;
  var baseTime;

  var timeAsString = function(time) {
    return twoDigits(time.getHours()) + ":" + twoDigits(time.getMinutes());
  };

  var twoDigits = function(string) {
    var collection = ("00" + string).split("");
    return collection[collection.length - 2] + collection[collection.length - 1];
  };

  var calcTime = function(arrivedAt, period) {
    var collection = arrivedAt.split(/[^0-9]/);
    var hours = collection[0];
    var minutes = collection[1];
    var dateTime = new Date(2011, 01, 01, hours, minutes);
    var result = new Date(dateTime.getTime() + period);
    return timeAsString(result);
  };

  var calcRemainingTime = function(arrivedAt) {
    var collection = arrivedAt.split(/[^0-9]/);
    var hours = collection[0];
    var minutes = collection[1];
    var dateTimeNow = new Date();
    var dateTimeToGo = new Date();
    dateTimeToGo.setHours(hours, minutes);

    return dateTimeToGo.getTime() - dateTimeNow.getTime();
  };

  var checkHolidaysRules = function(time) {
    if( JSON.parse(window.localStorage.checkHolidays || false) ) {
      if((time == "09:48" || time == "09:00") && holidays.getNextHolidayOnSaturday() != null) {
        time = "09:00";
        $("#sat_holiday span").html(holidays.getNextHolidayOnSaturday());
        $("#sat_holiday").fadeIn();
      } else if(time == "09:00" && holidays.getNextHolidayOnSaturday() == null) {
        time = "09:48";
        $("#sat_holiday").fadeOut();
      } else {
        $("#sat_holiday").fadeOut();
      }
    }
    return time;
  }

  return {
    setBaseTime: function(time){
      time = checkHolidaysRules(time);
      window.localStorage.baseTime = time;
      var collection = time.split(/[^0-9]/);
      var hours = parseInt(collection[0], 10);
      var minutes = parseInt(collection[1], 10);
      baseTime = ((hours * 60 + minutes) * 60 * 1000);
    },

    setToleranceTime: function(minutes){
      window.localStorage.toleranceTime = minutes;
      baseTolerance = minutes || 0;
    },

    minTime: function(arrivedAt) {
      var period = (baseTime - (baseTolerance * 60 * 1000));
      var dateTime = new Date(period);
      return calcTime(arrivedAt, period);
    },

    regularTime: function(arrivedAt) {
      return calcTime(arrivedAt, baseTime);
    },

    maxTime: function(arrivedAt) {
      var period = (baseTime + (baseTolerance * 60 * 1000));
      return calcTime(arrivedAt, period);
    },

    maxExtraTime: function(arrivedAt) {
      var period = (baseTime + (120 * 60 * 1000));
      return calcTime(arrivedAt, period);
    },

    getBaseTime: function() {
      return baseTime;
    },

    remainingTime: function(arrivedAt) {
      return calcRemainingTime(calcTime(arrivedAt, baseTime));
    },

    percentElapsed: function(arrivedAt) {
      var period = (baseTime + (baseTolerance * 60 * 1000));
      var percent = ((( period - calcRemainingTime(calcTime(arrivedAt, period)) ) * 100) / period);
      return (percent > 100) ? 100 : percent;
    }

  };
}

