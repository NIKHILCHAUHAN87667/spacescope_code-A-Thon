import REGION_GEOJSON from './regionsGEO.json';

export const regionsToGeoJSON = (regions) => ({
  type: 'FeatureCollection',
  features: regions
    .map(region => REGION_GEOJSON[region])
    .filter(feature => feature !== undefined)
});
