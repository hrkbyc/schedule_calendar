webpackJsonp([1],{NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")({name:"App"},s,!1,function(t){a("gsu9")},null,null).exports,l=a("/ocq"),c=a("M4fF"),h={name:"Calendar",data:function(){return{weeks:["MON","TUE","WED","THU","FRI","SAT","SUN"],calDate:{year:0,month:0},monthName:["1","2","3","4","5","6","7","8","9","10","11","12"],schedules:[{date:"2018-06-05",name:"予定1"},{date:"2018-06-15",name:"予定2"},{date:"2018-06-16",name:"予定3"},{date:"2018-06-23",name:"予定4"},{date:"2018-06-25",name:"予定5"}],showModal:!1,inputDate:null,inputSchedule:null}},created:function(){var t=new Date;this.calDate.year=t.getFullYear(),this.calDate.month=t.getMonth()+1;var e=t.getDate();this.today=this.calDate.year+"-"+("0"+this.calDate.month).slice(-2)+"-"+("0"+e).slice(-2)},methods:{getMonthName:function(t){return this.monthName[t-1]},getPrevMonth:function(t){return 1==t&&(t=13),this.monthName[t-2]},getNextMonth:function(t){return 12==t&&(t=0),this.monthName[t]},getPrevYear:function(t){return 1==t?this.calDate.year-1:this.calDate.year},getNextYear:function(t){return 12==t?this.calDate.year+1:this.calDate.year},movePrevMonth:function(){this.loading=!0,1==this.calDate.month?(this.calDate.year--,this.calDate.month=12):this.calDate.month--},moveNextMonth:function(){this.loading=!0,12==this.calDate.month?(this.calDate.year++,this.calDate.month=1):this.calDate.month++},getSchedule:function(t){return c.filter(this.schedules,{date:t})},modalOpen:function(t,e){this.inputDate=t,0!=e.length?this.inputSchedule=e[0].name:this.inputSchedule=null,this.showModal=!0},closeModal:function(){this.showModal=!1},addSchedule:function(){this.schedules=c.reject(this.schedules,{date:this.inputDate});var t={date:this.inputDate,name:this.inputSchedule};this.schedules.push(t),this.showModal=!1}},computed:{calendar:function(){var t,e=new Date(this.calDate.year,this.calDate.month-1,1).getDay();t=0==e?6:e-1;for(var a=new Date(this.calDate.year,this.calDate.month,0).getDate(),n=new Date(this.calDate.year,this.calDate.month-1,0).getDate(),s=1,i=t-1,l=1,c=[],h=0;h<6;h++){var o=[];if(a<s)break;for(var r=0;r<7;r++)if(0==h&&r<t){var u=this.getPrevYear(this.calDate.month)+"-"+("0"+this.getPrevMonth(this.calDate.month)).slice(-2)+"-"+("0"+(n-i)).slice(-2);o[r]={day:this.getPrevMonth(this.calDate.month)+"/"+(n-i),month:this.getPrevMonth(this.calDate.month),date:u,schedule:this.getSchedule(u)},i--}else if(a<s){var d=this.getNextYear(this.calDate.month)+"-"+("0"+this.getNextMonth(this.calDate.month)).slice(-2)+"-"+("0"+l).slice(-2);o[r]={day:this.getNextMonth(this.calDate.month)+"/"+l,month:this.getNextMonth(this.calDate.month),date:d,schedule:this.getSchedule(d)},s++,l++}else{var m=this.calDate.year+"-"+("0"+this.calDate.month).slice(-2)+"-"+("0"+s).slice(-2);o[r]={day:s,month:this.calDate.month,date:m,schedule:this.getSchedule(m)},s++}c.push(o)}return c}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"calendar"},[1==t.showModal?a("div",{staticClass:"inputModal",on:{click:function(e){return e.target!==e.currentTarget?null:t.closeModal(e)}}},[a("div",{staticClass:"inner"},[a("div",{staticClass:"close-btn"},[a("span",{on:{click:t.closeModal}},[t._v("×")])]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.inputSchedule,expression:"inputSchedule"}],attrs:{type:"text",placeholder:"予定を入力"},domProps:{value:t.inputSchedule},on:{input:function(e){e.target.composing||(t.inputSchedule=e.target.value)}}}),t._v(" "),a("button",{attrs:{type:"button"},on:{click:t.addSchedule}},[t._v("OK")])])]):t._e(),t._v(" "),a("div",{staticClass:"calendar__nav"},[a("div",{staticClass:"calendar__nav-item",on:{click:t.movePrevMonth}},[a("span",{staticClass:"arrow left"}),t._v(t._s(t.getPrevMonth(t.calDate.month))+"\n    ")]),t._v(" "),a("div",{staticClass:"calendar__nav-center"},[a("div",{staticClass:"month"},[t._v(t._s(t.getMonthName(t.calDate.month)))]),t._v(" "),a("div",{staticClass:"year"},[t._v(t._s(t.calDate.year))])]),t._v(" "),a("div",{staticClass:"calendar__nav-item",on:{click:t.moveNextMonth}},[t._v("\n      "+t._s(t.getNextMonth(t.calDate.month))),a("span",{staticClass:"arrow right"})])]),t._v(" "),a("table",[a("thead",[a("tr",t._l(t.weeks,function(e,n){return a("th",{class:["cel-"+n]},[t._v(t._s(e))])}))]),t._v(" "),a("tbody",t._l(t.calendar,function(e){return a("tr",t._l(e,function(e,n){return a("td",{class:["cel-"+n,{today:t.today==e.date},{otherday:e.month!=t.calDate.month}],on:{click:function(a){t.modalOpen(e.date,e.schedule)}}},[a("span",{staticClass:"day"},[t._v(t._s(e.day))]),t._v(" "),t._l(e.schedule,function(e,n){return a("span",{staticClass:"schedule"},[t._v(t._s(e.name))])})],2)}))}))])])},staticRenderFns:[]};var r=a("VU/8")(h,o,!1,function(t){a("l+Gt")},"data-v-b0a52b7a",null).exports;n.a.use(l.a);var u=new l.a({routes:[{path:"/",name:"Calendar",component:r}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:u,render:function(t){return t(i)}})},gsu9:function(t,e){},"l+Gt":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.0694ea6abca77378a807.js.map