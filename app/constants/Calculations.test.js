const {padToTwo,showTime,getDayname,getTimeOfDay,calculatePace,calculateDistance} = require("./Calculations")

// padToTwo
// Corner test case
test('padToTwo 0s', () => {
    expect(padToTwo(0)).toBe("00");
  });

// Positive test case
test('padToTwo 5s', () => {
  expect(padToTwo(5)).toBe("05");
})

test('padToTwo 55s', () => {
  expect(padToTwo(55)).toBe(55);
})

// negative test case
test('padToTwo String', () => {
    try {
      padToTwo("String")
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Type Error');
    }
  });


//showTime
// Corner test case
test('showTime 0s', () => {
  expect(showTime(0)).toBe("00:00:00");
});

//Positive Test case
test('showTime 34s', () => {
  expect(showTime(34)).toBe("00:00:34");
});

test('showTime 665s', () => {
  expect(showTime(665)).toBe("00:11:05");
});


test('showTime 4865s', () => {
  expect(showTime(4865)).toBe("01:21:05");
});

//Negative Test Case
test('showTime -5s', () => {
  expect(showTime(-5)).toBe("00:00:00");
});

//getDayname
//Test Case (choose the Day based on current timing)
test('getDayname currentDay', () => {
  expect(getDayname()).toBe("Tuesday");
});

//getTimeOfDay
//Test Case (choose the Time based on current timing: Morning,Afternoon,Evening and Night)
test('getTimeOfDay currentDay', () => {
  expect(getTimeOfDay()).toBe("Afternoon");
});

// calculatePace
// Corner Case
test('calculatePace 0km 10s', () => {
  expect(calculatePace(0,10)).toBe('0\'0"');
});

test('calculatePace 10km 0s', () => {
  expect(calculatePace(10,0)).toBe('0\'0"');
});

// Postive test Case
test('calculatePace 1km 600s', () => {
  expect(calculatePace(1,600)).toBe('10\'00"');
});

// Negative test case
test('calculatePace 10km -1s', () => {
  expect(calculatePace(10,-1)).toBe('0\'0"');
});


//calculateDistance
//Corner Test case
test('calculateDistace (0,0) (0,0)', () => {
  expect(calculateDistance(0,0,0,0)).toBe(0);
});

test('calculateDistace (0,0) (50.5007,50.5007)', () => {
  expect(calculateDistance(0,0,50.5007,50.5007)).toBe(7353.873100127259);
});

test('calculateDistace (50.5007,50.5007) (0,0)', () => {
  expect(calculateDistance(50.5007,50.5007,0,0)).toBe(7353.873100127259);
});

//Positive test case
test('calculateDistace (-25.777,45.888) (50.5007,50.5007)', () => {
  expect(calculateDistance(-25.777,45.888,50.5007,50.5007)).toBe(8493.857029749895);
});

test('calculateDistace (25.777,45.888) (50.5007,-50.5007)', () => {
  expect(calculateDistance(25.777,45.888,50.5007,-50.5007)).toBe(8253.677264135178);
});