import * as React from "react";
import {FC, useEffect, useRef} from "react";
import "./main-map-page.scss"
import * as ArcGISMap from 'esri/Map';
import * as MapView from 'esri/views/MapView';

export const MainMapPage: FC = () => {
    const mapRef = useRef();

    useEffect(
        () => {
            // create map
            const map = new ArcGISMap({
                basemap: 'topo-vector',
            });

            // load the map view at the ref's DOM node
            const view = new MapView({
                container: mapRef.current,
                map: map,
                heightBreakpoint: "large",
                center: [55.96779, 54.74306],
                zoom: 8
            });

            return () => {
                if (view) {
                    // destroy the map view
                    view.container = null;
                }
            };
        }
    );

    return (
        <div className="main-map-container" ref={mapRef}>
        </div>
    )
}