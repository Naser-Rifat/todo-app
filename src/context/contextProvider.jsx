import { createContext, useContext } from "react";

const StateContext = createContext();

export const contextProvider = () => {
  return <StateContext.Provider value={""}></StateContext.Provider>;
};

export const useStateContext = () => useContext(StateContext);
