import { Button } from "@/components/ui/button";
import { 
  Pen, 
  Palette, 
  Leaf, 
  Laptop, 
  Lightbulb, 
  TrendingUp, 
  Heart, 
  Briefcase, 
  Globe, 
  Camera,
  Plus
} from "lucide-react";

const topics = [
  { name: "Writing", icon: Pen, count: "2,847", color: "text-primary" },
  { name: "Design", icon: Palette, count: "1,923", color: "text-chart-2" },
  { name: "Lifestyle", icon: Leaf, count: "3,156", color: "text-chart-4" },
  { name: "Technology", icon: Laptop, count: "4,278", color: "text-chart-1" },
  { name: "Creativity", icon: Lightbulb, count: "2,641", color: "text-chart-5" },
  { name: "Productivity", icon: TrendingUp, count: "1,847", color: "text-chart-3" },
  { name: "Wellness", icon: Heart, count: "2,156", color: "text-red-400" },
  { name: "Business", icon: Briefcase, count: "3,429", color: "text-orange-400" },
  { name: "Travel", icon: Globe, count: "2,983", color: "text-teal-400" },
  { name: "Photography", icon: Camera, count: "1,734", color: "text-violet-400" },
];

export default function TopicsSection() {
  return (
    <section id="topics" className="section-spacing relative overflow-hidden curve-top">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-chart-2/10"></div>
      <div className="absolute inset-0 opacity-10">
        <img 
          src="https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200" 
          alt="Workspace aesthetic" 
          className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-shadow">
            Explore Topics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive deep into subjects that inspire and challenge you
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <Button
                key={topic.name}
                variant="ghost"
                className="glass rounded-2xl p-6 h-auto flex flex-col items-center space-y-3 hover:bg-white/20 transition-all duration-300 hover-lift group"
                data-testid={`topic-${topic.name.toLowerCase()}`}
              >
                <Icon className={`w-8 h-8 ${topic.color} group-hover:scale-110 transition-transform`} />
                <div className="text-center">
                  <h3 className="font-semibold mb-1 text-foreground">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground">{topic.count} stories</p>
                </div>
              </Button>
            );
          })}
          
          <Button
            variant="ghost"
            className="glass rounded-2xl p-6 h-auto flex flex-col items-center space-y-3 hover:bg-white/20 transition-all duration-300 hover-lift group border-2 border-dashed border-border"
            data-testid="button-see-all-topics"
          >
            <Plus className="w-8 h-8 text-muted-foreground group-hover:scale-110 transition-transform" />
            <div className="text-center">
              <h3 className="font-semibold mb-1 text-muted-foreground">See All</h3>
              <p className="text-sm text-muted-foreground/70">50+ topics</p>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
}
