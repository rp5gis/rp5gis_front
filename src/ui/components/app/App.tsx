import * as React from "react";
import {FC} from "react";
import { UIRouter, UIView, pushStateLocationPlugin } from "@uirouter/react";
// import {RP5NavBar} from "./navigation/RP5NavBar";
import {configRouter} from "../../router/configRouter";
import {routerStates} from "../../router/states";

import "./app.scss"

export const App:FC = (props) => {
    return (
        <div>Hello world!</div>
    )
}