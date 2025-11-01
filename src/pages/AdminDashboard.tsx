import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, LogOut, Plus, Users, MapPin } from "lucide-react";
import { toast } from "sonner";

const API_URL = "https://yytxudzxoh.execute-api.us-east-1.amazonaws.com/events"; // Create Event
const MANAGE_API_URL = "https://wg4jmm2w3ttelvl5zi6eb5iw2q0exksv.lambda-url.us-east-1.on.aws/"; // Manage Events Lambda

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [newEvent, setNewEvent] = useState({
    eventName: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    department: "",
    imageFile: null as File | null,
  });

  const [events, setEvents] = useState<any[]>([]);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(MANAGE_API_URL, { method: "GET" });
      const data = await response.json();
      setEvents(data.events || []);
    } catch (err: any) {
      toast.error("Failed to fetch events: " + err.message);
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageBase64 = "";
      if (newEvent.imageFile) {
        imageBase64 = await toBase64(newEvent.imageFile);
      }

      const payload = {
        eventName: newEvent.eventName,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.venue,
        description: newEvent.description,
        department: newEvent.department || "general",
        imageBase64: imageBase64 || undefined,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create event");

      toast.success("Event created successfully!");
      setNewEvent({ eventName: "", date: "", time: "", venue: "", description: "", department: "", imageFile: null });
      fetchEvents();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleEditClick = (eventItem: any) => {
    setEditingEvent({ ...eventItem });
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
              <h1 className="text-xl font-bold">Welcome, Admin!</h1>
              <p className="text-xs text-muted-foreground">Manage your college events</p>
            </div>
          </div>

          <Button onClick={handleLogout} variant="outline" className="rounded-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 rounded-2xl">
            <TabsTrigger value="create" className="rounded-xl">Create Event</TabsTrigger>
            <TabsTrigger value="manage" className="rounded-xl">Manage Events</TabsTrigger>
          </TabsList>

          {/* Create Event Tab */}
          <TabsContent value="create">
            <Card className="rounded-2xl shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-primary" />
                  Create New Event
                </CardTitle>
                <CardDescription>Fill in the details to create a new college event</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Title</Label>
                      <Input
                        id="eventName"
                        placeholder="Tech Innovation Fest"
                        value={newEvent.eventName}
                        onChange={(e) => setNewEvent({ ...newEvent, eventName: e.target.value })}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="venue">Venue</Label>
                      <Input
                        id="venue"
                        placeholder="Main Auditorium"
                        value={newEvent.venue}
                        onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        required
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        required
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="CSE"
                      value={newEvent.department}
                      onChange={(e) => setNewEvent({ ...newEvent, department: e.target.value })}
                      required
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event..."
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      required
                      className="rounded-xl min-h-32"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="poster">Event Poster</Label>
                    <Input
                      id="poster"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewEvent({ ...newEvent, imageFile: e.target.files ? e.target.files[0] : null })}
                      className="rounded-xl"
                    />
                  </div>

                  <Button type="submit" className="w-full rounded-full gradient-hero">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Events Tab */}
          <TabsContent value="manage">
            <Card className="rounded-2xl shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Manage Events
                </CardTitle>
                <CardDescription>View and manage all college events</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {events.map((event) => (
                      <TableRow key={event.eventId}>
                        <TableCell className="font-medium">{event.eventName}</TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-secondary" />
                            {event.location}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Button variant="outline" size="sm" className="rounded-full" onClick={() => handleEditClick(event)}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  let imageBase64 = "";
                  if (editingEvent.imageFile instanceof File) {
                    imageBase64 = await toBase64(editingEvent.imageFile);
                  }

                  const payload: any = {
                    eventId: editingEvent.eventId,
                    eventName: editingEvent.eventName,
                    date: editingEvent.date,
                    time: editingEvent.time,
                    location: editingEvent.location,
                    description: editingEvent.description,
                    department: editingEvent.department,
                  };
                  if (imageBase64) payload.imageBase64 = imageBase64;

                  const response = await fetch(MANAGE_API_URL, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });
                  const data = await response.json();
                  if (!response.ok) throw new Error(data.error || "Failed to update event");

                  toast.success("Event updated successfully!");
                  setEvents((prev) =>
                    prev.map((e) => (e.eventId === editingEvent.eventId ? data.event : e))
                  );
                  setEditingEvent(null);
                } catch (err: any) {
                  toast.error(err.message);
                }
              }}
              className="space-y-3"
            >
              <Input
                value={editingEvent.eventName}
                onChange={(e) => setEditingEvent({ ...editingEvent, eventName: e.target.value })}
                placeholder="Event Name"
                required
              />
              <Input
                type="date"
                value={editingEvent.date}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                required
              />
              <Input
                type="time"
                value={editingEvent.time}
                onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                required
              />
              <Input
                value={editingEvent.location}
                onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                placeholder="Venue"
                required
              />
              <Input
                value={editingEvent.department}
                onChange={(e) => setEditingEvent({ ...editingEvent, department: e.target.value })}
                placeholder="Department"
                required
              />
              <Textarea
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                placeholder="Description"
                required
              />
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditingEvent({ ...editingEvent, imageFile: e.target.files ? e.target.files[0] : null })
                }
              />
              <div className="flex justify-between mt-4 gap-2">
                <Button type="submit" className="rounded-full gradient-hero">Save</Button>
                <Button
                  variant="destructive"
                  className="rounded-full"
                  onClick={async () => {
                    if (!confirm("Are you sure you want to delete this event?")) return;
                    try {
                      const res = await fetch(MANAGE_API_URL, {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ eventId: editingEvent.eventId }),
                      });
                      const data = await res.json();
                      if (!res.ok) throw new Error(data.error || "Failed to delete event");

                      toast.success("Event deleted successfully!");
                      setEvents((prev) => prev.filter((e) => e.eventId !== editingEvent.eventId));
                      setEditingEvent(null);
                    } catch (err: any) {
                      toast.error(err.message);
                    }
                  }}
                >
                  Delete
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => setEditingEvent(null)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
