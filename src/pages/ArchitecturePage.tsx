import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Network, 
  Cog, 
  Database, 
  Lock, 
  Users, 
  ArrowRight,
  Brain,
  Globe,
  Zap
} from "lucide-react";

export default function ArchitecturePage() {
  const architecturalPrinciples = [
    {
      icon: Shield,
      title: "Self-Service Governance",
      description: "Techno-legal framework utilizable by entities of all sizes without requiring deep cybersecurity expertise",
      color: "bg-gradient-saffron"
    },
    {
      icon: Network,
      title: "Federated Architecture",
      description: "Distributed, federated design that preserves privacy and ensures scalability across organizations",
      color: "bg-gradient-green"
    },
    {
      icon: Cog,
      title: "Plugin-Based Extensibility",
      description: "Modular design allowing integration of various security tools and services seamlessly",
      color: "bg-primary"
    },
    {
      icon: Database,
      title: "Composable Microservices",
      description: "Independent, replaceable components that can be updated or scaled individually",
      color: "bg-secondary"
    },
    {
      icon: Lock,
      title: "Verifiable Data Provenance",
      description: "Cryptographic verification of security logs and audit trails for compliance",
      color: "bg-gradient-saffron"
    },
    {
      icon: Brain,
      title: "AI-Powered Security",
      description: "Leveraging artificial intelligence and large language models to enhance security monitoring",
      color: "bg-gradient-green"
    }
  ];

  const components = [
    {
      name: "Sakram Core",
      description: "Central coordination service that orchestrates security workflows and policy enforcement",
      responsibilities: ["Task orchestration", "Policy management", "Event coordination", "API gateway"]
    },
    {
      name: "SPIL (Security Plugin Interface Layer)",
      description: "Interface layer that manages communication between core and security plugins",
      responsibilities: ["Plugin management", "Request routing", "Response handling", "Plugin lifecycle"]
    },
    {
      name: "Task Request Queue (TRQ)",
      description: "Message queue system for managing security task requests and workflow coordination",
      responsibilities: ["Task queuing", "Priority management", "Load balancing", "Workflow orchestration"]
    },
    {
      name: "Plugin Results Queue (PRQ)",
      description: "Queue system for collecting and processing results from security plugin executions",
      responsibilities: ["Result aggregation", "Response processing", "Status tracking", "Event publishing"]
    },
    {
      name: "Security Plugins",
      description: "Extensible modules for various security tools (Ansible, SIEM, EDR, NDR, etc.)",
      responsibilities: ["Tool integration", "Command execution", "Data collection", "Result reporting"]
    },
    {
      name: "Local Node",
      description: "Federated deployment unit that handles entity-specific security and governance needs",
      responsibilities: ["Local policy enforcement", "Data privacy", "Compliance monitoring", "Threat detection"]
    }
  ];

  const complianceFrameworks = [
    "Digital Personal Data Protection Act 2023 (DPDP)",
    "IT Act 2000 & Amendments",
    "CERT-In Guidelines",
    "RBI Cybersecurity Framework",
    "ISO 27001",
    "NIST Cybersecurity Framework"
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sakram <span className="bg-gradient-saffron bg-clip-text text-transparent">Architecture</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A federated, self-service cybersecurity governance framework designed for scale, 
            privacy, and compliance across India's diverse digital ecosystem.
          </p>
          <div className="mt-8">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Version 0.3 Architecture
            </Badge>
          </div>
        </div>

        {/* Architectural Principles */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Core <span className="text-primary">Principles</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architecturalPrinciples.map((principle, index) => (
              <Card key={index} className="group hover:shadow-3d transition-all duration-300 hover:-translate-y-2 border-none bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center">
                  <div className={`mx-auto p-3 ${principle.color} rounded-lg shadow-3d group-hover:shadow-elevated transition-all duration-300 w-fit`}>
                    <principle.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* System Architecture */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            System <span className="text-secondary">Components</span>
          </h2>
          <div className="space-y-6">
            {components.map((component, index) => (
              <Card key={index} className="shadow-elevated hover:shadow-3d transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold text-primary">
                      {component.name}
                    </CardTitle>
                    <Badge variant="outline">Core Component</Badge>
                  </div>
                  <CardDescription className="text-lg">
                    {component.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {component.responsibilities.map((responsibility, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{responsibility}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Data Flow Visualization */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Workflow <span className="text-primary">Execution</span>
          </h2>
          <Card className="shadow-elevated bg-gradient-to-br from-muted/30 to-muted/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Simulated API Flow</CardTitle>
              <CardDescription className="text-center text-lg">
                Example: Network Connectivity Diagnostic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { step: "1", component: "Admin", action: "Logs into Sakram Core" },
                  { step: "2", component: "Sakram Core", action: "Puts task on TRQ" },
                  { step: "3", component: "SPIL", action: "Picks up from TRQ" },
                  { step: "4", component: "Ansible", action: "Executes ping localhost" },
                  { step: "5", component: "Results", action: "Flow back via PRQ" }
                ].map((flow, index) => (
                  <div key={index} className="relative">
                    <Card className="h-full bg-white/80 hover:bg-white transition-all duration-300 shadow-3d hover:shadow-elevated">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-gradient-saffron text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                          {flow.step}
                        </div>
                        <h4 className="font-semibold text-primary mb-2">{flow.component}</h4>
                        <p className="text-sm text-muted-foreground">{flow.action}</p>
                      </CardContent>
                    </Card>
                    {index < 4 && (
                      <ArrowRight className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 text-primary h-6 w-6" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Compliance & Features */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Compliance */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-6 w-6 text-secondary" />
                  <span>Regulatory Compliance</span>
                </CardTitle>
                <CardDescription>
                  Built-in compliance with Indian and global standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complianceFrameworks.map((framework, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <Shield className="h-5 w-5 text-secondary flex-shrink-0" />
                      <span className="text-sm font-medium">{framework}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-6 w-6 text-primary" />
                  <span>AI-Powered Capabilities</span>
                </CardTitle>
                <CardDescription>
                  Leveraging artificial intelligence for enhanced security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { icon: Zap, title: "Threat Detection", desc: "AI models identify anomalies and potential threats" },
                    { icon: Users, title: "Compliance Assistant", desc: "LLMs translate regulations into actionable controls" },
                    { icon: Globe, title: "Cyber Copilot", desc: "Natural language interface for security guidance" },
                    { icon: Network, title: "Federated Learning", desc: "Collaborative model training without sharing raw data" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-2 bg-gradient-saffron rounded-lg">
                        <feature.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16 bg-gradient-tricolor rounded-2xl">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Implement Sakram?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Experience the future of federated cybersecurity governance
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button variant="glass" size="xl" className="group">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/api">
                <Button variant="outline" size="xl" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Explore API
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}