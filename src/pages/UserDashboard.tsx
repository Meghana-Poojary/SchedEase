import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/EventCard";
import { Calendar, LogOut, Bell, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import techFest from "@/assets/event-tech-fest.jpg";
import culturalFest from "@/assets/event-cultural-fest.jpg";
import sportsDay from "@/assets/event-sports-day.jpg";

const UserDashboard = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      title: "Startup Summit 2025",
      description: "Meet entrepreneurs, pitch your ideas, and network with investors from across the country.",
      date: "February 25, 2025",
      venue: "Innovation Hub",
      image: techFest,
    },
    {
      title: "Spring Fest",
      description: "Annual spring celebration with music concerts, dance performances, and food festival.",
      date: "March 10, 2025",
      venue: "Main Campus",
      image: culturalFest,
    },
  ];

  const pastEvents = [
    {
      title: "Tech Innovation Fest 2024",
      description: "Annual technology showcase featuring student projects and coding competitions.",
      date: "December 15, 2024",
      venue: "Main Auditorium",
      image: techFest,
    },
    {
      title: "Cultural Extravaganza",
      description: "A vibrant celebration of diverse cultures with dance, music, and drama performances.",
      date: "November 20, 2024",
      venue: "Campus Grounds",
      image: culturalFest,
    },
    {
      title: "Annual Sports Day",
      description: "Inter-department sports competition featuring cricket, basketball, and athletics.",
      date: "October 10, 2024",
      venue: "Sports Complex",
      image: sportsDay,
    },
  ];

  const notifications = [
    { id: 1, message: "Registration opened for Startup Summit 2025", time: "2 hours ago" },
    { id: 2, message: "Spring Fest schedule announced", time: "1 day ago" },
    { id: 3, message: "New workshop: AI & Machine Learning", time: "2 days ago" },
  ];

  const handleRegister = (eventTitle: string) => {
    toast.success(`Successfully registered for ${eventTitle}!`);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-hero">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Welcome, Student!</h1>
              <p className="text-xs text-muted-foreground">Discover and register for events</p>
            </div>
          </div>
          
          <Button onClick={handleLogout} variant="outline" className="rounded-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">Upcoming Events</h2>
                  <p className="text-muted-foreground">Register now for exciting college events</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="relative">
                    <EventCard {...event} />
                    <div className="mt-4">
                      <Button 
                        onClick={() => handleRegister(event.title)}
                        className="w-full rounded-full gradient-hero"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Register Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Past Events */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold">Past Events</h2>
                <p className="text-muted-foreground">Events you might have missed</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event, index) => (
                  <EventCard key={index} {...event} />
                ))}
              </div>
            </section>
          </div>

          {/* Notifications Panel */}
          <div>
            <Card className="rounded-2xl shadow-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notifications
                </CardTitle>
                <CardDescription>Stay updated with the latest events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-4 rounded-xl bg-muted/50 space-y-2">
                    <p className="text-sm font-medium">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
