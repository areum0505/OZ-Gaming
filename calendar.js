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
		dates[i] = `<div class="date"><span class="${condition}">${date}</span></div>`;
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
