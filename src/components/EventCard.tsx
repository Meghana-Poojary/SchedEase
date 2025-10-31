import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  image?: string | null;
  venue?: string;
}

const EventCard = ({ title, description, date, image, venue }: EventCardProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-card hover:shadow-hover transition-smooth group cursor-pointer">
      <div className="relative h-48 overflow-hidden bg-muted/20">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-smooth group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-white to-muted/50">
            <div className="text-center text-muted-foreground">
              <svg className="mx-auto mb-2 h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M8 7V5a4 4 0 118 0v2M3 7h18"></path></svg>
              <div className="text-sm">No image</div>
            </div>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{date}</span>
        </div>
        {venue && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-secondary" />
            <span>{venue}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventCard;
