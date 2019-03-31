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
      window.ChromeSamples.setStatus('The Battery Status API is not supported on ' +
        'this platform.');
    }
    return () => {
      window.navigator.getBattery().then((battery) => unHookBattery(battery));
    };
  },[]);

  const unHookBattery = (battery) => {
    battery.removeEventListener('levelchange', updateBattery);
    battery.removeEventListener('chargingchange', updateBattery);
    battery.removeEventListener('dischargingtimechange', updateBattery);
    battery.removeEventListener('chargingtimechange', updateBattery);
  };

  const hookBattery = (battery) => {
    updateBattery(battery);
    battery.addEventListener('levelchange', updateBattery);
    battery.addEventListener('chargingchange', updateBattery);
    battery.addEventListener('dischargingtimechange', updateBattery);
    battery.addEventListener('chargingtimechange', updateBattery);
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
