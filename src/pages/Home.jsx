import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, Cloud, Rocket, MapPin, ArrowRight, Star, Satellite } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Location Badge */}
          <Badge className="mb-6 bg-muted/50 text-foreground border border-primary/30 px-4 py-2">
            <MapPin className="w-4 h-4 mr-2" />
            Viewing from: Mumbai,India
          </Badge>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Explore Space.
            <br />
            <span className="text-gradient-primary">Understand the Universe.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Your gateway to real-time space events, missions, and satellite data—explained in simple, 
            student-friendly language powered by AI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/events">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow-primary transition-smooth text-lg px-8">
                <Calendar className="w-5 h-5 mr-2" />
                Explore Events
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10 text-lg px-8 transition-smooth">
                <Star className="w-5 h-5 mr-2" />
                Start Learning
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Overview Cards */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Next Sky Event */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 card-glow hover:border-primary/40 transition-smooth group cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 glow-primary group-hover:scale-110 transition-spring">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Next Sky Event Near You</CardTitle>
              <CardDescription className="text-base">Don't miss what's happening above</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-accent">Geminid Meteor Shower</h3>
                    <p className="text-sm text-muted-foreground">Peak visibility tonight</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30">Visible</Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Up to 120 meteors per hour expected. Best viewing after midnight in dark sky locations.
                </p>
                <Link to="/events">
                  <Button variant="ghost" className="w-full justify-between text-accent hover:text-accent hover:bg-accent/10 mt-2">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Current Space Weather */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 card-glow hover:border-primary/40 transition-smooth group cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-planet-blue to-planet-teal flex items-center justify-center mb-4 shadow-[0_0_30px_hsl(200_80%_55%/0.4)] group-hover:scale-110 transition-spring">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Current Space Weather</CardTitle>
              <CardDescription className="text-base">Real-time solar activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Solar Activity</span>
                  <Badge className="bg-warning/20 text-warning border-warning/30">Moderate</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Aurora Probability</span>
                  <span className="text-sm font-semibold text-success">High (67%)</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Auroras may be visible at mid-latitudes. Check the detailed forecast for your location.
                </p>
                <Link to="/weather">
                  <Button variant="ghost" className="w-full justify-between text-accent hover:text-accent hover:bg-accent/10 mt-2">
                    Full Forecast
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Active Space Missions */}
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 card-glow hover:border-primary/40 transition-smooth group cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-planet-red to-accent flex items-center justify-center mb-4 shadow-[0_0_30px_hsl(0_70%_55%/0.4)] group-hover:scale-110 transition-spring">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-2xl">Active Space Missions</CardTitle>
              <CardDescription className="text-base">What's happening in space right now</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-accent">James Webb Space Telescope</h3>
                    <p className="text-sm text-muted-foreground">Observing distant galaxies</p>
                  </div>
                  <Badge className="bg-success/20 text-success border-success/30 shrink-0">Active</Badge>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-accent">Artemis II</h3>
                    <p className="text-sm text-muted-foreground">Crewed lunar mission prep</p>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30 shrink-0">Upcoming</Badge>
                </div>
                <Link to="/missions">
                  <Button variant="ghost" className="w-full justify-between text-accent hover:text-accent hover:bg-accent/10 mt-2">
                    View All Missions
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Explore Space</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From celestial events to satellite applications, learn about space in a simple, engaging way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Sky Events Calendar',
                description: 'Track meteor showers, eclipses, and planetary alignments with interactive visibility maps.',
                icon: Calendar,
                color: 'from-primary to-secondary'
              },
              {
                title: 'Space Weather Updates',
                description: 'Monitor solar activity, aurora forecasts, and how space weather affects Earth.',
                icon: Cloud,
                color: 'from-planet-blue to-planet-teal'
              },
              {
                title: 'Mission Timeline',
                description: 'Explore past, present, and future space missions with AI-powered explanations.',
                icon: Rocket,
                color: 'from-planet-red to-accent'
              },
              {
                title: 'Interactive Learning',
                description: 'Master space concepts through AI-generated quizzes and beginner-friendly lessons.',
                icon: Star,
                color: 'from-accent to-warning'
              },
              {
                title: 'Satellite Applications',
                description: 'Discover how satellites help with agriculture, disaster management, and climate monitoring.',
                icon: Satellite,
                color: 'from-success to-planet-teal'
              },
              {
                title: 'AI Assistant',
                description: 'Ask any space question and get instant, easy-to-understand answers powered by AI.',
                icon: Sparkles,
                color: 'from-primary to-accent'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-smooth group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-spring`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

const Sparkles = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);