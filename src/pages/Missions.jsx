import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Rocket, Clock, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openExplainId, setOpenExplainId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Fetch missions from backend */
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/missions');
        const data = await res.json();
        setMissions(data);
      } catch (err) {
        setError('Failed to load missions');
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  const categories = [
    { value: 'all', label: 'All Missions' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' }
  ];

  const filteredMissions =
    selectedCategory === 'all'
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

  if (loading) {
    return <p className="pt-24 text-center text-muted-foreground">Loading missions...</p>;
  }

  if (error) {
    return <p className="pt-24 text-center text-red-500">{error}</p>;
  }

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
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          <div className="space-y-8">
            {filteredMissions.map((mission) => (
              <div key={mission.missionId} className="relative">
                <div className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background glow-gold hidden md:block" />

                <Card className="md:ml-20 bg-card/80 backdrop-blur-sm border-primary/20 card-glow hover:border-primary/40 transition-smooth group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
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

                        <CardDescription className="text-base">
                          {mission.purpose}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Importance */}
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold text-accent mb-2">
                        Why is this mission important?
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {mission.importance}
                      </p>
                    </div>

                    {/* Explain Content (from DB) */}
                    {openExplainId === mission.missionId && (
                      <div className="bg-muted/40 border border-primary/20 rounded-lg p-4 text-sm leading-relaxed">
                        <h4 className="font-semibold text-accent mb-2">
                          Mission Summary
                        </h4>
                        <p className="whitespace-pre-line">
                          {mission.explainContent || 'No summary available.'}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 hover:bg-primary/10"
                        onClick={() =>
                          setOpenExplainId(
                            openExplainId === mission.missionId
                              ? null
                              : mission.missionId
                          )
                        }
                      >
                        Explain This
                      </Button>

                      <Link to={`/missions/${mission.missionId}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-primary/30 hover:bg-primary/10"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </Link>
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
