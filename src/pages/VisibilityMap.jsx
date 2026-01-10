import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

export const VisibilityMap = ({ geojson }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // FREE tiles
      center: [0, 20],
      zoom: 1.5,
    });

    mapRef.current.on('load', () => {
      mapRef.current.addSource('visibility', {
        type: 'geojson',
        data: geojson,
      });

      mapRef.current.addLayer({
        id: 'visibility-layer',
        type: 'fill',
        source: 'visibility',
        paint: {
          'fill-color': '#8E44AD',
          'fill-opacity': 0.5,
        },
      });

      mapRef.current.addLayer({
        id: 'visibility-outline',
        type: 'line',
        source: 'visibility',
        paint: {
          'line-color': '#FFD700',
          'line-width': 2,
        },
      });
    });

    return () => mapRef.current?.remove();
  }, [geojson]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[400px] rounded-lg border border-primary/30"
    />
  );
};
