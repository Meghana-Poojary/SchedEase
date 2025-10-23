import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import heroImage from "@/assets/hero-students.jpg";
import techFest from "@/assets/event-tech-fest.jpg";
import culturalFest from "@/assets/event-cultural-fest.jpg";
import sportsDay from "@/assets/event-sports-day.jpg";
import { Users, Calendar as CalendarIcon, TrendingUp } from "lucide-react";

const Landing = () => {
  const pastEvents = [
    {
      title: "Tech Innovation Fest 2024",
      description: "Annual technology showcase featuring student projects, coding competitions, and tech talks from industry leaders.",
      date: "December 15, 2024",
      venue: "Main Auditorium",
      image: techFest,
    },
    {
      title: "Cultural Extravaganza",
      description: "A vibrant celebration of diverse cultures with dance, music, drama performances, and international food stalls.",
      date: "November 20, 2024",
      venue: "Campus Grounds",
      image: culturalFest,
    },
    {
      title: "Annual Sports Day",
      description: "Inter-department sports competition featuring cricket, basketball, athletics, and various indoor games.",
      date: "October 10, 2024",
      venue: "Sports Complex",
      image: sportsDay,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Easily Manage and <span className="text-primary">Schedule</span> College Events
              </h1>
              <p className="text-xl text-muted-foreground">
                For students and admins — one place to plan, register, and track college activities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/signup?role=admin">
                  <Button size="lg" className="rounded-full gradient-hero text-lg px-8">
                    Sign Up as Admin
                  </Button>
                </Link>
                <Link to="/signup?role=student">
                  <Button size="lg" variant="outline" className="rounded-full text-lg px-8 border-2 hover:bg-primary hover:text-white">
                    Sign Up as Student
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="h-12 w-12 rounded-xl gradient-hero flex items-center justify-center">
                      <CalendarIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-primary">150+</p>
                  <p className="text-sm text-muted-foreground">Events Hosted</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="h-12 w-12 rounded-xl gradient-accent flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-secondary">5000+</p>
                  <p className="text-sm text-muted-foreground">Active Students</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Satisfaction</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full gradient-hero opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 rounded-full gradient-accent opacity-20 blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Students celebrating events" 
                className="relative rounded-3xl shadow-hover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Past Events Highlights</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our successful events that brought the campus community together
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
