
 const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

 const showTime = (seconds) => {
    let hours = 0;
    let minutes = 0;

    if (seconds < 0) {
        seconds = 0;
    }

    if (seconds < 60) {
        return `00:00:${padToTwo(seconds)}`;
    }

    let remainingSeconds = seconds % 60;
    minutes = (seconds - remainingSeconds) / 60;

    if (minutes < 60) {
        return `00:${padToTwo(minutes)}:${padToTwo(remainingSeconds)}`;
    }

    let remainingMinutes = minutes % 60;
    hours = (minutes - remainingMinutes) / 60;

    return `${padToTwo(hours)}:${padToTwo(remainingMinutes)}:${padToTwo(remainingSeconds)}`;
}

export default showTime;

// Return name of day 
export const getDayname = () => {
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return days[new Date().getDay()];
}

// Return time of day (Morning,Afternoon, Evening and Night)
export const getTimeOfDay = () => {
    let currentHour = new Date().getHours();
    if (currentHour < 12 && currentHour > 6) {
      return 'Morning';
    } else if (currentHour < 18) {
      return 'Afternoon';
    } else if (currentHour < 20) {
      return 'Evening';
    } else {
        return 'Night';
    }
  };


// function to calculate pace (distance in km and time in seconds)
export const calculatePace = (dist, time_seconds) => {
    if (dist <= 0) {
      return 0;
    }
    dist = parseFloat(dist);
    time = showTime(time_seconds);
    const hrs = parseInt(time.substring(0, 2));
    const mins = parseInt(time.substring(3, 5));
    const secs = parseInt(time.substring(6, 8));
  
    var totalTime = (hrs * 60) + mins + (secs / 60);
    let pace = totalTime / dist;
    if (pace == 0) {
        return '0\'0" ';
      }
      const paceMins = Math.floor(pace);
      const paceSecs = (pace % 1).toFixed(1) * 60;
      pace = paceMins + "'" + paceSecs + '"';
      return pace;
  };


  export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;
           
    // convert to radiansa
        lat1 = lat1 * Math.PI / 180.0;
        lat2 = lat2 * Math.PI / 180.0;
         
    // apply formulae
        let a = Math.pow(Math.sin(dLat / 2), 2) +
                   Math.pow(Math.sin(dLon / 2), 2) *
                   Math.cos(lat1) *
                   Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c;
        
  };

  

