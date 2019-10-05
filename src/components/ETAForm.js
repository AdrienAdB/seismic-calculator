/*
ETAForm
*/

import React from 'react';

import {Box, Grid} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { InputLabel, Input } from '@material-ui/core';

import Result from './Result';

const defaultValues = {
  distance: 1000,
  speedK: 5
}

function addZero(i) {
  if (i < 10) { i = "0" + i; }
  return i;
}

function secondsToTime(seconds) {

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


function displayETA(eta){

  if(eta){
    return ("ETA: "+eta.hours+":"+eta.minutes+":"+eta.seconds+" (UTC)");
  } else {
    return null;
  }
}

function getETA(seconds){

    seconds = Number(seconds);
    var etaDate = new Date().setUTCSeconds(seconds);
    etaDate = new Date(etaDate);

    //console.log(etaDate);

    var eta = {
      hours: addZero( etaDate.getUTCHours() ),
      minutes: addZero( etaDate.getUTCMinutes() ),
      seconds: addZero( etaDate.getUTCSeconds() ),
    };

    console.log(eta);
    return eta;

}

export default function ETAForm(){

  const [distance, setDistance] = useState(defaultValues.distance);

  //speed in knots
  const [speedK, setSpeedK] = useState(defaultValues.speedK);

  //speed in meter/second
  const [speedMs, setSpeedMs] = useState(null);

  //speed on km/h
  const [speedKmH, setSpeedKmH] = useState(null);

  //ETA time
  const [eta, setETA] = useState(null);

  //string time
  const [time, setTime] = useState(null);

  //Maths
  const kntsToMs = 0.5144447;

  //distance and speed
  useEffect(() => {
    var sMs = speedK*kntsToMs;
    var sKmS = sMs*3.6;

    var t;
    if(distance){
      t = (distance/sMs).toFixed(1);
      var eta = getETA(t);
      setETA(eta);
      t = secondsToTime(t);



    } else {
      t = 'N/A';
    }

    setTime(t);

    setSpeedMs(sMs.toFixed(2));
    setSpeedKmH(sKmS.toFixed(0));

  }, [speedK, distance]);



  return (
    <div>
    <Grid container spacing={3}>

      <Grid item xs={12} md={6}>
          <InputLabel htmlFor="distance">Distance (m)</InputLabel>
          <Input
            fullWidth
            type="number"
            name="distance"
            placeholder="Enter distance between shots..."
            inputProps={{
              min: '0',
              step: '100'
            }}
            value={distance}
            onInput={(e) => setDistance(e.target.value)}
            variant="outlined"/>
      </Grid>

      <Grid item xs={12} md={6}>
          <InputLabel htmlFor="speedK">Speed BSP (knts)</InputLabel>
          <Input
            fullWidth
            type="number"
            name="speedK"
            placeholder="Enter speed in knots..."
            inputProps={{
              min: '0',
              step: '0.1'
            }}
            value={speedK}
            onChange={(e) => setSpeedK(e.target.value)}
            variant="outlined"/>
      </Grid>

    </Grid>



    <Box pt={8}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
            <Result
              title="Time"
              value={time}
              description={displayETA(eta)}/>
        </Grid>
        <Grid item xs={12} md={6}>
            <Result
              title="Speed"
              value={speedMs+' m/s'}
              description={speedKmH+' km/h'}/>
        </Grid>
      </Grid>
    </Box>
    </div>


  );
}
