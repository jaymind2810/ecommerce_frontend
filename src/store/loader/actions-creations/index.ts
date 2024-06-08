import { LoaderType } from "../action-Types";

export const actionStart = () => {
  return {
    type: LoaderType.ACTION_START,
    payload: true,
  };
};

export const actionEnd = () => {
  return {
    type: LoaderType.ACTION_END,
    payload: false,
  };
};
