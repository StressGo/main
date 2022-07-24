const {padToTwo,showTime,getDayname,getTimeOfDay,calculatePace,calculateDistance} = require("./Calculations")

test('padToTwo 0s', () => {
    expect(padToTwo(0)).toBe("00");
  });

// test('padToTwo String', () => {
//     expect(padToTwo("String")).toThrow(TypeError);
//   });

