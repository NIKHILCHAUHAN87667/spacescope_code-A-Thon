import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const MissionDetail = () => {
  const { missionId } = useParams();
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/missions/${missionId}`
        );
        const data = await res.json();
        setMission(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMission();
  }, [missionId]);

  if (loading) {
    return <p className="pt-24 text-center">Loading mission...</p>;
  }

  if (!mission) {
    return <p className="pt-24 text-center">Mission not found</p>;
  }

  return (
    <div className="pt-24 px-4 max-w-5xl mx-auto">
      {/* Back Button */}
      <Link to="/missions">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Missions
        </Button>
      </Link>

      {/* Mission Title */}
      <h1 className="text-4xl font-bold mb-4">{mission.name}</h1>

      {/* Importance */}
      <p className="text-muted-foreground mb-6">
        {mission.importance || 'No importance information available.'}
      </p>

      {/* Overview + Timeline */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Overview */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Overview</h3>
          <p><strong>Agency:</strong> {mission.agency}</p>
          <p><strong>Year:</strong> {mission.year}</p>
          <p><strong>Spacecraft:</strong> {mission.overview?.spacecraft}</p>
          <p><strong>Destination:</strong> {mission.overview?.destination}</p>
          <p><strong>Duration:</strong> {mission.overview?.duration}</p>
          <p><strong>Crew:</strong> {mission.overview?.crew}</p>
        </div>

        {/* Timeline */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Timeline</h3>
          <ul className="list-disc ml-4">
            {mission.timeline?.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-8 opacity-30" />

      {/* Full Wikipedia Content */}
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="font-semibold mb-3">Mission Details</h3>

        <div className="max-h-[500px] overflow-y-auto pr-2">
          <p className="whitespace-pre-line text-sm leading-relaxed">
            {mission.wikiContent || 'No additional mission details available.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
