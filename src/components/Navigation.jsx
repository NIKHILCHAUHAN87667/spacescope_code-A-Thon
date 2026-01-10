import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Rocket, Calendar, Cloud, Clock, BookOpen, Satellite, MessageCircle } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Rocket },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/weather', label: 'Space Weather', icon: Cloud },
    { path: '/missions', label: 'Missions', icon: Clock },
    { path: '/learn', label: 'Learn', icon: BookOpen },
    { path: '/satellites', label: 'Satellites', icon: Satellite },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary transition-smooth group-hover:scale-110">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient-primary hidden sm:block">SpaceScope</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`transition-smooth ${
                      isActive
                        ? 'bg-primary/20 text-accent hover:bg-primary/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* AI Assistant Button */}
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 glow-gold transition-smooth">
            <MessageCircle className="w-4 h-4 mr-2" />
            Ask AI
          </Button>
        </div>
      </div>
    </nav>
  );
};