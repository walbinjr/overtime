var Holidays = function() {
  var today       = new Date();
  var yearNow     = today.getFullYear();
  var spHolidays  = [
      [new Date(yearNow, 0, 1)  , "Confraternização Universal"]
    , [new Date(yearNow, 0, 25) , "Aniversário de São Paulo"]
    , [new Date(yearNow, 3, 21) , "Tiradentes"]
    , [new Date(yearNow, 4, 1)  , "Dia do Trabalho"]
    , [new Date(yearNow, 5, 19) , "Corpus Christi"]
    , [new Date(yearNow, 8, 7)  , "Independência do Brasil"]
    , [new Date(yearNow, 9, 12) , "Nossa Sr.a Aparecida"]
    , [new Date(yearNow, 10, 2) , "Finados"]
    , [new Date(yearNow, 10, 15), "Proclamação da República"]
    , [new Date(yearNow, 10, 20), "Consciência Negra"]
    , [new Date(yearNow, 11, 25), "Natal"]
  ];

  return {
    getHolidays: function () {
      return spHolidays;
    },

    getNextHolidayOnSaturday: function() {
      var thisWeek = today.getTime();
      var nextWeek = new Date().setDate(today.getDate() + 7);
      for(var i=0; i < spHolidays.length; i++) {
        if(spHolidays[i][0].getDay() == 6 && spHolidays[i][0].getTime() > thisWeek && spHolidays[i][0].getTime() < nextWeek) {
          return spHolidays[i][0].getDate() + "/" + spHolidays[i][0].getMonth() + " - " + spHolidays[i][1];
        }
      }
      return null;
    }
  }
};