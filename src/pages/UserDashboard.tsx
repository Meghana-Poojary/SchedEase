import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, LogOut, Bell, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import EventCard from "@/components/EventCard";

// ✅ REPLACE with your actual AWS API Gateway endpoint
const GET_EVENTS_API = "https://qswarcb3e3.execute-api.us-east-1.amazonaws.com/dev/getEvents";
const REGISTER_API = "https://qswarcb3e3.execute-api.us-east-1.amazonaws.com/dev/registerForEvent";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);

  // ✅ Fetch events created by admin from AWS
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(GET_EVENTS_API);
        const data = await response.json();

        console.log("Fetched events:", data);
        // Robust date parsing: handle strings, ISO, timestamps (seconds or ms), and common separators
        const parseEventDate = (val) => {
          if (!val && val !== 0) return null;
          try {
            // Numbers: could be seconds or milliseconds
            if (typeof val === "number") {
              const s = val.toString();
              return new Date(s.length === 10 ? val * 1000 : val);
            }

            if (typeof val === "string") {
              // Try direct parse first
              let d = new Date(val);
              if (!Number.isNaN(d.getTime())) return d;

              // Replace common separators and try again (e.g., DD-MM-YYYY -> MM/DD/YYYY)
              const replaced = val.replace(/-/g, "/");
              d = new Date(replaced);
              if (!Number.isNaN(d.getTime())) return d;

              // Try rearranging if format looks like DD/MM/YYYY
              const parts = val.split(/[-/]/).map((p) => p.trim());
              if (parts.length === 3) {
                // If first part is day and length 2 and third is year, swap to MM/DD/YYYY
                if (parts[0].length === 2 && parts[2].length === 4) {
                  const rearr = `${parts[1]}/${parts[0]}/${parts[2]}`;
                  d = new Date(rearr);
                  if (!Number.isNaN(d.getTime())) return d;
                }
              }
            }
          } catch (err) {
            // fall through to return null
          }
          return null;
        };

        // normalize start of today (00:00) to include events happening today as upcoming
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        // attach parsedDate to each event (support different API field names)
        const enriched = data.map((evt) => {
          // API may return the date under several keys: eventDate, date, or createdAt.
          // If time is provided separately, combine it with the date for better parsing.
          const dateField = evt.eventDate ?? evt.date ?? evt.createdAt ?? null;
          const rawDate = evt.date && evt.time ? `${evt.date} ${evt.time}` : dateField;
          return {
            ...evt,
            parsedDate: parseEventDate(rawDate),
            _rawDate: rawDate,
          };
        });

        // Filter and sort events. Events with invalid dates are ignored for now.
        const upcoming = enriched
          .filter((event) => event.parsedDate && event.parsedDate >= startOfToday)
          .sort((a, b) => a.parsedDate - b.parsedDate);

        const past = enriched
          .filter((event) => event.parsedDate && event.parsedDate < startOfToday)
          .sort((a, b) => b.parsedDate - a.parsedDate);

        setUpcomingEvents(upcoming);
        setPastEvents(past);

        // Optional: Show as notifications
        const notif = enriched.map((e, i) => ({
          id: i + 1,
          message: `New event created: ${e.eventName}`,
          time: "Just now",
        }));
        setNotifications(notif);
      } catch (err) {
        console.error("Error fetching events:", err);
        toast.error("Failed to load events from AWS");
      }
    };

    fetchEvents();

  }, []);

  // ✅ Register button functionality
  const handleRegister = async (eventId, eventTitle) => {
    const studentId = localStorage.getItem("studentId");
    if (!studentId) {
      toast.error("Please log in first!");
      return;
    }
  
    const payload = {
      studentId: studentId,
      eventId,
      timestamp: new Date().toISOString(),
    };
  
    try {
      const response = await fetch(REGISTER_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
  const data = await response.json();
  toast.success(data.message || `Successfully registered for ${eventTitle}!`);
  
      // Find the event and move to registeredEvents
      const registeredEvent = upcomingEvents.find((e) => e.eventId === eventId);
      if (registeredEvent) {
        setRegisteredEvents((prev) => [...prev, registeredEvent]);
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("Registration failed");
    }
  };
  

  // ✅ Logout
  const handleLogout = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("studentEmail");
    navigate("/");
  };

  // ✅ Image helper
  const resolveImage = (event) => {
    if (event.imageUrl && event.imageUrl.startsWith("http")) return event.imageUrl;
    if (event.posterKey)
      return `https://college-event-posters-vidisha.s3.us-east-1.amazonaws.com/${event.posterKey}`;
    if (event.image && event.image.startsWith("http")) return event.image;
    return null;
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
              <p className="text-xs text-muted-foreground">
                Discover and register for events
              </p>
            </div>
          </div>

          <Button onClick={handleLogout} variant="outline" className="rounded-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Body */}
      <div className="container mx-auto py-8 px-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Events */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold">Upcoming Events</h2>
                  <p className="text-muted-foreground">
                    Register now for exciting college events
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event, index) => (
                    <div key={index} className="relative">
                      <EventCard
                        title={event.eventName}
                        description={event.eventDescription}
                        date={event.eventDate}
                        venue={event.venue}
                        image={resolveImage(event)}
                      />
                      <div className="mt-4">
                        <Button
                          onClick={() => handleRegister(event.eventId, event.eventName)}
                          className="w-full rounded-full gradient-hero"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Register Now
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No upcoming events found.</p>
                )}
              </div>
            </section>

            {/* Registered Events */}
            <section>
              <div className="mb-6">
                <h2 className="text-3xl font-bold">Registered Events</h2>
                <p className="text-muted-foreground">Events you have registered for</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {registeredEvents.length > 0 ? (
                  registeredEvents.map((event, index) => (
                    <EventCard
                      key={index}
                      title={event.eventName}
                      description={event.eventDescription}
                      date={event.eventDate}
                      venue={event.venue}
                      image={resolveImage(event)}
                    />
                  ))
                ) : (
                  <p>No registered events yet.</p>
                )}
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
                  <div
                    key={notification.id}
                    className="p-4 rounded-xl bg-muted/50 space-y-2"
                  >
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