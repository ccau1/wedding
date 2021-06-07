import { ApiResponse } from "apisauce";
import { select, put } from "redux-saga/effects";
import { curry, is } from "ramda";
import { AnyAction, Reducer } from "redux";

/**
 * Allows your reducers to be reset.
 *
 * @param {string} typeToReset - The action type to listen for.
 * @param {function} originalReducer - The reducer to wrap.
 */
export const resettableReducer = curry(
  (typeToReset: string, originalReducer: Reducer) => {
    // a valid type is required
    if (!is(String, typeToReset) || typeToReset === "") {
      throw new Error("A valid reset type is required.");
    }

    // an original reducer is required
    if (typeof originalReducer !== "function") {
      throw new Error("A reducer is required.");
    }
    // run it through first to get what the default state should be
    const resetState = originalReducer(undefined, { type: "" });

    // create our own reducer that wraps the original one and hijacks the reset
    function reducer(state = resetState, action: AnyAction) {
      if (action && action.type === typeToReset) {
        return resetState;
      } else {
        return originalReducer(state, action);
      }
    }
    return reducer;
  }
);

export const shouldObjectSync = (existingObj: any, newObj: any) => {
  return (
    !existingObj ||
    !newObj ||
    existingObj.__v !== newObj.__v ||
    new Date(existingObj.updatedAt).valueOf() !==
      new Date(newObj.updatedAt).valueOf() ||
    !existingObj.lastSynced ||
    Date.now().valueOf() - new Date(existingObj.lastSynced).valueOf() > 3600000
  );
};

export const handleResponse = <Data = any>(response: ApiResponse<Data>) =>
  function* (
    onSuccess: (data: Data, response: ApiResponse<Data>) => void,
    onFailed: (data: Data, response: ApiResponse<Data>) => void
  ) {
    if (response.ok) {
      yield onSuccess(response.data as Data, response);
    } else {
      yield onFailed(response.data as any, response);
    }
  };
