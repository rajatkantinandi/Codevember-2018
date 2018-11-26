var current="front-page";
var prev="back-page";
var month=new Date().getMonth()+1;
var year=new Date().getFullYear();
var today=new Date().getDate();
today=today+"/"+month+"/"+year;
function isToday(d,m,y){
  return d+"/"+m+"/"+y==today;
}
var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
var dayNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function getCalendar(m,y){
  var lp=false;
  if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0)
    lp = true;
  else
    lp = false;
  var daysOfMonth=[31,lp?29:28,31,30,31,30,31,31,30,31,30,31];
  var dayOf1stJan = (y / 1 + ((y - 1) - (y - 1) % 4) / 4 - ((y - 1) - (y - 1) % 100) / 100 + ((y - 1) - (y - 1) % 400) / 400) % 7;
  var dayOf1st=dayOf1stJan;
  if (m > 1) {
    for (x = 1; x < m; x++) {
        dayOf1st = (dayOf1st + daysOfMonth[x-1]) % 7;
    }
  }
  var numOfWeeks=Math.ceil((dayOf1st+daysOfMonth[m-1])/7);
  var blacksInLastWeek=numOfWeeks*7-(dayOf1st+daysOfMonth[m-1]);
  var days=[];
  for(var i=0;i<numOfWeeks;i++){
    days.push([]);
    if(i==0){
      for(var j=0;j<dayOf1st;j++) days[i].push(' ');
      for(var j=1;j<=(7-dayOf1st);j++) days[i].push(j);
    }
    else if(i==numOfWeeks-1){
      for(var j=i*7-dayOf1st+1;j<=daysOfMonth[m-1];j++) days[i].push(j);
      for(var j=0;j<blacksInLastWeek;j++) days[i].push(' ');
    }
    else {      
      for(var j=i*7-dayOf1st+1;j<=(i+1)*7-dayOf1st;j++) days[i].push(j);
    }
  }
  return days;
}

function drawCalendar(m,y,side){
  var days=getCalendar(m,y);
  var toRender=`<div class='header'>
                  <h2>
                    <div class='btn prev-btn' title='prev' onclick='goPrevMonth()'></div>
                    ${monthNames[m-1]}
                    <div class='btn next-btn' title='next' onclick='goNextMonth()'></div>
                  </h2>
                  <h2>
                    <div class='btn prev-btn' title='prev' onclick='goPrevYr()'></div>
                    ${y}
                    <div class='btn next-btn' title='next' onclick='goNextYr()'></div>
                  </h2>
                </div>
                <table class='dates'>
                  <tbody>
                  <tr class='weeks'>
                    ${dayNames.map(function(e,idx){
                      return `<th class='dname ${idx==0?"holiday":""}'>${e}</th>`
                    }).join('')}
                  </tr>
                  ${days.map(function(week){
                    return `<tr>
                              ${week.map(function(day,idx){
                                  return `<td class="date ${idx==0?'holiday"':""}${isToday(day,m,y)?' today"':""}">${day}</td>`
                                }).join('')}
                            </tr>`;
                  }).join('')}
                  </tbody>
                </table>`;
  document.querySelector('.'+side+" .content").innerHTML=toRender;
  console.log(days);
}
drawCalendar(month,year,current);
function goNextMonth(){  
  if(month<12) month++;
  else {
    year++;
    month=1;
  }
  goNext();
}
function goPrevMonth(){ 
  if(month>1) month--;
  else {
    year--;
    month=12;
  }
  goPrev();
}
function goNextYr(){
    year++;
    goNext();
}
function goPrevYr(){
    year--;
    goPrev();
}
function goNext(){
      if(current=='front-page'){
        current='back-page';
        prev='front-page';
      }
      else {
        current='front-page';
        prev='back-page';
      }
        drawCalendar(month,year,current);
        document.querySelector('.'+prev).style.animation="turn 1s ease forwards";
        setTimeout(function(){
          document.querySelector('.'+current).style.zIndex=4;
          document.querySelector('.'+prev).style.zIndex=2;
        },300);
        setTimeout(function(){
          document.querySelector('.'+prev).style.animationName="none";
        },1000);
    }
function goPrev(){
      if(current=='front-page'){
        current='back-page';
        prev='front-page';
      }
      else {
        current='front-page';
        prev='back-page';
      }
        drawCalendar(month,year,current);
        document.querySelector('.'+current).style.animation="turn 1s ease backwards";
        setTimeout(function(){
          document.querySelector('.'+current).style.zIndex=4;
          document.querySelector('.'+prev).style.zIndex=2;
        },300);
        setTimeout(function(){
          document.querySelector('.'+current).style.animationName="none";
        },1000);
    }