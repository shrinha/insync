"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Share2, Bot, Clock, TrendingUp, Shield, Star, Rocket, Menu } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/layout/Footer";
import CalendarPreview from "@/components/CalendarPreview";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary" data-testid="logo">
                  Insync
                </h1>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-solutions"
              >
                Solutions
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-enterprise"
              >
                Enterprise
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-insync-ai"
              >
                Insync.ai
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-developer"
              >
                Developer
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-resources"
              >
                Resources
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-pricing"
              >
                Pricing
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                data-testid="button-signin"
              >
                Sign in
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover-lift"
                data-testid="button-get-started"
              >
                Get started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-border bg-card" data-testid="mobile-menu">
              <div className="px-4 py-4 space-y-4">
                <nav className="space-y-3">
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="mobile-nav-solutions"
                  >
                    Solutions
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="mobile-nav-enterprise"
                  >
                    Enterprise
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="mobile-nav-insync-ai"
                  >
                    Insync.ai
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="mobile-nav-developer"
                  >
                    Developer
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="mobile-nav-resources"
                  >
                    Resources
                  </a>
                  <a
                    href="#"
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="mobile-nav-pricing"
                  >
                    Pricing
                  </a>
                </nav>
                <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    className="justify-start"
                    data-testid="mobile-button-signin"
                  >
                    Sign in
                  </Button>
                  <Button
                    className="justify-start bg-primary text-primary-foreground hover:bg-primary/90"
                    data-testid="mobile-button-get-started"
                  >
                    Get started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  className="inline-flex items-center bg-accent/10 text-accent hover:bg-accent/20"
                  data-testid="badge-launch"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  Insync launches v2.7
                </Badge>
                <h1
                  className="text-4xl lg:text-6xl font-bold leading-tight"
                  data-testid="heading-hero"
                >
                  The better way to
                  <span className="text-primary"> schedule your</span>
                  meetings
                </h1>
                <p
                  className="text-xl text-muted-foreground leading-relaxed"
                  data-testid="text-hero-description"
                >
                  A fully customizable scheduling software for individuals, businesses taking calls
                  and developers building scheduling platforms where users meet users.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 hover-lift text-lg font-semibold px-8 py-4"
                  data-testid="button-start-scheduling"
                >
                  <Clock className="mr-3 h-5 w-5" />
                  Start scheduling for free
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto ml-0 sm:ml-4 text-primary border-primary hover:bg-primary/5 text-lg font-semibold px-8 py-4"
                  data-testid="button-signup-email"
                >
                  Sign up with email →
                </Button>
              </div>

              <p className="text-sm text-muted-foreground" data-testid="text-no-credit-card">
                No credit card required
              </p>

              {/* Trust indicators */}
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex items-center" data-testid="trustpilot-rating">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">Trustpilot</span>
                </div>
                <div className="flex items-center" data-testid="g2-rating">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">G2</span>
                </div>
                <div className="flex items-center" data-testid="getapp-rating">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">GetApp</span>
                </div>
              </div>
            </div>

            {/* Calendar and Scheduling Preview */}
            <CalendarPreview />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="heading-features">
              Powerful scheduling capabilities
            </h2>
            <p
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
              data-testid="text-features-description"
            >
              Everything you need to schedule, manage, and optimize meetings with seamless calendar
              integrations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border hover-lift"
              data-testid="feature-meeting-links"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Meeting Links</h3>
              <p className="text-muted-foreground">
                Create personalized scheduling links that sync with your calendar and availability
                preferences.
              </p>
            </Card>

            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border hover-lift"
              data-testid="feature-calendar-sync"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="text-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Calendar Integrations</h3>
              <p className="text-muted-foreground">
                Seamlessly sync with Google Calendar, Outlook, Apple Calendar, and all major
                calendar platforms.
              </p>
            </Card>

            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border hover-lift"
              data-testid="feature-ai-scheduling"
            >
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                <Bot className="text-destructive h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Scheduling Assistant</h3>
              <p className="text-muted-foreground">
                Smart scheduling suggestions based on preferences, time zones, and availability
                patterns.
              </p>
            </Card>

            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border hover-lift"
              data-testid="feature-timezone"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Time Zones</h3>
              <p className="text-muted-foreground">
                Automatic time zone detection and conversion for seamless international meeting
                coordination.
              </p>
            </Card>

            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border hover-lift"
              data-testid="feature-analytics"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-accent h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meeting Analytics</h3>
              <p className="text-muted-foreground">
                Track meeting patterns, analyze booking trends, and optimize your scheduling
                efficiency.
              </p>
            </Card>

            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border hover-lift"
              data-testid="feature-security"
            >
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-destructive h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-muted-foreground">
                SOC 2 compliant with end-to-end encryption, SAML SSO, and advanced access controls.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="heading-testimonials">
              Trusted by teams worldwide
            </h2>
            <p
              className="text-xl text-muted-foreground"
              data-testid="text-testimonials-description"
            >
              See how leading companies use Insync to streamline their scheduling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border"
              data-testid="testimonial-sarah"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">5.0</span>
              </div>
              <blockquote className="text-muted-foreground mb-6">
                &quot;Insync transformed how we coordinate meetings across our global team. The
                timezone handling is flawless and booking is effortless.&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-muted rounded-full mr-4 flex items-center justify-center">
                  <span className="text-lg font-semibold">SC</span>
                </div>
                <div>
                  <p className="font-semibold">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Head of Operations, TechCorp</p>
                </div>
              </div>
            </Card>

            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border"
              data-testid="testimonial-marcus"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">5.0</span>
              </div>
              <blockquote className="text-muted-foreground mb-6">
                &quot;We reduced our scheduling overhead by 80%. The smart booking links eliminate
                the back-and-forth emails completely.&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-muted rounded-full mr-4 flex items-center justify-center">
                  <span className="text-lg font-semibold">MJ</span>
                </div>
                <div>
                  <p className="font-semibold">Marcus Johnson</p>
                  <p className="text-sm text-muted-foreground">VP of Sales, GrowthLabs</p>
                </div>
              </div>
            </Card>

            <Card
              className="bg-card p-8 rounded-xl shadow-sm border border-border"
              data-testid="testimonial-emma"
            >
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">5.0</span>
              </div>
              <blockquote className="text-muted-foreground mb-6">
                &quot;The calendar integrations are seamless. Our clients love how easy it is to
                book consultations, and we never double-book anymore.&quot;
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-muted rounded-full mr-4 flex items-center justify-center">
                  <span className="text-lg font-semibold">ER</span>
                </div>
                <div>
                  <p className="font-semibold">Emma Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Founder, ConsultCo</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-muted-foreground mb-12"
            data-testid="text-trusted-companies"
          >
            Trusted by fast-growing companies around the world
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            <div className="text-2xl font-bold text-muted-foreground" data-testid="logo-reel">
              reel.
            </div>
            <div
              className="flex items-center space-x-1 text-muted-foreground"
              data-testid="logo-framer"
            >
              <span className="font-semibold">Framer</span>
            </div>
            <div className="text-2xl font-bold text-muted-foreground" data-testid="logo-ramp">
              ramp
            </div>
            <div
              className="flex items-center space-x-1 text-muted-foreground"
              data-testid="logo-planetscale"
            >
              <span className="font-semibold">PlanetScale</span>
            </div>
            <div
              className="flex items-center space-x-1 text-muted-foreground"
              data-testid="logo-mercury"
            >
              <span className="font-semibold">Mercury</span>
            </div>
            <div className="text-2xl font-bold text-muted-foreground" data-testid="logo-coinbase">
              coinbase
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" data-testid="heading-final-cta">
              Start scheduling meetings today
            </h2>
            <p
              className="text-xl text-muted-foreground mb-8"
              data-testid="text-final-cta-description"
            >
              Join thousands of professionals who use Insync to streamline their scheduling
              workflow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover-lift text-lg font-semibold px-8 py-4"
                data-testid="button-get-started-free"
              >
                Get started for free
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-primary border-primary hover:bg-primary/5 text-lg font-semibold px-8 py-4"
                data-testid="button-schedule-demo"
              >
                Schedule a demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4" data-testid="text-trial-info">
              No credit card required
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
