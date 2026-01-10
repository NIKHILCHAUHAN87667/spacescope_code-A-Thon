import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

export const AIExplainButton = ({ topic, size = 'sm' }) => {
  const handleExplain = () => {
    alert(`AI Explanation for: ${topic}\n\nThis is a mock explanation. In the full version, this would generate an AI-powered explanation in simple, student-friendly language.`);
  };

  return (
    <Button
      onClick={handleExplain}
      size={size}
      className="bg-primary/20 text-accent hover:bg-primary/30 border border-accent/30 glow-gold transition-smooth"
    >
      <Sparkles className="w-4 h-4 mr-2" />
      Explain This
    </Button>
  );
};