import { kntsToMs, cuinToCubicfoot, cuinToCubicmeter } from './utils';


export const getVolumePerMinute = (speedK, interval, volume) => {

  let meterPerMinute = speedK*kntsToMs*60;
  let cuinPerMinute = meterPerMinute/interval*volume;
  let cfm = cuinPerMinute*cuinToCubicfoot;
  let cmh = cuinPerMinute*cuinToCubicmeter*60;

  return {
    cfm: cfm.toFixed(1),
    cmh: cmh.toFixed(1)
  }

}
