import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFtaWFuMTkiLCJhIjoiY2wzZGthNG51MDh4MjNjdGxpYmJ4Ym9rbSJ9.u-3HjjM7c0_JpbIcdqxx-Q';
                        
export default function Mapbox() {
    const mapContainer = useRef(null);
const map = useRef(null);
const [lng, setLng] = useState(-73.9303);
const [lat, setLat] = useState(40.7144);
const [zoom, setZoom] = useState(9);

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
  })
  
  function successLocation(position) {
    setLng(position.coords.longitude)
    setLat(position.coords.latitude)
  }
  
  function errorLocation() {

  }

useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: zoom
    });
    });
    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
        });

  return (
<div className='mapbar-container'>
<div className="sidebar">
Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
</div>
<div ref={mapContainer} className="map-container" />
</div>
);
}