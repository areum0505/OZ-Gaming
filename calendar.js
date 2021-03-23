let date = new Date();

const renderCalendar = () => {
	const viewYear = date.getFullYear();	// 지금 연도
	const viewMonth = date.getMonth();		// 지금 달

	const prevLast = new Date(viewYear, viewMonth, 0);
	const thisLast = new Date(viewYear, viewMonth + 1, 0);

	const PLDate = prevLast.getDate();	// 지난달 마지막 날짜
	const PLDay = prevLast.getDay();	// 지난달 마지막 요일

	const TLDate = thisLast.getDate();	// 이번 달 마지막 날짜
	const TLDay = thisLast.getDay();	// 이번 달 마지막 요일

	document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`;	// 2021년 3월

	const prevDates = [];				// 지난 달 날짜
	const thisDates = [...Array(TLDate + 1).keys()].slice(1);	// 이번 달 날짜
	const nextDates = [];				// 다음 달 날짜

	const matchDates = [
	{name: "vs JAG", year: 2020, month: 7, day:9, time: "14:00", event: "lol"},
	{name: "vs BRB", year: 2020, month: 7, day:16, time: "17:00", event: "lol"},
	{name: "vs ASP", year: 2020, month: 7, day:23, time: "17:00", event: "lol"},
	{name: "vs GRF", year: 2020, month: 7, day:27, time: "17:00", event: "lol"},
	{name: "vs RNW", year: 2020, month: 7, day:30, time: "17:00", event: "lol"},
	{name: "vs JAG", year: 2020, month: 8, day:3, time: "17:00", event: "lol"},
	{name: "vs BRB", year: 2020, month: 8, day:6, time: "14:00", event: "lol"},
	{name: "vs EM", year: 2020, month: 8, day:10, time: "17:00", event: "lol"},
	{name: "vs ESC", year: 2020, month: 8, day:14, time: "14:00", event: "lol"},
	{name: "vs RNW", year: 2020, month: 8, day:24, time: "17:00", event: "lol"},
	{name: "vs EM", year: 2020, month: 8, day:27, time: "19:00", event: "ow"},
	{name: "vs RNW", year: 2020, month: 9, day:3, time: "19:00", event: "ow"},
	{name: "vs TDI", year: 2020, month: 9, day:17, time: "19:00", event: "ow"},
	{name: "vs EM", year: 2020, month: 9, day:17, time: "19:00", event: "ow"},
	{name: "vs BM", year: 2020, month: 9, day:24, time: "17:00", event: "ow"}
	];

	if (PLDay !== 6) {						// 지난달 마지막 요일이 토요일(6)이라면 그릴 필요 없음
	  for (let i = 0; i < PLDay + 1; i++) {	// 0부터 지난달 마지막 요일
	    prevDates.unshift(PLDate - i);		// prevDates 배열에 앞쪽으로 계속 채워넣음
	}
}
	for (let i = 1; i < 7 - TLDay; i++) {	// nextDates 배열에 하나씩 채워 넣음
		nextDates.push(i);
	}

	const dates = prevDates.concat(thisDates, nextDates);	// 그리기
	const firstDateIndex = dates.indexOf(1);
	const lastDateIndex = dates.lastIndexOf(TLDate);
	dates.forEach((date, i) => {
		const condition = i >= firstDateIndex && i < lastDateIndex + 1
		? 'this'
		: 'other';

		var isMatch = false;
		var matchIndex = 0;
		var matchEvent = "";

		matchDates.forEach((item, index) => {
			if(viewYear == item.year && viewMonth + 1 == item.month && date == item.day) {
				isMatch = true;
				matchIndex = index;
				matchEvent = item.event;
			}
		})

		if(isMatch && condition == 'this') {
			dates[i] = `<div class="date">
			<span class="${condition}">${date}</span>
			<ul class="match_schedule">
			<li class="${matchEvent}">${matchDates[matchIndex].name + " " + matchDates[matchIndex].time}</li>
			</ul>
			</div>`;
		} else {
			dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
		}

	})

	document.querySelector('.dates').innerHTML = dates.join('');
}

renderCalendar();

const prevMonth = () => {		// 이전달
	date.setMonth(date.getMonth() - 1);
	renderCalendar();
}
const nextMonth = () => {		// 다음달
	date.setMonth(date.getMonth() + 1);
	renderCalendar();
}
