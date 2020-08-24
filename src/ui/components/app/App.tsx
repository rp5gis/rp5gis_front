import * as React from "react";
import {FC} from "react";
import { UIRouter, UIView, pushStateLocationPlugin } from "@uirouter/react";
import {RP5NavBar} from "./navigation/RP5NavBar";
import {configRouter} from "../../router/configRouter";
import {routerStates} from "../../router/states";
import {Layout} from "antd";
const { Header, Content, Footer } = Layout;
import "./app.scss"

export const App:FC = (props) => {
    return (
        <UIRouter plugins={[pushStateLocationPlugin]} config={configRouter} states={routerStates}>
            <Layout className={"global-container"}>
                <RP5NavBar/>
                <Content className={"global-container__content"}>
                    <UIView/>
                </Content>
            </Layout>
        </UIRouter>
    )
}