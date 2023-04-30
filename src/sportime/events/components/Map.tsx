import { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import '../../../assets/css/map.css'

export const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const API_KEY = 'sUKR19LMrbXi8mWAm7EP';
  const [isAnimating, setIsAnimating] = useState(true);

  const stopAnimation = () => {
    setIsAnimating(false);
    console.log(isAnimating)
  }

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
      center: [-1.295056, 38.123522],
      zoom: 16.5,
      pitch: 45,
      interactive: false
    });

    function rotateCamera(timestamp: number) {
      if (!isAnimating) return; // stop animation if isAnimating is false

      // clamp the rotation between 0 -360 degrees
      // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
      map.current?.rotateTo((timestamp / 100) % 360, { duration: 0 });
      // Request the next frame of the animation.
      requestAnimationFrame(rotateCamera);
    }

    map.current.on('load', function () {
      // Start the animation.
      if (isAnimating)  return  rotateCamera(0);; 


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
  }, [API_KEY, isAnimating ]);

  return (
    <div className="map-wrap ">
      <div ref={mapContainer} className="map rounded-2xl" />
      <button className='absolute bg-primary p-2 rounded-tl-xl' onClick={stopAnimation}>Detener animación</button>
    </div>
  );
};


