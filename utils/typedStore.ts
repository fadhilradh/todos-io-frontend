import { AppDispatch, RootState } from "@/src/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useTypedDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
