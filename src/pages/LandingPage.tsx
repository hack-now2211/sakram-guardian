import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Network, Zap, Globe, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-cyber.jpg";

export default function LandingPage() {
  const features = [
    {
      icon: Shield,
      title: "Federated Security",
      description: "Self-service cybersecurity governance for entities of all sizes",
    },
    {
      icon: Network,
      title: "Plugin Architecture",
      description: "Modular design with extensible security plugins and integrations",
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Intelligent threat detection and compliance assistance",
    },
    {
      icon: Globe,
      title: "Collective Defense",
      description: "Share threat intelligence while preserving privacy",
    },
  ];

  const beneficiaries = [
    "Kirana Stores & SMEs",
    "Government Departments",
    "Educational Institutions", 
    "Healthcare Organizations",
    "Financial Services",
    "Technology Companies",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-background/60 to-secondary/80" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-saffron bg-clip-text text-transparent">
                Cybersecurity
              </span>
              <br />
              <span className="text-foreground">for Everyone</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From <span className="text-primary font-semibold">Kirana Stores</span> to{" "}
              <span className="text-secondary font-semibold">Government Departments</span>
              <br />
              A federated, self-service cybersecurity governance framework for India
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
              <Link to="/auth">
                <Button variant="glass" size="xl" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/architecture">
                <Button variant="glass" size="xl">
                  Explore Architecture
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About <span className="bg-gradient-saffron bg-clip-text text-transparent">Sakram</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Sakram is a federated, self-service cybersecurity governance and techno-legal framework 
                designed to democratize cybersecurity for every entity in India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="group hover:shadow-3d transition-all duration-300 hover:-translate-y-2 border-none bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="mx-auto p-3 bg-gradient-saffron rounded-lg shadow-3d group-hover:shadow-elevated transition-all duration-300 w-fit">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Who Benefits?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {beneficiaries.map((beneficiary, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground font-medium">{beneficiary}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-saffron text-white shadow-3d">
                  <h4 className="text-2xl font-bold mb-4">Key Principles</h4>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li>• Self-Service Governance</li>
                    <li>• Privacy by Design</li>
                    <li>• Verifiable Data Provenance</li>
                    <li>• AI-Powered Security</li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-16">
              How <span className="bg-gradient-green bg-clip-text text-transparent">It Works</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: "01", title: "Deploy Local Node", desc: "Install Sakram Guardian on your infrastructure" },
                { step: "02", title: "Configure Policies", desc: "Set up security policies and compliance rules" },
                { step: "03", title: "Monitor & Defend", desc: "Continuous monitoring with collective threat intelligence" },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="bg-white p-8 rounded-2xl shadow-elevated hover:shadow-3d transition-all duration-300 transform hover:scale-105">
                    <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                  {index < 2 && (
                    <ArrowRight className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary h-8 w-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-tricolor">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Ready to Secure India?
            </h2>
            <p className="text-xl mb-12 text-white/90">
              Join the Sakram Guardian ecosystem and be part of India's cybersecurity transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/auth">
                <Button variant="glass" size="xl" className="group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <div className="text-center">
                <p className="text-white/80">Questions?</p>
                <a href="mailto:contact@sakramproject.in" className="text-white font-semibold hover:underline">
                  contact@sakramproject.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}