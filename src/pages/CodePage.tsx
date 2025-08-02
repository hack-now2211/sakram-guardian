import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, GitBranch, Bug, FileText } from "lucide-react";

export default function CodePage() {
  const files = [
    { name: "APISpecifications.md", updated: "3 months ago" },
    { name: "ImplementationRoadmap.md", updated: "3 months ago" },
    { name: "README.md", updated: "3 months ago" },
    { name: "SakramC4Architecture.md", updated: "3 months ago" },
    { name: "SakramVisualArchitecture.md", updated: "3 months ago" },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Code & <span className="bg-gradient-green bg-clip-text text-transparent">Issues</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Sakram Project Repository - Architecture v0.3
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <Card className="shadow-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Github className="h-5 w-5" />
                <span>Repository</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">sandeepkunkunuru/sakram</p>
              <Badge variant="secondary">Public</Badge>
            </CardContent>
          </Card>

          <Card className="shadow-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitBranch className="h-5 w-5" />
                <span>Branches</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">3</p>
              <p className="text-muted-foreground">Active branches</p>
            </CardContent>
          </Card>

          <Card className="shadow-3d">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bug className="h-5 w-5" />
                <span>Issues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">5</p>
              <p className="text-muted-foreground">Open issues</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Architecture Files (/v0.3/)</CardTitle>
            <CardDescription>Latest architecture documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{file.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{file.updated}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}