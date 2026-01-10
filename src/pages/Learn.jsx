import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { BookOpen, Brain, Trophy, ChevronRight } from 'lucide-react';
import { AIExplainButton } from '../components/AIExplainButton';
import { useState } from 'react';

export const Learn = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);

  const topics = [
    {
      id: 1,
      title: 'Satellites & Orbits',
      icon: '🛰️',
      description: 'Learn how satellites stay in space and what different orbits are used for.',
      lessons: 5,
      duration: '15 min',
      difficulty: 'Beginner',
      content: 'Satellites are objects that orbit around planets. Earth has thousands of artificial satellites that help us with GPS, weather forecasting, and communications. Different orbits serve different purposes - low Earth orbit for observations, geostationary for TV broadcasts, and polar orbits for global coverage.',
      quiz: [
        {
          question: 'What keeps satellites in orbit around Earth?',
          options: ['Rocket engines', 'Gravity and velocity', 'Magnets', 'Air pressure'],
          correct: 1,
          explanation: 'Satellites stay in orbit due to a perfect balance between gravity pulling them down and their forward velocity keeping them from falling.'
        },
        {
          question: 'Which orbit is used for GPS satellites?',
          options: ['Low Earth Orbit', 'Medium Earth Orbit', 'Geostationary Orbit', 'Polar Orbit'],
          correct: 1,
          explanation: 'GPS satellites use Medium Earth Orbit (MEO) at about 20,000 km altitude for optimal coverage and timing accuracy.'
        },
        {
          question: 'How long does it take for a geostationary satellite to orbit Earth?',
          options: ['1 hour', '12 hours', '24 hours', '48 hours'],
          correct: 2,
          explanation: 'Geostationary satellites orbit in exactly 24 hours, matching Earth\'s rotation, so they appear fixed above the same spot.'
        }
      ]
    },
    {
      id: 2,
      title: 'Space Stations',
      icon: '🛸',
      description: 'Discover how astronauts live and work in the International Space Station.',
      lessons: 4,
      duration: '12 min',
      difficulty: 'Beginner',
      content: 'The International Space Station (ISS) is a massive research laboratory orbiting 400 km above Earth. Astronauts live there for months conducting experiments in microgravity. The station travels at 28,000 km/h and orbits Earth 16 times per day!',
      quiz: [
        {
          question: 'How fast does the ISS travel?',
          options: ['5,000 km/h', '10,000 km/h', '28,000 km/h', '50,000 km/h'],
          correct: 2,
          explanation: 'The ISS travels at approximately 28,000 km/h (17,500 mph) to maintain its orbit around Earth.'
        },
        {
          question: 'How many times does the ISS orbit Earth each day?',
          options: ['4 times', '8 times', '16 times', '32 times'],
          correct: 2,
          explanation: 'The ISS completes one orbit every 90 minutes, resulting in about 16 orbits per 24-hour day.'
        }
      ]
    },
    {
      id: 3,
      title: 'Space Weather',
      icon: '☀️',
      description: 'Understand solar storms, auroras, and how the Sun affects Earth.',
      lessons: 6,
      duration: '18 min',
      difficulty: 'Intermediate',
      content: 'Space weather refers to conditions in space caused by the Sun. Solar flares and coronal mass ejections can send particles toward Earth, affecting satellites, communications, and creating beautiful auroras. Understanding space weather helps us protect our technology.',
      quiz: [
        {
          question: 'What causes auroras (Northern/Southern Lights)?',
          options: ['Moon reflection', 'Solar particles hitting atmosphere', 'Airplane lights', 'Lightning'],
          correct: 1,
          explanation: 'Auroras occur when charged particles from the Sun collide with gases in Earth\'s atmosphere, creating colorful light displays.'
        },
        {
          question: 'What is a solar flare?',
          options: ['A planet near the Sun', 'A sudden burst of energy from the Sun', 'A type of comet', 'A moon crater'],
          correct: 1,
          explanation: 'Solar flares are sudden explosions of energy on the Sun\'s surface that release radiation and particles into space.'
        }
      ]
    },
    {
      id: 4,
      title: 'Exoplanets',
      icon: '🪐',
      description: 'Explore planets outside our solar system and how we find them.',
      lessons: 5,
      duration: '20 min',
      difficulty: 'Intermediate',
      content: 'Exoplanets are planets that orbit stars other than our Sun. Scientists have discovered over 5,000 exoplanets! We find them by detecting tiny wobbles in stars or small dips in starlight when a planet passes in front of its star.',
      quiz: [
        {
          question: 'What is an exoplanet?',
          options: ['A planet in our solar system', 'A planet outside our solar system', 'A moon', 'An asteroid'],
          correct: 1,
          explanation: 'Exoplanets are planets that orbit stars other than our Sun, located outside our solar system.'
        }
      ]
    },
    {
      id: 5,
      title: 'Rocket Science',
      icon: '🚀',
      description: 'Learn the basics of how rockets work and escape Earth\'s gravity.',
      lessons: 7,
      duration: '22 min',
      difficulty: 'Advanced',
      content: 'Rockets work by Newton\'s third law: for every action, there\'s an equal and opposite reaction. Burning fuel creates hot gas that shoots out the bottom, pushing the rocket upward. To reach orbit, rockets must achieve speeds of about 28,000 km/h!',
      quiz: [
        {
          question: 'Which law of physics explains how rockets work?',
          options: ['First Law', 'Second Law', 'Third Law', 'Law of Gravity'],
          correct: 2,
          explanation: 'Newton\'s Third Law states that for every action, there is an equal and opposite reaction - the basis of rocket propulsion.'
        }
      ]
    },
    {
      id: 6,
      title: 'Black Holes',
      icon: '⚫',
      description: 'Understand these mysterious cosmic objects and their extreme gravity.',
      lessons: 6,
      duration: '25 min',
      difficulty: 'Advanced',
      content: 'Black holes are regions of space where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse. The edge of a black hole is called the event horizon - once you cross it, you can never return!',
      quiz: [
        {
          question: 'What is the event horizon of a black hole?',
          options: ['The center of the black hole', 'The point of no return', 'The brightest part', 'The edge of the universe'],
          correct: 1,
          explanation: 'The event horizon is the boundary around a black hole beyond which nothing can escape its gravitational pull.'
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-success/20 text-success border-success/30';
      case 'Intermediate': return 'bg-warning/20 text-warning border-warning/30';
      case 'Advanced': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted';
    }
  };

  const handleStartQuiz = (topic) => {
    setSelectedTopic(topic);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswer = (answerIndex) => {
    const isCorrect = answerIndex === selectedTopic.quiz[currentQuestion].correct;
    const newAnswers = [...answers, { questionIndex: currentQuestion, selectedAnswer: answerIndex, isCorrect }];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    // Show explanation
    setTimeout(() => {
      if (currentQuestion < selectedTopic.quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz complete
        setTimeout(() => {
          alert(`Quiz Complete!\n\nYou scored ${score + (isCorrect ? 1 : 0)} out of ${selectedTopic.quiz.length}!\n\nGreat job learning about ${selectedTopic.title}!`);
          setQuizStarted(false);
          setSelectedTopic(null);
        }, 2000);
      }
    }, 1500);
  };

  if (quizStarted && selectedTopic) {
    const currentQ = selectedTopic.quiz[currentQuestion];
    const hasAnswered = answers.some(a => a.questionIndex === currentQuestion);
    const userAnswer = answers.find(a => a.questionIndex === currentQuestion);

    return (
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20 card-glow">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  Question {currentQuestion + 1} of {selectedTopic.quiz.length}
                </Badge>
                <div className="text-sm text-muted-foreground">
                  Score: {score}/{selectedTopic.quiz.length}
                </div>
              </div>
              <CardTitle className="text-2xl">{currentQ.question}</CardTitle>
              <Progress value={((currentQuestion + 1) / selectedTopic.quiz.length) * 100} className="mt-4" />
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQ.options.map((option, index) => {
                let buttonClass = 'bg-muted/30 hover:bg-muted/50 text-foreground border-muted';
                
                if (hasAnswered) {
                  if (index === currentQ.correct) {
                    buttonClass = 'bg-success/20 border-success text-success';
                  } else if (index === userAnswer?.selectedAnswer) {
                    buttonClass = 'bg-destructive/20 border-destructive text-destructive';
                  }
                }

                return (
                  <Button
                    key={index}
                    onClick={() => !hasAnswered && handleAnswer(index)}
                    disabled={hasAnswered}
                    className={`w-full h-auto py-4 px-6 text-left justify-start text-base ${buttonClass} transition-smooth`}
                    variant="outline"
                  >
                    <span className="font-semibold mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                );
              })}

              {hasAnswered && (
                <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-lg animate-in fade-in duration-300">
                  <h4 className="font-semibold text-accent mb-2">Explanation:</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{currentQ.explanation}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Learning <span className="text-gradient-primary">Zone</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master space concepts through interactive lessons and AI-powered quizzes designed for beginners.
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="bg-card/80 backdrop-blur-sm border-primary/20 card-glow hover:border-primary/40 transition-smooth group"
            >
              <CardHeader>
                <div className="text-5xl mb-3">{topic.icon}</div>
                <CardTitle className="text-2xl mb-2 group-hover:text-accent transition-smooth">{topic.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">{topic.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Meta Info */}
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(topic.difficulty)}>
                    {topic.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-foreground">
                    {topic.lessons} lessons
                  </Badge>
                  <Badge variant="outline" className="text-foreground">
                    {topic.duration}
                  </Badge>
                </div>

                {/* Content Preview */}
                {selectedTopic?.id === topic.id && !quizStarted && (
                  <div className="pt-4 border-t border-primary/20 space-y-4 animate-in fade-in duration-300">
                    <p className="text-sm text-muted-foreground leading-relaxed">{topic.content}</p>
                    <AIExplainButton topic={topic.title} />
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {selectedTopic?.id === topic.id && !quizStarted ? (
                    <Button
                      onClick={() => handleStartQuiz(topic)}
                      className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 glow-gold"
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      Start Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setSelectedTopic(selectedTopic?.id === topic.id ? null : topic)}
                      variant="outline"
                      className="flex-1 border-primary/30 hover:bg-primary/10"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      {selectedTopic?.id === topic.id ? 'Close' : 'Read Lesson'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Section */}
        <div className="mt-12">
          <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-warning flex items-center justify-center glow-gold">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Your Learning Progress</CardTitle>
                  <CardDescription>Track your space knowledge journey</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Topics Explored</span>
                    <span className="font-semibold text-accent">0 / {topics.length}</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Complete quizzes to track your progress and earn achievements! (Mock functionality - progress is not saved)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};