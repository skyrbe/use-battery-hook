import React, { useReducer, useEffect } from "react"

const initialState = {};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_BATTERY':
      return {
        ...state,
        battery: action.payload
      };
    default:
      throw new Error();
  }
}

const useBattery = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if ('getBattery' in window.navigator) {
      window.navigator.getBattery().then((battery) => hookBattery(battery));
    } else {
      if(window.ChromeSamples) {
        window.ChromeSamples.setStatus('The Battery Status API is not supported on ' +
          'this platform.');
      }
    }
    return () => {
      window.navigator.getBattery().then((battery) => unHookBattery(battery));
    };
  },[]);

  const unHookBattery = (battery) => {
    battery.removeEventListener('levelchange', () => updateBattery(battery));
    battery.removeEventListener('chargingchange', () => updateBattery(battery));
    battery.removeEventListener('dischargingtimechange', () => updateBattery(battery));
    battery.removeEventListener('chargingtimechange', () => updateBattery(battery));
  };

  const hookBattery = (battery) => {
    updateBattery(battery);
    battery.addEventListener('levelchange', () => updateBattery(battery));
    battery.addEventListener('chargingchange', () => updateBattery(battery));
    battery.addEventListener('dischargingtimechange', () => updateBattery(battery));
    battery.addEventListener('chargingtimechange', () => updateBattery(battery));
  };

  const updateBattery = (battery) => {
    dispatch({
      type: 'UPDATE_BATTERY',
      payload: battery
    });
  }

  return state.battery;
};

export default useBattery;
