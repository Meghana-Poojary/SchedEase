import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  image: string;
  venue?: string;
}

const EventCard = ({ title, description, date, image, venue }: EventCardProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-card hover:shadow-hover transition-smooth group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-smooth group-hover:scale-110"
        />
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
