import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, MapPin, Eye, Clock } from 'lucide-react';
import { AIExplainButton } from '../components/AIExplainButton';
import { useState } from 'react';
import { VisibilityMap } from './VisibilityMap';
import { regionsToGeoJSON } from './regionsToGeoJson';


export const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      name: 'Geminid Meteor Shower',
      date: 'December 13-14, 2024',
      time: '11:00 PM - 4:00 AM',
      visibility: 'Visible',
      peakRate: '120 meteors/hour',
      description: 'One of the best meteor showers of the year. The Geminids are known for bright, colorful meteors.',
      viewingTips: 'Best viewed from dark locations away from city lights. Look towards the constellation Gemini.',
      regions: ['North America', 'Europe', 'Asia']
    },
    {
      id: 2,
      name: 'ISS Pass Over',
      date: 'Tonight',
      time: '7:42 PM',
      visibility: 'Visible',
      peakRate: '6 minutes',
      description: 'The International Space Station will be visible as a bright moving star across the sky.',
      viewingTips: 'Look towards the western horizon. The ISS appears as a steady, bright light moving steadily.',
      regions: ['San Francisco Bay Area']
    },
    {
      id: 3,
      name: 'Jupiter-Saturn Conjunction',
      date: 'January 15, 2025',
      time: '8:00 PM - Midnight',
      visibility: 'Visible',
      peakRate: 'All night',
      description: 'Jupiter and Saturn will appear very close together in the night sky, a rare celestial alignment.',
      viewingTips: 'Look towards the southern sky. Use binoculars for a better view of both planets.',
      regions: ['Global']
    },
    {
      id: 4,
      name: 'Quadrantids Meteor Shower',
      date: 'January 3-4, 2025',
      time: '1:00 AM - Dawn',
      visibility: 'Partially Visible',
      peakRate: '80 meteors/hour',
      description: 'The first major meteor shower of the year with a short but intense peak.',
      viewingTips: 'Peak is brief. Best viewing in the pre-dawn hours in the northeastern sky.',
      regions: ['Northern Hemisphere']
    },
    {
      id: 5,
      name: 'Lunar Eclipse',
      date: 'March 14, 2025',
      time: '2:00 AM - 5:00 AM',
      visibility: 'Not Visible',
      peakRate: '3 hours',
      description: 'Total lunar eclipse visible from parts of the Pacific and Americas.',
      viewingTips: 'The Moon will turn a reddish color during totality. No special equipment needed.',
      regions: ['Pacific', 'Americas']
    },
    {
      id: 6,
      name: 'Venus at Greatest Brightness',
      date: 'February 10, 2025',
      time: 'Evening',
      visibility: 'Visible',
      peakRate: 'All evening',
      description: 'Venus reaches its maximum brightness, making it the brightest object in the evening sky after the Moon.',
      viewingTips: 'Look towards the western horizon after sunset. Venus will be unmistakable.',
      regions: ['Global']
    }
  ];

  const getVisibilityBadge = (visibility) => {
    switch (visibility) {
      case 'Visible':
        return <Badge className="bg-success/20 text-success border-success/30">Visible</Badge>;
      case 'Partially Visible':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Partially Visible</Badge>;
      case 'Not Visible':
        return <Badge className="bg-muted/50 text-muted-foreground border-muted">Not Visible</Badge>;
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
            Space <span className="text-gradient-primary">Events Explorer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track upcoming celestial events, meteor showers, and planetary alignments visible from your location.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="bg-card/80 backdrop-blur-sm border-primary/20 card-glow hover:border-primary/40 transition-smooth cursor-pointer group"
              onClick={() => setSelectedEvent(event.id === selectedEvent ? null : event.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2 group-hover:text-accent transition-smooth">{event.name}</CardTitle>
                    <CardDescription className="text-base">{event.description}</CardDescription>
                  </div>
                  <div className="shrink-0 ml-4">
                    {getVisibilityBadge(event.visibility)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{event.peakRate}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">{event.regions[0]}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedEvent === event.id && (
                  <div className="pt-4 border-t border-primary/20 space-y-3 animate-in fade-in duration-300">
                    <div>
                      <h4 className="font-semibold text-accent mb-1">Viewing Tips</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{event.viewingTips}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-accent mb-1">Visible Regions</h4>
                      <div className="flex flex-wrap gap-2">
                        {event.regions.map((region, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {region}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <AIExplainButton topic={event.name} />
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                {selectedEvent !== event.id && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 border-primary/30 hover:bg-primary/10">
                      <Eye className="w-4 h-4 mr-2" />
                      View Map
                    </Button>
                    <AIExplainButton topic={event.name} size="sm" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Visibility Map */}
<div className="mt-12">
  <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
    <CardHeader>
      <CardTitle className="text-2xl">Interactive Visibility Map</CardTitle>
      <CardDescription>
        Click any event above to see where it's visible from around the world
      </CardDescription>
    </CardHeader>

    <CardContent>
      {selectedEvent ? (
        <VisibilityMap
          geojson={regionsToGeoJSON(
            events.find(e => e.id === selectedEvent)?.regions || []
          )}
        />
      ) : (
        <div className="aspect-video bg-muted/30 rounded-lg flex items-center justify-center border border-primary/20">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary animate-pulse-glow">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <p className="text-muted-foreground">
              Select an event to view its visibility map
            </p>
            <p className="text-sm text-muted-foreground">
              Highlighted regions show where the event is visible
            </p>
          </div>
        </div>
      )}
    </CardContent>
  </Card>
</div>

      </div>
    </div>
  );
};