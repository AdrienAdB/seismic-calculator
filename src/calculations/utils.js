export const kntsToMs = 0.5144447;
export const cuinToCubicfoot = 0.0005787037;
export const cuinToCubicmeter = 0.00001638706;
export const mlToCuin = 0.06102;

export const addZero = (i) => {
  if (i < 10) { i = "0" + i; }
  return i;
}

export const secondsToTime = (seconds) => {

  seconds = Number(seconds);
  var d = Math.floor(seconds/(3600*24));
  var h = addZero( Math.floor(seconds % (3600*24)/3600) );
  var m = addZero( Math.floor(seconds % 3600/60) );
  var date = '';

  if(seconds<60){
    date += seconds+"s";
  } else {
    var s = addZero( Math.floor(seconds % 60) );
    if(d>0){ date += d+"d "; }
    if(h>0 || d>0){ date += h+"h"; }
    if(m>0 || h>0 || d>0){ date += m+":"; }
    if(s>0 || m>0 || h>0 || d>0){ date += s; }
  }

  return date;
}
