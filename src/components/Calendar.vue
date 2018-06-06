<template>

  <div class="calendar">

    <div v-if="showModal == true" class="inputModal" @click.self="closeModal">
      <div class="inner">
        <div class="close-btn">
          <span @click="closeModal">×</span>
        </div>
        <input type="text" placeholder="予定を入力" v-model="inputSchedule">
        <button type="button" @click="addSchedule">OK</button>
      </div>
    </div>

    <div class="calendar__nav">
      <div class="calendar__nav-item" v-on:click="movePrevMonth">
        <span class="arrow left"></span>{{ getPrevMonth(calDate.month) }}
      </div>
      <div class="calendar__nav-center">
        <div class="month">{{ getMonthName(calDate.month) }}</div>
        <div class="year">{{ calDate.year }}</div>
      </div>
      <div class="calendar__nav-item" v-on:click="moveNextMonth">
        {{ getNextMonth(calDate.month) }}<span class="arrow right"></span>
      </div>
    </div>
    <!-- カレンダー表示 -->
    <table>
      <thead>
        <tr>
          <th v-for="(week, index) in weeks" :class="['cel-' + index]">{{ week }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="week in calendar">
          <td
          v-for="(day, index) in week"
          :class="['cel-' + index, { today:today == day.date }, { otherday:day.month != calDate.month} ]"
          @click="modalOpen(day.date, day.schedule)">
            <span class="day">{{ day.day }}</span>
            <span class="schedule" v-for="(val, index) in day.schedule">{{ val.name }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
var _ = require('lodash');

export default {
  name: 'Calendar',
  data () {
    return {
      weeks: ['MON','TUE','WED','THU','FRI','SAT','SUN'],
      calDate: { year: 0, month: 0 },
      monthName: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      schedules: [
        { date: '2018-06-05', name: '予定1' },
        { date: '2018-06-15', name: '予定2' },
        { date: '2018-06-16', name: '予定3' },
        { date: '2018-06-23', name: '予定4' },
        { date: '2018-06-25', name: '予定5' },
      ],
      showModal: false,
      inputDate: null,
      inputSchedule: null,
    }
  },
  created: function() {
    // 本日の日付を取得
    var date = new Date();
    // 本日の西暦をcalDate.yearへ代入
    this.calDate.year = date.getFullYear();
    // 1をプラスして本日の月をcalDate.monthに代入
    this.calDate.month = date.getMonth() + 1;
    var day = date.getDate();
    this.today = this.calDate.year + '-' + ('0' + this.calDate.month).slice(-2) + '-' + ('0' + day).slice(-2);
  },
  methods: {
    getMonthName: function(month) {
      return this.monthName[month - 1];
    },
    getPrevMonth: function(month) {
      if(month == 1) {
        month = 13;
      }
      return this.monthName[month - 2];
    },
    getNextMonth: function(month) {
      if(month == 12) {
        month = 0;
      }
      return this.monthName[month];
    },
    getPrevYear: function(month) {
      var prevYear;
      if(month == 1) {
        prevYear = this.calDate.year - 1
      } else {
        prevYear = this.calDate.year
      }
      return prevYear;
    },
    getNextYear: function(month) {
      var nextYear;
      if(month == 12) {
        nextYear = this.calDate.year + 1
      } else {
        nextYear = this.calDate.year
      }
      return nextYear;
    },
    movePrevMonth: function() {
      this.loading = true
      if (this.calDate.month == 1) {
        this.calDate.year--;
        this.calDate.month = 12;
      } else {
        this.calDate.month--;
      }
    },
    moveNextMonth: function() {
      this.loading = true
      if (this.calDate.month == 12) {
        this.calDate.year++;
        this.calDate.month = 1;
      } else {
        this.calDate.month++;
      }
    },
    getSchedule: function(date) {
      var schedules = _.filter(this.schedules, { 'date': date });
      return schedules;
    },
    modalOpen: function(date, schedule) {
      this.inputDate = date;
      if(schedule.length != 0) {
        this.inputSchedule = schedule[0].name;
      } else {
        this.inputSchedule = null;
      }

      this.showModal = true;
    },
    closeModal: function() {
      this.showModal = false;
    },
    addSchedule: function() {

      this.schedules = _.reject(this.schedules, { 'date': this.inputDate });
      var data = { date: this.inputDate, name: this.inputSchedule };
      this.schedules.push(data)
      this.showModal = false;
    }
  },
  computed: {
    calendar: function() {
      // 日曜始まりではなく、月曜日はじまりに対応したいので、全て-1する。ただし、日曜日に関しては６にする。
      // 0(日)、1(月)、2(火)、3(水)、4(木)、5(金)、6(土)
      // => -1(日)、0(月)、1(火)、2(水)、3(木)、4(金)、5(土) => 6(日)
      // getDay()で今月の1日の曜日を取得している
      var firstDay_s = new Date(this.calDate.year, this.calDate.month - 1, 1).getDay();
      var firstDay;
      if(firstDay_s == 0) {
        firstDay = 6;
      } else {
        firstDay = firstDay_s - 1;
      }

      // 今月の最終日を取得
      // 第３引数に0を指定するとthis.calDateの最後の日を取得
      var lastDate = new Date(this.calDate.year, this.calDate.month, 0).getDate();
      // 先月の最終日を取得
      var preLastDate = new Date(this.calDate.year, this.calDate.month - 1, 0).getDate();

      var dayCount = 1;
      var preDayCount = firstDay - 1;
      var nextDayCount = 1;

      var calendar = [];

      // 6回繰り返す
      for (var w = 0; w < 6; w++) {
        var week = [];

        // 空白の行をなくす
        // 最終日より大きくなったら終了
        if (lastDate < dayCount) { break; }

        // 7回繰り返す
        for (var d = 0; d < 7; d++) {
          if (w == 0 && d < firstDay) { // 1週目でなおかつ最初の曜日より少ない
            // 先月の日付を代入 [20xx-xx-xx]
            var prevDate = this.getPrevYear(this.calDate.month) + '-' + ('0' + this.getPrevMonth(this.calDate.month)).slice(-2) + '-' + ('0' + (preLastDate - preDayCount)).slice(-2)
            week[d] = {
              day: this.getPrevMonth(this.calDate.month) + '/' + (preLastDate - preDayCount),
              month: this.getPrevMonth(this.calDate.month),
              date: prevDate,
              schedule: this.getSchedule(prevDate),
            };
            preDayCount--;
          } else if (lastDate < dayCount) { // 現在の日付が最終日より大きい
            // 来月の日付を代入 [20xx-xx-xx]
            var nextDate = this.getNextYear(this.calDate.month) + '-' + ('0' + this.getNextMonth(this.calDate.month)).slice(-2) + '-' + ('0' + nextDayCount).slice(-2)
            week[d] = {
              day: this.getNextMonth(this.calDate.month) + '/' + nextDayCount,
              month: this.getNextMonth(this.calDate.month),
              date: nextDate,
              schedule: this.getSchedule(nextDate),
            };
            dayCount++;
            nextDayCount++;
          } else {
            // 本日の日付を代入 [20xx-xx-xx]
            var thisDate = this.calDate.year + '-' + ('0' + this.calDate.month).slice(-2) + '-' + ('0' + dayCount).slice(-2)
            week[d] = {
              day: dayCount,
              month: this.calDate.month,
              date: thisDate,
              schedule: this.getSchedule(thisDate),
            };
            dayCount++;
          }
        }
        calendar.push(week);
      }
      return calendar;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$black: #434343;
$glay: #dddddd;
$blue: #428bca;
$dark-blue: #4175a2;
$red: #d9534f;

$primary: #428bca;
$success: #5cb85c;
$info: #5bc0de;
$warning: #f0ad4e;
$danger: #d9534f;
.calendar {
  font-weight: bold;

  thead {
    tr {
      th {
        border: solid 1px #BBBBBB;
        padding: 10px 0;
        background-color: #EEEEEE;
        text-align: center;
      }
    }
  }

  table {
    width: 940px;
    margin: 0 auto;
	  table-layout: fixed;
	  border: solid 1px $black;
	  border-collapse: collapse;
	}

  tbody {
    tr {
      th, td {
        height: 100px;
      }
    }
  }

  th, td {
    a {
      color: $black;
    }
    &.cel-5 {
      color: $primary;
      a {
        color: $primary !important;
      }
    }

    &.cel-6 {
      color: $danger;
      a {
        color: $danger !important;
      }
    }
  }

  td {
    position: relative;
    border: solid 1px #BBBBBB;
    cursor: pointer;
    &.today {
      background-color: #FFFF99;
    }
    &.otherday {
      background-color: #DDDDDD;
      .day {
        font-size: small !important;
      }
    }
    &:hover {
      background-color: #EEEEEE;
      .cel-bottom {
        z-index: -1;
      }
    }
    .day {
			text-decoration: none;
			position: absolute;
			top: 5px;
			left: 8px;
			font-size: medium;
			font-weight: bold;
		}
    .schedule {
      display: block;
      background-color: $info;
      color: #EEEEEE;
      font-size: small;
    }
  }

  .calendar__nav {
	  text-align: center;
	  display: flex;
	  width: 940px;
	  margin: 0 auto;
	  padding: 20px 0;

	  div {
	    flex: 1;

	    p {
	      margin: 0;
	      &:nth-of-type(1) {
	        font-size: 1.3rem;
	        font-weight: bold;
	      }
	      &:nth-of-type(2) {
	        font-size: 1rem;
	        font-weight: bold;
	      }
	      &:nth-of-type(3) {
	        font-size: 0.8rem;
	      }
	    }
	  }

    .calendar__nav-item {
  	  display: flex;
  	  justify-content: center;
  	  align-items: center;
  		background-color: #EEEEEE;
  		border: solid 2px #EEEEEE;
  		border-radius: 4px;
  		box-sizing: border-box;
  		font-size: 25px;
  		position: relative;
  		cursor: pointer;
  		&:hover {
  			border: solid 2px #DDDDDD;
  		}
  		.arrow{
  		  width: 15px;
  		  height: 15px;
  		  border: 5px solid;
  			position: absolute;
  			&.left {
  				border-color:  transparent transparent #565656 #565656;
  				transform: rotate(45deg);
  				left: 30px;
  			}
  			&.right {
  				border-color: #565656 #565656 transparent transparent;
  			  transform: rotate(45deg);
  				right: 30px;
  			}
  			&.top {
  				border-color: #565656 #565656 transparent transparent;
  			  transform: rotate(-45deg);
  			}
  		  &.bottom {
  				border-color:  transparent transparent #565656 #565656;
  			  transform: rotate(-45deg);
  			}
  		}
  	}

    .calendar__nav-center {
      padding: 20px;
      .month {
        font-size: 30px;
      }
    }
	}

  .inputModal {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 1001;
		.inner {
			position: absolute;
			width: 50%;
			background-color: #FFFFFF;
			left: 0;
			right: 0;
			top: 15%;
			margin: 0 auto;
			border-radius: 4px;
			padding: 20px;
			.close-btn {
				position: absolute;
				top: 15px;
        color: $danger;
        border: solid 2px $danger;
        padding: 0 6px;
        border-radius: 50%;
				cursor: pointer;
				font-size: 20px;
			}
		}
	}
}

</style>
