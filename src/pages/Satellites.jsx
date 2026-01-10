import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Sprout, CloudRain, Thermometer, Wind, MessageSquare } from 'lucide-react';
import { AIExplainButton } from '../components/AIExplainButton';
import { useState } from 'react';

export const Satellites = () => {
  const [selectedApplication, setSelectedApplication] = useState('agriculture');

  const applications = {
    agriculture: {
      title: 'Agriculture Monitoring',
      icon: Sprout,
      color: 'from-success to-planet-teal',
      description: 'Satellites help farmers optimize crop yields and manage resources efficiently.',
      problem: 'Farmers need to monitor large areas of land, detect crop health issues early, and optimize water and fertilizer use.',
      solution: 'Satellites capture multispectral images that reveal plant health, soil moisture, and growth patterns invisible to the human eye.',
      impact: '30% increase in crop yields, 40% reduction in water usage, early disease detection',
      beforeAfter: {
        before: 'Traditional farming relies on manual inspection of fields, missing early signs of crop stress or disease.',
        after: 'Satellite data provides real-time health maps, enabling precise interventions and resource optimization.'
      },
      questions: [
        'How do satellites help farmers?',
        'What information can satellites see that humans cannot?',
        'How does this reduce water usage?'
      ]
    },
    disaster: {
      title: 'Disaster Management',
      icon: CloudRain,
      color: 'from-destructive to-warning',
      description: 'Satellites enable early warning systems and rapid response coordination during disasters.',
      problem: 'Natural disasters strike with little warning, and affected areas are often difficult to assess quickly.',
      solution: 'Satellites monitor weather patterns, detect floods/fires in real-time, and provide damage assessment imagery to coordinate relief efforts.',
      impact: 'Hours of early warning, 50% faster response times, accurate damage mapping for aid distribution',
      beforeAfter: {
        before: 'Disaster response teams had limited visibility of affected areas and relied on ground reports that took days.',
        after: 'Real-time satellite imagery shows exact flood extent, damaged infrastructure, and accessible routes within hours.'
      },
      questions: [
        'How are floods detected early from space?',
        'What role do satellites play in earthquake response?',
        'How do weather satellites predict hurricanes?'
      ]
    },
    climate: {
      title: 'Climate Observation',
      icon: Thermometer,
      color: 'from-planet-blue to-primary',
      description: 'Satellites track global climate patterns and environmental changes over decades.',
      problem: 'Climate change affects the entire planet, but ground-based measurements only cover small areas.',
      solution: 'Satellites measure sea levels, ice sheet thickness, ocean temperatures, and atmospheric composition globally and continuously.',
      impact: 'Complete global coverage, 40+ years of consistent data, tracking of greenhouse gases and temperature changes',
      beforeAfter: {
        before: 'Climate data came from scattered weather stations with gaps in coverage, especially over oceans and poles.',
        after: 'Continuous global monitoring reveals ice melt rates, sea level rise, and temperature patterns with unprecedented accuracy.'
      },
      questions: [
        'How do satellites measure Earth\'s temperature?',
        'Can satellites track melting glaciers?',
        'What is the difference between weather and climate satellites?'
      ]
    },
    pollution: {
      title: 'Pollution Tracking',
      icon: Wind,
      color: 'from-muted to-secondary',
      description: 'Satellites monitor air quality, ocean pollution, and environmental hazards globally.',
      problem: 'Air and water pollution cross borders, but tracking sources and spread is challenging from the ground.',
      solution: 'Satellites detect pollutants in the atmosphere and oceans, track oil spills, and monitor illegal deforestation.',
      impact: 'Global air quality maps, oil spill detection within hours, identification of major pollution sources',
      beforeAfter: {
        before: 'Pollution monitoring relied on ground sensors in cities, leaving rural areas and oceans largely unmonitored.',
        after: 'Satellite sensors reveal pollution patterns, sources, and transport across continents and oceans in real-time.'
      },
      questions: [
        'How can satellites see air pollution?',
        'What types of pollutants can satellites detect?',
        'How are oil spills tracked from space?'
      ]
    }
  };

  const currentApp = applications[selectedApplication];
  const Icon = currentApp.icon;

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Satellite <span className="text-gradient-primary">Applications</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how satellites orbiting Earth help solve real-world problems and improve daily life.
          </p>
        </div>

        {/* Application Tabs */}
        <Tabs value={selectedApplication} onValueChange={setSelectedApplication} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-transparent">
            {Object.entries(applications).map(([key, app]) => {
              const TabIcon = app.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-accent border border-primary/20 h-auto py-3 px-4 transition-smooth"
                >
                  <TabIcon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{app.title.split(' ')[0]}</span>
                  <span className="sm:hidden">{app.title.split(' ')[0].slice(0, 4)}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Overview Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 card-glow">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentApp.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-1">{currentApp.title}</CardTitle>
                  <CardDescription className="text-base">{currentApp.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Problem-Solution Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-destructive/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  The Problem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{currentApp.problem}</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-success/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <span className="text-2xl">✨</span>
                  How Satellites Help
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{currentApp.solution}</p>
              </CardContent>
            </Card>
          </div>

          {/* Before/After Comparison */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Before & After Satellite Technology</CardTitle>
              <CardDescription>Visual comparison of problem-solving impact</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before */}
                <div className="space-y-3">
                  <Badge className="bg-muted/50 text-muted-foreground border-muted">Before</Badge>
                  <div className="aspect-video bg-muted/30 rounded-lg border border-muted flex items-center justify-center p-6">
                    <p className="text-sm text-center text-muted-foreground leading-relaxed">
                      {currentApp.beforeAfter.before}
                    </p>
                  </div>
                </div>

                {/* After */}
                <div className="space-y-3">
                  <Badge className="bg-success/20 text-success border-success/30">After</Badge>
                  <div className="aspect-video bg-success/10 rounded-lg border border-success/30 flex items-center justify-center p-6">
                    <p className="text-sm text-center text-foreground leading-relaxed">
                      {currentApp.beforeAfter.after}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Impact Metrics */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Real-World Impact</CardTitle>
              <CardDescription>Measurable benefits of satellite technology</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
                <p className="text-lg font-semibold text-accent leading-relaxed">{currentApp.impact}</p>
              </div>
            </CardContent>
          </Card>

          {/* AI Q&A Section */}
          <Card className="bg-card/80 backdrop-blur-sm border-accent/30 card-glow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-warning flex items-center justify-center glow-gold">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Ask AI About This</CardTitle>
                  <CardDescription>Common questions students ask</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentApp.questions.map((question, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer group">
                  <span className="text-xl">💭</span>
                  <p className="flex-1 text-sm text-muted-foreground group-hover:text-foreground transition-smooth">
                    {question}
                  </p>
                  <AIExplainButton topic={question} size="sm" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};