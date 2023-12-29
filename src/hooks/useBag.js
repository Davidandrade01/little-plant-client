import { useContext } from "react";
import { BagContext } from "../contexts";

export const useBag=()=>useContext(BagContext)