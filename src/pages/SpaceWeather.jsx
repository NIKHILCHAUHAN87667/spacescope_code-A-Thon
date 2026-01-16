import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Sun, Activity, Zap, Radio, AlertTriangle, RefreshCw, AlertCircle, List,
  Satellite, Navigation, Zap as ZapIcon, Plane, TrendingUp, TrendingDown
} from 'lucide-react';
import { AIExplainButton } from '../components/AIExplainButton';
import { useSpaceWeatherData } from '../hooks/useSpaceWeatherData';

export const SpaceWeather = () => {
  const { weatherData: apiData, loading, error, lastUpdated, refetch } =
    useSpaceWeatherData();

  const weatherData = apiData || {
    kpIndex: 0,
    activityLevel: 'Loading',
    solarWindSpeed: 0,
    protonFluxLevel: 0,
    electronFluxLevel: 0,
    xrayFluxLevel: 0,
    events: [],
    eventCounts: {}
  };

  const getStatus = (value, limits) => {
    if (value <= limits.low) return 'low';
    if (value <= limits.moderate) return 'moderate';
    return 'high';
  };

  const badgeColor = (level) => {
    if (level === 'High') return 'bg-destructive/20 text-destructive';
    if (level === 'Moderate') return 'bg-warning/20 text-warning';
    return 'bg-success/20 text-success';
  };

  // Determine aurora visibility based on KP index
  const getAuroraOutlook = (kp) => {
    if (kp <= 3) return {
      level: 'LOW',
      regions: ['Far Northern Alaska', 'Extreme Northern Canada'],
      color: 'text-muted-foreground'
    };
    if (kp <= 5) return {
      level: 'MODERATE',
      regions: ['Alaska', 'Northern Canada', 'Scandinavia', 'Northern Europe'],
      color: 'text-warning'
    };
    if (kp <= 7) return {
      level: 'HIGH',
      regions: ['Most of Canada', 'Northern US', 'UK', 'Central Europe', 'Russia'],
      color: 'text-accent'
    };
    return {
      level: 'VERY HIGH',
      regions: ['Canada to US Border', 'UK to Southern Europe', 'Northern Asia'],
      color: 'text-destructive'
    };
  };

  // Determine tech impact based on KP index
  const getTechImpact = (kp) => {
    if (kp <= 3) return {
      satellites: { status: 'Normal', icon: '✓' },
      gps: { status: 'Stable', icon: '✓' },
      power: { status: 'Normal', icon: '✓' },
      aviation: { status: 'Safe', icon: '✓' }
    };
    if (kp <= 5) return {
      satellites: { status: 'Minor disruptions', icon: '⚠' },
      gps: { status: 'Minor accuracy loss', icon: '⚠' },
      power: { status: 'No risk', icon: '✓' },
      aviation: { status: 'Safe', icon: '✓' }
    };
    if (kp <= 7) return {
      satellites: { status: 'Potential issues', icon: '⚠' },
      gps: { status: 'Degraded', icon: '⚠' },
      power: { status: 'Minor risk', icon: '⚠' },
      aviation: { status: 'Polar routes caution', icon: '⚠' }
    };
    return {
      satellites: { status: 'At risk', icon: '⚠' },
      gps: { status: 'Major degradation', icon: '⚠' },
      power: { status: 'Potential impact', icon: '⚠' },
      aviation: { status: 'Route restrictions', icon: '⚠' }
    };
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Space <span className="text-gradient-primary">Weather Dashboard</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Live space weather alerts powered by NOAA SWPC
          </p>

          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={refetch}
              disabled={loading || error}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                error
                  ? 'bg-muted/20 text-muted-foreground cursor-not-allowed opacity-50'
                  : 'bg-primary/20 hover:bg-primary/30 text-primary'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            {lastUpdated && (
              <span className="text-sm text-muted-foreground">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Degraded Mode Notice (when rate-limited) */}
        {error && (
          <div className="mb-8 p-4 rounded-lg bg-warning/10 border border-warning/30 flex gap-3">
            <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning">
                Live NASA data temporarily unavailable
              </h3>
              <p className="text-sm text-warning/80 mt-1">
                Due to API rate limits, displaying last fetched space weather snapshot. This is expected behavior with NASA's DONKI API.
              </p>
            </div>
          </div>
        )}

        {/* Solar Activity Summary */}
        <Card className="mb-8 bg-card/80 backdrop-blur-sm border-warning/30">
          <CardHeader className="flex flex-row gap-4 items-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-warning to-accent flex items-center justify-center">
              <Sun className="text-white w-8 h-8" />
            </div>
            <div>
              <CardTitle className="text-3xl flex items-center gap-3">
                Solar Activity
                <Badge className={badgeColor(weatherData.activityLevel)}>
                  {weatherData.activityLevel}
                </Badge>
              </CardTitle>
              <CardDescription>
                KP Index: {weatherData.kpIndex}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <AIExplainButton topic="Current Solar Activity and KP Index" />
          </CardContent>
        </Card>

        {/* Aurora Visibility Insight */}
        {(() => {
          const aurora = getAuroraOutlook(weatherData.kpIndex);
          return (
            <Card className="mb-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🌌 Aurora Outlook
                </CardTitle>
                <CardDescription>
                  Visibility based on current KP Index
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge className={`${aurora.color} bg-transparent border`}>
                    {aurora.level} VISIBILITY
                  </Badge>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-sm">Best Regions Tonight:</p>
                  <ul className="space-y-1">
                    {aurora.regions.map((region, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-accent">•</span> {region}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })()}

        {/* Tech Impact Summary */}
        {(() => {
          const impact = getTechImpact(weatherData.kpIndex);
          return (
            <Card className="mb-8 bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Impact on Technology
                </CardTitle>
                <CardDescription>
                  How today's space weather affects your systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Satellites', data: impact.satellites, icon: Satellite },
                    { label: 'GPS', data: impact.gps, icon: Navigation },
                    { label: 'Power Grids', data: impact.power, icon: ZapIcon },
                    { label: 'Aviation', data: impact.aviation, icon: Plane }
                  ].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={idx} className="p-3 rounded-lg bg-muted/30 border border-primary/10">
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="w-4 h-4 text-accent" />
                          <p className="text-xs font-semibold">{item.label}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.data.status}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })()}

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[
            {
              label: 'Solar Wind Speed',
              value: weatherData.solarWindSpeed,
              max: 800,
              unit: 'km/s',
              limits: { low: 300, moderate: 500 }
            },
            {
              label: 'Proton Flux',
              value: weatherData.protonFluxLevel,
              max: 100,
              unit: 'pfu',
              limits: { low: 33, moderate: 66 }
            },
            {
              label: 'Electron Flux',
              value: weatherData.electronFluxLevel,
              max: 100,
              unit: '%',
              limits: { low: 33, moderate: 66 }
            },
            {
              label: 'X-ray Flux',
              value: weatherData.xrayFluxLevel,
              max: 100,
              unit: 'class',
              limits: { low: 33, moderate: 66 }
            }
          ].map((m, i) => (
            <Card key={i} className="bg-card/80 border-primary/20">
              <CardHeader>
                <CardTitle>{m.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-accent">
                    {Math.round(m.value)}
                  </span>
                  <span className="text-muted-foreground">{m.unit}</span>
                </div>
                <Progress value={(m.value / m.max) * 100} />
                <AIExplainButton topic={m.label} size="sm" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* KP Index Trend */}
        <Card className="mb-8 bg-card/80 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {weatherData.kpIndex < 3 ? (
                <>
                  <TrendingDown className="w-5 h-5 text-success" />
                  KP Trend: Stable
                </>
              ) : weatherData.kpIndex < 6 ? (
                <>
                  <TrendingUp className="w-5 h-5 text-warning" />
                  KP Trend: Slightly Active
                </>
              ) : (
                <>
                  <TrendingUp className="w-5 h-5 text-destructive" />
                  KP Trend: Active
                </>
              )}
            </CardTitle>
            <CardDescription>
              Space weather activity over the last 6 hours
            </CardDescription>
          </CardHeader>
        </Card>

        {/* DONKI Events */}
        <Card className="bg-card/80 border-primary/20 mb-8">
          <CardHeader className="flex flex-row items-center gap-3">
            <List className="w-6 h-6 text-accent" />
            <div>
              <CardTitle className="text-2xl">
                Recent Space Weather Events
              </CardTitle>
              <CardDescription>
                Events detected by NOAA SWPC in the last 7 days
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {weatherData.events.length ? (
              weatherData.events.map((e, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg bg-muted/30 border border-primary/20"
                >
                  <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-accent">
                      {e.type} Event
                    </h4>
                    <Badge className={badgeColor(e.severity)}>
                      {e.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {e.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    🕒 {new Date(e.startTime).toUTCString()}
                  </p>
                  <AIExplainButton
                    topic={`${e.type} space weather event`}
                    size="sm"
                  />
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">
                No significant space weather events detected recently.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Data Source Transparency Footer */}
        <div className="mt-12 pt-8 border-t border-primary/20 text-center text-xs text-muted-foreground space-y-2">
          <p>
            <strong>Data Source:</strong> NOAA Space Weather Prediction Center (SWPC)
          </p>
          <p>
            Updated every 1–5 minutes | Live forecasting data for space weather events
          </p>
          <p className="text-xs text-muted-foreground/60">
            Space weather data is provided free by NOAA for public use and education
          </p>
        </div>

      </div>
    </div>
  );
};
