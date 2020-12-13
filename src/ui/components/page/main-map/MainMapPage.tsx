import * as React from "react";
import {FC, useEffect, useRef, useState} from "react";
import "./MainMapPage.scss"
import {httpClient} from "../../../../api/rest-api";
import L from 'leaflet'

export const MainMapPage: FC = () => {
    const [mapContainer, setMapContainer] = useState<HTMLDivElement>();
    const [map, setMap] = useState<L.Map>(null);


    useEffect(() => {
        if (!mapContainer) return;
        const map = window["map"] = L.map(mapContainer, {preferCanvas: true}).setView([54.74306, 55.96779], 10);
        setMap(map);
        const streets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        let citiesLayer = L.layerGroup();

        var baseMaps = {
            "Streets": streets
        };
        var overlayMaps = {
            "Cities": citiesLayer
        };
        L.control.layers(baseMaps, overlayMaps).addTo(map);

        httpClient.get("citys").then((response) => {
            //L.geoJSON(response.data).addTo(map)
            L.marker([51.5, -0.09]).addTo(map)
            console.log("response",response.data);
            const cities = response.data;
            // const graphicsLayer = new GraphicsLayer();
            // map.add(graphicsLayer);
            citiesLayer.clearLayers();
            cities.forEach((c) => {
                L.circleMarker([c.latitude, c.longitude], {radius: 5}).addTo(citiesLayer);
            })
        })

        return () => {
        };
    }, [mapContainer]);

    return (
        <div className="main-map-container" ref={setMapContainer}>
        </div>
    )
}