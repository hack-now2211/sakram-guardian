import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Shield, Zap } from "lucide-react";

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sakram <span className="bg-gradient-saffron bg-clip-text text-transparent">API</span>
          </h1>
          <Badge variant="outline" className="text-lg px-4 py-2">v0.3</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span>Core API</span>
              </CardTitle>
              <CardDescription>Security governance endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded font-mono text-sm">
                  POST /api/v0.3/events
                </div>
                <div className="p-3 bg-muted/50 rounded font-mono text-sm">
                  GET /api/v0.3/policies
                </div>
                <div className="p-3 bg-muted/50 rounded font-mono text-sm">
                  POST /api/v0.3/diagnostics
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-secondary" />
                <span>Plugin API</span>
              </CardTitle>
              <CardDescription>Extensible plugin system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-muted/50 rounded font-mono text-sm">
                  POST /api/v0.3/plugins/execute
                </div>
                <div className="p-3 bg-muted/50 rounded font-mono text-sm">
                  GET /api/v0.3/plugins/status
                </div>
                <div className="p-3 bg-muted/50 rounded font-mono text-sm">
                  POST /api/v0.3/plugins/register
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}