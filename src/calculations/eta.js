import { addZero, kntsToMs} from './utils';

export const displayETA = (eta) => {

  if(eta){
    return ("ETA: "+eta.hours+":"+eta.minutes+":"+eta.seconds+" (UTC)");
  } else {
    return null;
  }
}


//get time from arrival
export const getTimeFromArrival = (distance, speedK) => {
  return (distance / (speedK*kntsToMs) ).toFixed(1);
}

export const getETA = (seconds) => {

    seconds = Number(seconds);
    var etaDate = new Date(Date.now() + seconds);

    var eta = {
      hours: addZero( etaDate.getUTCHours() ),
      minutes: addZero( etaDate.getUTCMinutes() ),
      seconds: addZero( etaDate.getUTCSeconds() ),
    };

    return eta;

}
