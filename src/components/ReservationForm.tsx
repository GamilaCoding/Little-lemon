import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Users, User, Phone, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

const reservationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-() ]{7,20}$/, "Please enter a valid phone number"),
  guests: z.string().min(1, "Please select number of guests"),
  date: z.date({ required_error: "Please select a date" }),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().max(500).optional(),
});

type ReservationValues = z.infer<typeof reservationSchema>;

const timeSlots = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
  "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM",
  "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
];

export default function ReservationForm() {
  const { toast } = useToast();
  const form = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { name: "", phone: "", guests: "", time: "", notes: "" },
  });

  function onSubmit(data: ReservationValues) {
    toast({
      title: "✅ Reservation Confirmed!",
      description: `Thank you ${data.name}! Your table for ${data.guests} is booked on ${format(data.date, "PPP")} at ${data.time}.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
        aria-label="Reserve a table"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5 font-body">
                  <User className="h-4 w-4" /> Full Name
                </FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5 font-body">
                  <Phone className="h-4 w-4" /> Phone Number
                </FormLabel>
                <FormControl>
                  <Input placeholder="(312) 555-0192" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5 font-body">
                <Users className="h-4 w-4" /> Number of Guests
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n} {n === 1 ? "guest" : "guests"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="flex items-center gap-1.5 font-body">
                  <CalendarIcon className="h-4 w-4" /> Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal font-body",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5 font-body">
                  <Clock className="h-4 w-4" /> Time
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5 font-body">
                <MessageSquare className="h-4 w-4" /> Special Requests (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any dietary requirements or special requests..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full text-lg font-display tracking-wide">
          Reserve Your Table 🍋
        </Button>
      </form>
    </Form>
  );
}
