import { useEffect, useRef, useState } from "react";
import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import type { MapController } from "@maptiler/geocoding-control/types";
import "@maptiler/geocoding-control/style.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const MapCreate = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const apiKey = 'sUKR19LMrbXi8mWAm7EP';
  const [mapController, setMapController] = useState<MapController>();

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;
  
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets/style.json?key=${apiKey}`,
      center: [-1.295056, 38.123522],
      zoom: 16.5,
    });

    setMapController(createMapLibreGlMapController(map.current, maplibregl));

      map.current?.on('load', function () {
        map.current?.addSource('places', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<div class="font-n27 bg-portada text-primary"><strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p></div>',
          'icon': 'marker'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-1.295056, 38.123522]
          }
          },
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<div className="pt-52">strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p></div><',
          'icon': 'theatre'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.003168, 38.894651]
          }
          },
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
          'icon': 'bar'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.090372, 38.881189]
          }
          },
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<strong>Ballston Arts & Crafts Market</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
          'icon': 'art-gallery'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.111561, 38.882342]
          }
          },
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
          'icon': 'bicycle'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.052477, 38.943951]
          }
          },
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
          'icon': 'rocket'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.043444, 38.909664]
          }
          },
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<strong>Muhsinah</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
          'icon': 'music'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.031706, 38.914581]
          }
          },
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
          'icon': 'music'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.020945, 38.878241]
          }
          },
          {
          'type': 'Feature',
          'properties': {
          'description':
          '<strong>Truckeroo</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
          'icon': 'music'
          },
          'geometry': {
          'type': 'Point',
          'coordinates': [-77.007481, 38.876516]
          }
          }
          ]
        }
        });
        // Add a layer showing the places.
        map.current?.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
        'icon-image': '{icon}_15',
        'icon-overlap': 'always'
        }
        });
        
        // Al hacer clic en un marcador, mostrar su descripción
        map.current?.on('click', 'places', function(e:any) {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const description = e.features[0].properties.description;
      
          // Crear una ventana emergente en el marcador
          new maplibregl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map.current!);
        });

      
      }); // cierra el parentesis del evento "load"
      
      return () => {
        map.current?.remove();
        map.current = null;
      };
    }, [apiKey]);


    
    
  return (
    <div>
      <div className="">
      <GeocodingControl apiKey={apiKey} mapController={mapController} placeholder="Busca tu ciudad" />
      </div>
      <div
        ref={mapContainer}
        style={{ width: "auto", height: "600px", marginTop: "8px" }}
      />
    </div>
  );
}