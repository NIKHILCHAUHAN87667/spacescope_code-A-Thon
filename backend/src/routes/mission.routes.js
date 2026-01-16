import express from 'express';
import Mission from '../models/Mission.js';

const router = express.Router();

/**
 * GET all missions
 */
router.get('/', async (req, res) => {
  try {
    const missions = await Mission.find({});
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * GET mission by missionId
 */
router.get('/:missionId', async (req, res) => {
  try {
    const mission = await Mission.findOne({
      missionId: req.params.missionId
    });

    if (!mission) {
      return res.status(404).json({ message: 'Mission not found' });
    }

    res.json(mission);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
