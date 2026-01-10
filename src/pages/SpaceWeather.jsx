import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Activity, Sun, Zap, Radio, AlertTriangle } from 'lucide-react';
import { AIExplainButton } from '../components/AIExplainButton';

export const SpaceWeather = () => {
  const weatherData = {
    solarActivity: {
      level: 'Moderate',
      kpIndex: 4,
      description: 'Moderate solar activity detected. Minor geomagnetic storms possible.',
      impact: 'What does this mean for Earth?',
      explanation: 'Solar activity can affect satellite communications, GPS accuracy, and create beautiful auroras at high latitudes.'
    },
    auroraProbability: {
      high: ['Alaska', 'Northern Canada', 'Scandinavia', 'Iceland'],
      medium: ['Northern US', 'Scotland', 'Northern Russia'],
      low: ['Mid-latitudes']
    },
    metrics: [
      { label: 'Solar Wind Speed', value: 450, max: 800, unit: 'km/s', status: 'normal' },
      { label: 'Proton Flux', value: 15, max: 100, unit: 'pfu', status: 'low' },
      { label: 'Electron Flux', value: 65, max: 100, unit: '%', status: 'moderate' },
      { label: 'X-ray Flux', value: 25, max: 100, unit: 'class', status: 'low' }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'low': return 'text-success';
      case 'normal': return 'text-success';
      case 'moderate': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Space <span className="text-gradient-primary">Weather Dashboard</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time solar activity monitoring and aurora forecasts for Earth.
          </p>
        </div>

        {/* Current Status */}
        <div className="mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-warning/30 card-glow">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-warning to-accent flex items-center justify-center shadow-[0_0_30px_hsl(38_92%_50%/0.5)]">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <CardTitle className="text-3xl">Solar Activity Status</CardTitle>
                    <Badge className="bg-warning/20 text-warning border-warning/30 text-lg px-3 py-1">Moderate</Badge>
                  </div>
                  <CardDescription className="text-base">{weatherData.solarActivity.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  What does this mean for Earth?
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {weatherData.solarActivity.explanation}
                </p>
              </div>
              <AIExplainButton topic="Current Solar Activity" />
            </CardContent>
          </Card>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {weatherData.metrics.map((metric, index) => (
            <Card key={index} className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-smooth">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">{metric.label}</CardTitle>
                  <Badge variant="outline" className={getStatusColor(metric.status)}>
                    {metric.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-accent">{metric.value}</span>
                  <span className="text-lg text-muted-foreground">{metric.unit}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Current Level</span>
                    <span>Max: {metric.max} {metric.unit}</span>
                  </div>
                  <Progress value={(metric.value / metric.max) * 100} className="h-2" />
                </div>
                <AIExplainButton topic={metric.label} size="sm" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Aurora Probability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success to-planet-teal flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-2xl">Aurora Probability Zones</CardTitle>
              </div>
              <CardDescription>Regions where auroras may be visible tonight</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-success">High Probability (70-90%)</h4>
                  <Badge className="bg-success/20 text-success border-success/30">High</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {weatherData.auroraProbability.high.map((region, idx) => (
                    <Badge key={idx} variant="outline" className="border-success/30 text-foreground">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-warning">Medium Probability (40-70%)</h4>
                  <Badge className="bg-warning/20 text-warning border-warning/30">Medium</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {weatherData.auroraProbability.medium.map((region, idx) => (
                    <Badge key={idx} variant="outline" className="border-warning/30 text-foreground">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-muted-foreground">Low Probability (&lt;40%)</h4>
                  <Badge className="bg-muted/50 text-muted-foreground border-muted">Low</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {weatherData.auroraProbability.low.map((region, idx) => (
                    <Badge key={idx} variant="outline" className="text-muted-foreground">
                      {region}
                    </Badge>
                  ))}
                </div>
              </div>
              <AIExplainButton topic="How Auroras Form" />
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-planet-blue to-primary flex items-center justify-center">
                  <Radio className="w-5 h-5 text-white" />
                </div>
                <CardTitle className="text-2xl">Space Weather Impact</CardTitle>
              </div>
              <CardDescription>How space weather affects technology and life on Earth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-accent mb-1">Satellite Communications</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Moderate solar activity may cause minor disruptions to GPS and satellite signals.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-accent mb-1">Power Grids</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      High-latitude power systems should monitor for potential voltage fluctuations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-accent mb-1">Aurora Viewing</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Great opportunities for aurora photography in high-probability zones tonight.
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <AIExplainButton topic="Space Weather Effects on Earth" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};