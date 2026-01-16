import { useEffect, useState } from 'react';
import axios from 'axios';

const NOAA_BASE = 'https://services.swpc.noaa.gov';

export const useSpaceWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch NOAA data in parallel (SAFE)
      const [kpRes, windRes, xrayRes] = await Promise.all([
        axios.get(`${NOAA_BASE}/json/planetary_k_index_1m.json`),
        axios.get(`${NOAA_BASE}/products/solar-wind/plasma-1-day.json`),
        axios.get(`${NOAA_BASE}/json/goes/primary/xrays-1-day.json`)
      ]);

      // ---- KP INDEX ----
      const kpData = kpRes.data;
      const latestKp = kpData[kpData.length - 1]?.kp_index ?? 2;

      const activityLevel =
        latestKp >= 7 ? 'High' :
        latestKp >= 5 ? 'Moderate' :
        'Low';

      // ---- SOLAR WIND SPEED ----
      // NOAA plasma data is table-like, last row is latest
      const windRows = windRes.data;
      const latestWind = windRows[windRows.length - 1];
      const solarWindSpeed = Number(latestWind?.[2]) || 400;

      // ---- X-RAY FLUX ----
      const xrayData = xrayRes.data;
      const latestXray = xrayData[xrayData.length - 1];
      const xrayFlux = Number(latestXray?.flux) || 0;

      // Scale X-ray flux for UI (simple & explainable)
      const xrayFluxLevel =
        xrayFlux > 1e-4 ? 100 :
        xrayFlux > 1e-5 ? 75 :
        xrayFlux > 1e-6 ? 50 :
        xrayFlux > 1e-7 ? 25 : 10;

      setWeatherData({
        kpIndex: latestKp,
        activityLevel,
        solarWindSpeed: Math.min(solarWindSpeed, 800),
        protonFluxLevel: activityLevel === 'High' ? 70 : 30,
        electronFluxLevel: xrayFluxLevel,
        xrayFluxLevel,
        events: [], // NOAA is continuous data, not event-based
        source: 'NOAA SWPC'
      });

      setLastUpdated(new Date());
    } catch (err) {
      console.error('NOAA fetch failed:', err);
      setError('Unable to fetch live NOAA space weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    weatherData,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
    isDegraded: !!error
  };
};
