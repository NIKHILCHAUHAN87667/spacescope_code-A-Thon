import axios from 'axios';

// NOAA Space Weather Prediction Center (SWPC) API
// No API key required - uses public endpoints
const NOAA_BASE_URL = 'https://services.swpc.noaa.gov/json';

// Fetch NOAA Magnetometer (A-index) data
export const fetchNoaaMagnetometer = async () => {
  try {
    const response = await axios.get(`${NOAA_BASE_URL}/satellite/magnetometers_a_index_forecast.json`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching NOAA magnetometer data:', error);
    return [];
  }
};

// Fetch NOAA Solar Wind Data (Bz component)
export const fetchNoaaSolarWind = async () => {
  try {
    const response = await axios.get(`${NOAA_BASE_URL}/satellite/magnetospheric_bz.json`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching NOAA solar wind data:', error);
    return [];
  }
};

// Fetch NOAA Energetic Particle Data (X-ray flux)
export const fetchNoaaEnergeticParticles = async () => {
  try {
    const response = await axios.get(`${NOAA_BASE_URL}/satellite/xray_1m_integrated.json`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching NOAA particle data:', error);
    return [];
  }
};

// Fetch NOAA Alerts and Notifications
export const fetchNoaaAlerts = async () => {
  try {
    const response = await axios.get(`${NOAA_BASE_URL}/warnings/alerts_and_notifications.json`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching NOAA alerts:', error);
    return [];
  }
};

// Fetch NOAA 3-Day Outlook Forecast
export const fetchNoaaForecast = async () => {
  try {
    const response = await axios.get(`${NOAA_BASE_URL}/forecast/3-day-outlook.json`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching NOAA forecast:', error);
    return [];
  }
};

// Fetch NOAA Geomagnetic Storm Forecast (Kp index)
export const fetchNoaaGeomagnetic = async () => {
  try {
    const response = await axios.get(`${NOAA_BASE_URL}/geospace/Kp_forecast_with_recent_obs.json`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching NOAA geomagnetic forecast:', error);
    return [];
  }
};

// Fetch NOAA Solar Proton Event Data
export const fetchNoaaSolarProtons = async () => {
  try {
    const response = await axios.get(`${NOAA_BASE_URL}/satellite/particle_flux_10minute.json`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching NOAA proton data:', error);
    return [];
  }
};

// Fetch NOAA Electron Flux Data
export const fetchNoaaElectrons = async () => {
  try {
    const response = await axios.get(`${NOAA_BASE_URL}/satellite/electron_flux_10minute.json`);
    return response.data || [];
  } catch (error) {
    console.error('Error fetching NOAA electron data:', error);
    return [];
  }
};

// Parse all NOAA space weather data - calls all endpoints once
// Uses NOAA's publicly available endpoints (no API key required)
export const parseSpaceWeatherData = async () => {
  try {
    // Fetch all NOAA endpoints in parallel with error isolation
    const results = await Promise.allSettled([
      fetchNoaaMagnetometer(),
      fetchNoaaSolarWind(),
      fetchNoaaEnergeticParticles(),
      fetchNoaaAlerts(),
      fetchNoaaForecast(),
      fetchNoaaGeomagnetic(),
      fetchNoaaSolarProtons(),
      fetchNoaaElectrons()
    ]);

    // Helper to extract data from PromiseSettledResult
    const getData = (result) => result.status === 'fulfilled' ? (result.value || []) : [];

    const [
      magnetometerResult,
      solarWindResult,
      particlesResult,
      alertsResult,
      forecastResult,
      geomagneticResult,
      protonsResult,
      electronsResult
    ] = results;

    const magnetometer = getData(magnetometerResult);
    const solarWind = getData(solarWindResult);
    const particles = getData(particlesResult);
    const alerts = getData(alertsResult);
    const forecast = getData(forecastResult);
    const geomagneticData = getData(geomagneticResult);
    const protons = getData(protonsResult);
    const electrons = getData(electronsResult);

    // Extract KP index from geomagnetic forecast data
    let kpIndex = 0;
    if (Array.isArray(geomagneticData) && geomagneticData.length > 0) {
      const latestKp = geomagneticData[geomagneticData.length - 1];
      kpIndex = latestKp.Kp || latestKp.kp || 0;
    }

    // Determine activity level based on KP index
    let activityLevel = 'Low';
    if (kpIndex >= 7) activityLevel = 'High';
    else if (kpIndex >= 5) activityLevel = 'Moderate';

    // Extract solar wind speed from Bz measurements
    let solarWindSpeed = 400;
    if (Array.isArray(solarWind) && solarWind.length > 0) {
      const latestWind = solarWind[solarWind.length - 1];
      // Map Bz magnitude to estimated wind speed (nT to km/s conversion)
      solarWindSpeed = Math.min(Math.abs(latestWind.bz || latestWind.Bz || 0) * 2 + 300, 800);
    }

    // Extract X-ray flux level from particle data
    let xrayFluxLevel = 0;
    if (Array.isArray(particles) && particles.length > 0) {
      const latestParticles = particles[particles.length - 1];
      xrayFluxLevel = latestParticles.flux ? Math.min(latestParticles.flux * 10, 100) : 0;
    }

    // Extract proton flux level
    let protonFluxLevel = 10;
    if (Array.isArray(protons) && protons.length > 0) {
      const latestProtons = protons[protons.length - 1];
      protonFluxLevel = latestProtons.flux ? Math.min(latestProtons.flux * 5, 100) : 10;
    }

    // Extract electron flux level
    let electronFluxLevel = 10;
    if (Array.isArray(electrons) && electrons.length > 0) {
      const latestElectrons = electrons[electrons.length - 1];
      electronFluxLevel = latestElectrons.flux ? Math.min(latestElectrons.flux * 5, 100) : 10;
    }

    // Format events from alerts
    const events = Array.isArray(alerts) ? alerts.slice(0, 10).map((alert) => ({
      type: alert.event_type || alert.phenomenon || 'Space Weather Alert',
      severity: alert.severity || 'Moderate',
      description: alert.message || alert.alert_text || 'Space weather event detected',
      startTime: alert.issue_datetime || alert.issuance_time || new Date()
    })) : [];

    return {
      activityLevel,
      kpIndex,
      solarWindSpeed: Math.min(solarWindSpeed, 800),
      protonFluxLevel: Math.min(protonFluxLevel, 100),
      electronFluxLevel: Math.min(electronFluxLevel, 100),
      xrayFluxLevel: Math.min(xrayFluxLevel, 100),
      events: events,
      eventCounts: {
        alerts: alerts.length || 0,
        magnetometerReadings: magnetometer.length || 0,
        solarWindReadings: solarWind.length || 0,
        particleReadings: particles.length || 0,
        forecastPoints: forecast.length || 0,
        geomagneticReadings: geomagneticData.length || 0,
        protonReadings: protons.length || 0,
        electronReadings: electrons.length || 0
      },
      lastUpdated: new Date(),
      allData: {
        magnetometer,
        solarWind,
        particles,
        alerts,
        forecast,
        geomagnetic: geomagneticData,
        protons,
        electrons
      },
      dataSource: 'NOAA Space Weather Prediction Center (SWPC)'
    };
  } catch (error) {
    console.error('Error parsing NOAA space weather data:', error);
    throw error;
  }
};
