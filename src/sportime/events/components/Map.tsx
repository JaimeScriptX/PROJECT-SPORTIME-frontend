import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import '../../../assets/css/map.css'

export const Map = ({latitude, longitude}:{latitude:number, longitude:number}) => {

  const [isAnimating, setIsAnimating] = useState(true);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const API_KEY = 'sUKR19LMrbXi8mWAm7EP';

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [longitude, latitude],
      zoom: 16.5,
      pitch: 45,
      interactive: false
    });

    function rotateCamera(timestamp: number) {
      // clamp the rotation between 0 -360 degrees
      if(!isAnimating) return
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      map.current?.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation.
      requestAnimationFrame(rotateCamera);
    }

    map.current.on('load', function () {

    rotateCamera(0)

      // Add 3d buildings and remove label layers to enhance the map
      const layers = map.current?.getStyle().layers || [];
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && (layers[i].layout as any)['text-field']) {
          // remove text labels

        }
      }

      map.current?.addLayer({
        id: '3d-buildings',
        source: 'composite',
        'source-layer': 'building',
        filter: ['==', 'extrude', 'true'],
        type: 'fill-extrusion',
        minzoom: 15,
        paint: {
          'fill-extrusion-color': '#aaa',
      
          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
          ],
          'fill-extrusion-opacity': 0.6
        }
      });
      
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [isAnimating, latitude, longitude]);

  return (
    <div className="map-wrap ">
      <div ref={mapContainer} className="map rounded-2xl" />
    </div>
  );
};


