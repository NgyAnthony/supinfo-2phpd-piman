import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  todolists: [],
};

const reducer = (state: any, action: { type: any; newTodolists: any }) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        todolists: action.newTodolists,
      };
    default:
      return state;
  }
};

export const TodolistsContext = createContext({});

// @ts-ignore
export const TodolistsProvider = ({ children }) => (
  <TodolistsContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </TodolistsContext.Provider>
);
