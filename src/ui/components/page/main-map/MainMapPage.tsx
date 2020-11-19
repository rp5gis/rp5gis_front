import * as React from "react";
import {FC, useEffect, useRef} from "react";
import "./main-map-page.scss"
import {httpClient} from "../../../../api/rest-api";

export const MainMapPage: FC = () => {
    const mapRef = useRef();

    useEffect(() => {
        // create map
        // const map = new ArcGISMap({
        //     basemap: 'topo-vector',
        // });
        //
        // // load the map view at the ref's DOM node
        // const view = new MapView({
        //     container: mapRef.current,
        //     map: map,
        //     heightBreakpoint: "large",
        //     center: [55.96779, 54.74306],
        //     zoom: 8
        // });

        httpClient.get("citys").then((response) => {
            const cities = response.data;
            // const graphicsLayer = new GraphicsLayer();
            // map.add(graphicsLayer);
            // cities.forEach((c) => {
            //     const point = new Point({
            //         longitude: c.longitude,
            //         latitude: c.latitude
            //     })
            //     const simpleMarkerSymbol = {
            //         type: "simple-marker",
            //         color: [226, 119, 40],  // orange
            //         outline: {
            //             color: [255, 255, 255], // white
            //             width: 1
            //         }
            //     };
            //     var pointGraphic = new Graphic({
            //         geometry: point,
            //         symbol: simpleMarkerSymbol,
            //         attributes: {
            //             name: c.name
            //         }
            //     });
            //     graphicsLayer.add(pointGraphic);
            // })
        })

        return () => {
            // if (view) {
            //     // destroy the map view
            //     view.container = null;
            // }
        };
    });

    return (
        <div className="main-map-container" ref={mapRef}>
        </div>
    )
}