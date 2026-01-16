#!/usr/bin/env node

/**
 * Extended test script for NASA DONKI APIs
 * Run: node test-api.js
 */

const axios = require('axios');
require('dotenv').config({ path: '.env.local' });

const API_KEY = process.env.REACT_APP_NASA_API_KEY || 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov/DONKI';

// Utility: format date
const formatDate = (date) => {
  const d = new Date(date);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
};

// Date range (last N days)
const getDateRange = (days = 7) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  return {
    startDate: formatDate(start),
    endDate: formatDate(end)
  };
};

// Generic tester
async function testEndpoint(name, endpoint, params = {}) {
  console.log(`\n🔎 Testing ${name}`);
  try {
    const res = await axios.get(`${BASE_URL}/${endpoint}`, {
      params: { ...params, api_key: API_KEY }
    });

    console.log(`✅ Records: ${res.data.length}`);
    if (res.data.length > 0) {
      console.log('📄 Sample Data:');
      console.log(JSON.stringify(res.data[0], null, 2).slice(0, 900));
      console.log('...');
    }
  } catch (err) {
    console.error(`❌ ${name} Error:`, err.response?.status || err.message);
  }
}

async function runTests() {
  const { startDate, endDate } = getDateRange(7);

  console.log('\n🚀 NASA DONKI API – FULL DATA TEST');
  console.log(`📅 Date Range: ${startDate} → ${endDate}`);
  console.log('━'.repeat(80));

  await testEndpoint('Notifications', 'notifications', {
    startDate,
    endDate,
    type: 'all'
  });

  await testEndpoint('Coronal Mass Ejection (CME)', 'CME', {
    startDate,
    endDate
  });

  await testEndpoint('CME Analysis', 'CMEAnalysis', {
    startDate,
    endDate,
    mostAccurateOnly: true,
    speed: 500
  });

  await testEndpoint('Geomagnetic Storm (GST)', 'GST', {
    startDate,
    endDate
  });

  await testEndpoint('Interplanetary Shock (IPS)', 'IPS', {
    startDate,
    endDate,
    location: 'Earth'
  });

  await testEndpoint('Solar Flare (FLR)', 'FLR', {
    startDate,
    endDate
  });

  await testEndpoint('Solar Energetic Particle (SEP)', 'SEP', {
    startDate,
    endDate
  });

  await testEndpoint('Magnetopause Crossing (MPC)', 'MPC', {
    startDate,
    endDate
  });

  await testEndpoint('Radiation Belt Enhancement (RBE)', 'RBE', {
    startDate,
    endDate
  });

  await testEndpoint('High Speed Stream (HSS)', 'HSS', {
    startDate,
    endDate
  });

  await testEndpoint('WSA + ENLIL Simulation', 'WSAEnlilSimulations', {
    startDate,
    endDate
  });

  console.log('\n' + '━'.repeat(80));
  console.log('✨ DONKI API TEST COMPLETE');
  console.log('💡 Next steps:');
  console.log('   • Identify common fields');
  console.log('   • Normalize severity + time');
  console.log('   • Map events to UI alerts');
  console.log('');
}

runTests().catch(err => {
  console.error('\n❌ Fatal Error:', err.message);
  process.exit(1);
});
