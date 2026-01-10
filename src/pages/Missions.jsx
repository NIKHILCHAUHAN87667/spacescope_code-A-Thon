import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Rocket, Clock, MapPin, ExternalLink } from 'lucide-react';
import { AIExplainButton } from '../components/AIExplainButton';
import { useState } from 'react';

export const Missions = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const missions = [
    {
      id: 1,
      name: 'Apollo 11',
      agency: 'NASA',
      year: 1969,
      status: 'past',
      category: 'crewed',
      purpose: 'First human moon landing',
      importance: 'Historic achievement that proved humans could travel to and land on another celestial body.',
      icon: '🌙'
    },
    {
      id: 2,
      name: 'Voyager 1 & 2',
      agency: 'NASA',
      year: 1977,
      status: 'ongoing',
      category: 'probe',
      purpose: 'Interstellar exploration',
      importance: 'First human-made objects to reach interstellar space, still sending data after 45+ years.',
      icon: '🛰️'
    },
    {
      id: 3,
      name: 'Hubble Space Telescope',
      agency: 'NASA/ESA',
      year: 1990,
      status: 'ongoing',
      category: 'observatory',
      purpose: 'Deep space observation',
      importance: 'Revolutionized our understanding of the universe with unprecedented images and discoveries.',
      icon: '🔭'
    },
    {
      id: 4,
      name: 'International Space Station',
      agency: 'NASA/Roscosmos/ESA/JAXA',
      year: 1998,
      status: 'ongoing',
      category: 'station',
      purpose: 'Orbital research laboratory',
      importance: 'Longest-running crewed space mission, advancing science and international cooperation.',
      icon: '🛸'
    },
    {
      id: 5,
      name: 'Mars Curiosity Rover',
      agency: 'NASA',
      year: 2012,
      status: 'ongoing',
      category: 'rover',
      purpose: 'Mars surface exploration',
      importance: 'Discovered evidence that Mars once had conditions suitable for microbial life.',
      icon: '🔴'
    },
    {
      id: 6,
      name: 'James Webb Space Telescope',
      agency: 'NASA/ESA/CSA',
      year: 2021,
      status: 'ongoing',
      category: 'observatory',
      purpose: 'Infrared astronomy',
      importance: 'Most powerful space telescope ever built, observing the earliest galaxies and exoplanet atmospheres.',
      icon: '✨'
    },
    {
      id: 7,
      name: 'Artemis II',
      agency: 'NASA',
      year: 2025,
      status: 'upcoming',
      category: 'crewed',
      purpose: 'Crewed lunar flyby',
      importance: 'First crewed mission beyond Earth orbit since Apollo 17, paving the way for lunar base.',
      icon: '🚀'
    },
    {
      id: 8,
      name: 'Europa Clipper',
      agency: 'NASA',
      year: 2024,
      status: 'upcoming',
      category: 'probe',
      purpose: 'Jupiter\'s moon Europa study',
      importance: 'Will investigate Europa\'s subsurface ocean for potential signs of habitability.',
      icon: '🪐'
    },
    {
      id: 9,
      name: 'Perseverance Rover',
      agency: 'NASA',
      year: 2021,
      status: 'ongoing',
      category: 'rover',
      purpose: 'Mars sample collection',
      importance: 'Collecting samples for future return to Earth and testing technologies for human missions.',
      icon: '🔬'
    },
    {
      id: 10,
      name: 'SpaceX Starship',
      agency: 'SpaceX',
      year: 2025,
      status: 'upcoming',
      category: 'launch',
      purpose: 'Reusable super-heavy launch',
      importance: 'Fully reusable spacecraft designed for Moon, Mars, and beyond - revolutionary cost reduction.',
      icon: '🚀'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Missions' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' }
  ];

  const filteredMissions = selectedCategory === 'all' 
    ? missions 
    : missions.filter(m => m.status === selectedCategory);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return <Badge className="bg-success/20 text-success border-success/30">Active</Badge>;
      case 'upcoming':
        return <Badge className="bg-primary/20 text-primary border-primary/30">Upcoming</Badge>;
      case 'past':
        return <Badge className="bg-muted/50 text-muted-foreground border-muted">Historic</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Space <span className="text-gradient-primary">Missions Timeline</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore humanity's greatest space achievements and upcoming missions to the cosmos.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <Button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              variant={selectedCategory === category.value ? 'default' : 'outline'}
              className={`transition-smooth ${
                selectedCategory === category.value
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : 'border-primary/30 hover:bg-primary/10'
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          {/* Mission Cards */}
          <div className="space-y-8">
            {filteredMissions.map((mission, index) => (
              <div key={mission.id} className="relative">
                {/* Timeline Dot */}
                <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background glow-gold hidden md:block" />

                {/* Card */}
                <Card className="md:ml-20 bg-card/80 backdrop-blur-sm border-primary/20 card-glow hover:border-primary/40 transition-smooth group">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1">
                        {/* Mission Icon */}
                        <div className="text-4xl shrink-0">{mission.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <CardTitle className="text-2xl group-hover:text-accent transition-smooth">
                              {mission.name}
                            </CardTitle>
                            {getStatusBadge(mission.status)}
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Rocket className="w-4 h-4 text-accent" />
                              {mission.agency}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-accent" />
                              {mission.year}
                            </div>
                          </div>
                          <CardDescription className="text-base">{mission.purpose}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Importance */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-2">Why is this mission important?</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{mission.importance}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <AIExplainButton topic={mission.name} />
                      <Button variant="outline" size="sm" className="border-primary/30 hover:bg-primary/10">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};