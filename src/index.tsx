import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui/style/index.scss"

import { App } from "./ui/components/app/App";

ReactDOM.render(
    <App />,
    document.getElementById("reactApp")
);

// // Регистрируем сервис-воркер
// if ("$WEBPACK_ENABLE_SW"+"" === "true") {
//     if ('serviceWorker' in navigator) {
//         window.addEventListener('load', function() {
//             console.log("window loaded");
//             navigator.serviceWorker.register('/sw.js').then(function(registration) {
//                 // Registration was successful
//                 console.log('ServiceWorker registration successful with scope: ', registration.scope);
//             }, function(err) {
//                 // registration failed :(
//                 console.log('ServiceWorker registration failed: ', err);
//             });
//         });
//     }
// }