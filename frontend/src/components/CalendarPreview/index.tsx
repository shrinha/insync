"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/homeButton";
import { Clock } from "lucide-react";
import "./styles.css";

export default function CalendarPreview() {
  return (
    <div className="lg:pl-8">
      <Card
        className="bg-card rounded-xl shadow-xl border border-border overflow-hidden hover-lift"
        data-testid="calendar-preview"
      >
        {/* Calendar Header */}
        <div className="bg-muted/50 p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="text-sm text-muted-foreground" data-testid="text-calendar-title">
              Partnerships Meeting
            </div>
          </div>
        </div>

        {/* Calendar Content */}
        <CardContent className="p-6 space-y-6">
          {/* Meeting Details */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">JM</span>
              </div>
              <div>
                <p className="font-medium text-sm" data-testid="meeting-organizer">
                  Create new business Reservation
                </p>
                <p className="text-xs text-muted-foreground">
                  Founder, or business looking to collaborate with Insync? Lets chat!
                </p>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg" data-testid="heading-calendar-month">
                May 2025
              </h3>
            </div>

            {/* Calendar Days Header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground font-medium">
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1" data-testid="calendar-grid">
              {/* Week 1 */}
              <div className="h-8 flex items-center justify-center text-xs text-muted-foreground"></div>
              <div className="h-8 flex items-center justify-center text-xs text-muted-foreground"></div>
              <div className="h-8 flex items-center justify-center text-xs text-muted-foreground"></div>
              <div className="h-8 flex items-center justify-center text-xs text-muted-foreground"></div>
              <div className="h-8 flex items-center justify-center text-xs">1</div>
              <div className="h-8 flex items-center justify-center text-xs">2</div>
              <div className="h-8 flex items-center justify-center text-xs">3</div>

              {/* Week 2 */}
              <div className="h-8 flex items-center justify-center text-xs">4</div>
              <div className="h-8 flex items-center justify-center text-xs">5</div>
              <div className="h-8 flex items-center justify-center text-xs">6</div>
              <div className="h-8 flex items-center justify-center text-xs">7</div>
              <div className="h-8 flex items-center justify-center text-xs">8</div>
              <div className="h-8 flex items-center justify-center text-xs">9</div>
              <div className="h-8 flex items-center justify-center text-xs">10</div>

              {/* Week 3 */}
              <div className="h-8 flex items-center justify-center text-xs">11</div>
              <div className="h-8 flex items-center justify-center text-xs">12</div>
              <div className="h-8 flex items-center justify-center text-xs">13</div>
              <div className="h-8 flex items-center justify-center text-xs">14</div>
              <div className="h-8 flex items-center justify-center text-xs bg-primary text-primary-foreground rounded">
                15
              </div>
              <div className="h-8 flex items-center justify-center text-xs">16</div>
              <div className="h-8 flex items-center justify-center text-xs">17</div>

              {/* Week 4 */}
              <div className="h-8 flex items-center justify-center text-xs">18</div>
              <div className="h-8 flex items-center justify-center text-xs">19</div>
              <div className="h-8 flex items-center justify-center text-xs bg-accent text-accent-foreground rounded">
                20
              </div>
              <div className="h-8 flex items-center justify-center text-xs bg-accent text-accent-foreground rounded">
                21
              </div>
              <div className="h-8 flex items-center justify-center text-xs bg-accent text-accent-foreground rounded">
                22
              </div>
              <div className="h-8 flex items-center justify-center text-xs bg-accent text-accent-foreground rounded">
                23
              </div>
              <div className="h-8 flex items-center justify-center text-xs">24</div>

              {/* Week 5 */}
              <div className="h-8 flex items-center justify-center text-xs">25</div>
              <div className="h-8 flex items-center justify-center text-xs">26</div>
              <div className="h-8 flex items-center justify-center text-xs bg-accent text-accent-foreground rounded">
                27
              </div>
              <div className="h-8 flex items-center justify-center text-xs bg-accent text-accent-foreground rounded">
                28
              </div>
              <div className="h-8 flex items-center justify-center text-xs bg-accent text-accent-foreground rounded">
                29
              </div>
              <div className="h-8 flex items-center justify-center text-xs bg-accent text-accent-foreground rounded">
                30
              </div>
              <div className="h-8 flex items-center justify-center text-xs">31</div>
            </div>
          </div>

          {/* Time Slots */}
          <div
            className="border border-border rounded-lg p-4 space-y-3"
            data-testid="time-slots-preview"
          >
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Available times</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                data-testid="time-slot-15"
              >
                15m
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                data-testid="time-slot-30"
              >
                30m
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                data-testid="time-slot-45"
              >
                45m
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>🌍</span>
              <span data-testid="timezone">Europe/Amsterdam</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
