
import { useState, useEffect } from 'react';
// import browserStorage from 'store';

// This hook receives two parameters:
// storageKey: This is the name of our storage that gets used when we retrieve/save our persistent data.
// initialState: This is our default value, but only if the store doesn't exist, otherwise it gets overwritten by the store.
export default (storageKey:string, initialState:any) => {

  // Initiate the internal state.
  const [state, setInternalState] = useState(initialState);

  // Only on our initial load, retrieve the data from the store and set the state to that data.
  useEffect(() => {

    // Retrieve the data from the store.
    const stringItem = localStorage.getItem(storageKey)
    const storageInBrowser = stringItem ? JSON.parse(stringItem) : initialState;

    // If the store exists, overwrite the state with the store's data.
    // Otherwise if the store doesn't exist then "initialState" remains our default value.
    if (storageInBrowser) {
      setInternalState(storageInBrowser);
    }
  }, []);

  // Create a replacement method that will set the state like normal, but that also saves the new state into the store.
  const setState = (newState:any) => {
    if(!newState) return
    localStorage.setItem(storageKey,JSON.stringify(newState));
    setInternalState(newState);
  };

  return [state, setState];
};
