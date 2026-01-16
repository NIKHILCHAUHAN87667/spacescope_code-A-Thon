import mongoose from 'mongoose';

const missionSchema = new mongoose.Schema({
  missionId: { type: String, required: true, unique: true },
  name: String,
  agency: String,
  year: Number,
  status: String,
  category: String,
  purpose: String,
  icon: String,
  overview: {
    spacecraft: String,
    rocket: String,
    crew: Number,
    duration: String,
    destination: String
  },
  importance: [String],
  timeline: [String],
  technology: [String],
  risks: [String]
});

// Make sure the model is not redefined (important if hot-reloading)
const Mission = mongoose.models.Mission || mongoose.model('Mission', missionSchema);

export default Mission;
