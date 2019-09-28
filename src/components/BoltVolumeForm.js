/*
BoltVolumeForm

Calculate source volume from chamber ml and gun type

*/

import React from 'react';

import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import { Select, Input, InputLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

import Result from './Result';


const mlToCuin = 0.06102;

const defaultValues = {
  volume: '---.-',
  manufacturer: 'bolt',
  type: '1900',
  ml: '',
  formula: 'V = -- - -.----- - --'
}

export default function BoltVolumeForm(){


  const [volume, setVolume] = useState(defaultValues.volume);
  const [manufacturer] = useState(defaultValues.manufacturer);
  const [type, setType] = useState(defaultValues.type);
  const [ml, setMl] = useState(defaultValues.ml);
  const [formula, setFormula] = useState(defaultValues.formula);

  useEffect(() => {
    var vf = getVolume({manufacturer, type, ml});
    if(vf){
      setVolume(vf.volume);
      setFormula(vf.formula);
    }
  }, [manufacturer, type, ml]);


  return (

    <Grid container spacing={3}>

      <Grid item xs={12}>
        <InputLabel htmlFor="manufacturer">Manufacturer</InputLabel>
        <Select
            fullWidth
            label="Manufacturer"
            name="manufacturer"
            value={manufacturer}
          >
            <option disabled>-- select manufacturer --</option>
            <option value="bolt" selected>Bolt</option>
        </Select>
      </Grid>



      <Grid item xs={12}>
        <InputLabel htmlFor="type">Type</InputLabel>
        <RadioGroup
          aria-label="type"
          name="type"
          onChange={(e) => setType(e.target.value)}
          value={type}>
            <FormControlLabel value="1900" control={<Radio color="primary"/>} label="1900LLXT" />
            <FormControlLabel value="1500" control={<Radio color="primary"/>} label="1500" />
            <FormControlLabel value="1519" control={<Radio color="primary"/>} label="1500 (+1519 ring)" />
        </RadioGroup>
      </Grid>

      <Grid item xs={12}>
          <InputLabel htmlFor="ml">Chamber volume (ml)</InputLabel>
          <Input
            fullWidth
            type="number"
            name="ml"
            placeholder="Enter chamber volume in ml.."
            inputProps={{
              min: 0,
              step: 10
            }}
            value={ml}
            onChange={(e) => setMl(e.target.value)}
            variant="outlined"/>
      </Grid>

      <Grid item xs={12}>
          <Result
            title="Volume"
            value={volume+"cu.in"}
            description={formula}/>
      </Grid>


    </Grid>

  );
}




function getVolume(props){

  var volume;
  var formula;
  var manufacturer = props.manufacturer;
  var type = props.type;
  var ml = props.ml;

  if(manufacturer === 'bolt' && ml){
    if(type === '1900'){
        volume = (ml*mlToCuin)+8.9;
        formula = 'V = ml x '+mlToCuin+' + 8.9';
    }

    if(type === '1500'){
        volume = (ml*mlToCuin)+30;
        formula = 'V = ml x '+mlToCuin+' + 30';
    }

    if(type === '1519'){
        volume = (ml*mlToCuin)+35;
        formula = 'V = ml x '+mlToCuin+' + 35';
    }
  }

  if(volume){
    return {volume: volume.toFixed(1), formula: formula};
  } else {
    return {volume: defaultValues.volume, formula: defaultValues.formula };
  }
}
