import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Activity, 
  Key, 
  Play, 
  Eye,
  Network,
  Server,
  Clock,
  ArrowRight,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface SystemEvent {
  id: string;
  event_type: string;
  status: string;
  description: string;
  severity: string;
  created_at: string;
}

interface SakramLog {
  id: string;
  step_number: number;
  component: string;
  action: string;
  details: string;
  timestamp: string;
}

export default function Dashboard() {
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [events, setEvents] = useState<SystemEvent[]>([]);
  const [logs, setLogs] = useState<SakramLog[]>([]);
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);
  const [showLogs, setShowLogs] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSystemEvents();
    }
  }, [user]);

  const fetchSystemEvents = async () => {
    const { data, error } = await supabase
      .from('system_events')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data || []);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "There was an error signing out.",
        variant: "destructive",
      });
    }
  };

  const runDiagnosticChecklist = async () => {
    setIsRunningDiagnostic(true);
    setShowLogs(false);
    
    // Clear previous logs
    await supabase.from('sakram_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    // Simulate the Sakram Core workflow
    const simulatedLogs: Omit<SakramLog, 'id' | 'timestamp'>[] = [
      { step_number: 1, component: "Sakram Core", action: "Task Request Created", details: "Admin requests network connectivity check for localhost" },
      { step_number: 2, component: "Task Request Queue (TRQ)", action: "Task Queued", details: "Network connectivity task added to TRQ" },
      { step_number: 3, component: "SPIL", action: "Task Picked Up", details: "SPIL picks up task request from TRQ" },
      { step_number: 4, component: "SPIL", action: "Plugin Request Sent", details: "SPIL sends plugin execution request to Ansible" },
      { step_number: 5, component: "Ansible", action: "Plugin Execution Started", details: "Ansible receives and starts plugin execution" },
      { step_number: 6, component: "Network Plugin", action: "Command Executed", details: "Plugin executes 'ping localhost' command" },
      { step_number: 7, component: "Network Plugin", action: "Result Received", details: "Ping command successful - localhost is reachable" },
      { step_number: 8, component: "Ansible", action: "Result Returned", details: "Ansible returns plugin execution result to SPIL" },
      { step_number: 9, component: "SPIL", action: "Response Queued", details: "SPIL puts response on Plugin Results Queue (PRQ)" },
      { step_number: 10, component: "Sakram Core", action: "Result Processed", details: "Sakram Core picks up result from PRQ and updates event status" },
    ];

    // Insert all logs at once without showing toasts
    for (let i = 0; i < simulatedLogs.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300)); // Shorter delay
      
      // Insert log into database
      await supabase
        .from('sakram_logs')
        .insert({
          step_number: simulatedLogs[i].step_number,
          component: simulatedLogs[i].component,
          action: simulatedLogs[i].action,
          details: simulatedLogs[i].details,
        });
    }

    // Update the event status to resolved
    const connectivityEvent = events.find(e => e.event_type === 'connectivity' && e.status === 'active');
    if (connectivityEvent) {
      const { error } = await supabase
        .from('system_events')
        .update({ 
          status: 'resolved',
          resolved_at: new Date().toISOString(),
        })
        .eq('id', connectivityEvent.id);

      if (!error) {
        toast({
          title: "✅ Diagnostic Complete",
          description: "Connection to localhost restored successfully!",
        });
        
        // Refresh events
        fetchSystemEvents();
      }
    }

    setIsRunningDiagnostic(false);
  };

  const displaySakramLogs = async () => {
    const { data, error } = await supabase
      .from('sakram_logs')
      .select('*')
      .order('step_number', { ascending: true });

    if (error) {
      console.error('Error fetching logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch Sakram logs",
        variant: "destructive",
      });
    } else {
      setLogs(data || []);
      setShowLogs(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please sign in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-saffron rounded-lg shadow-3d">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Sakram Core Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {profile?.name} ({profile?.role})
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">System Events</TabsTrigger>
            <TabsTrigger value="diagnostics">Diagnostics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-3d hover:shadow-elevated transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Events</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {events.filter(e => e.status === 'active').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Requiring attention
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-3d hover:shadow-elevated transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Status</CardTitle>
                  <Activity className="h-4 w-4 text-secondary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">Online</div>
                  <p className="text-xs text-muted-foreground">
                    All systems operational
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-3d hover:shadow-elevated transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">API Key</CardTitle>
                  <Key className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-sm font-mono bg-muted p-2 rounded">
                    {profile?.api_key?.substring(0, 12)}...
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    For API integration
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-3d hover:shadow-elevated transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Role</CardTitle>
                  <Shield className="h-4 w-4 text-accent-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold capitalize">{profile?.role}</div>
                  <p className="text-xs text-muted-foreground">
                    Access level
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Events */}
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Recent System Events</span>
                </CardTitle>
                <CardDescription>
                  Latest security and system events requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                {events.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No system events found
                  </p>
                ) : (
                  <div className="space-y-4">
                    {events.slice(0, 5).map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {event.status === 'active' ? (
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                          ) : (
                            <CheckCircle className="h-5 w-5 text-secondary" />
                          )}
                          <div>
                            <p className="font-medium">{event.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(event.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant={event.status === 'active' ? 'destructive' : 'secondary'}>
                          {event.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>System Events</CardTitle>
                <CardDescription>
                  Monitor and manage system security events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {event.status === 'active' ? (
                          <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                        ) : (
                          <div className="w-3 h-3 bg-secondary rounded-full" />
                        )}
                        <div>
                          <p className="font-medium">{event.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Type: {event.event_type}</span>
                            <span>Severity: {event.severity}</span>
                            <span>{new Date(event.created_at).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={event.status === 'active' ? 'destructive' : 'secondary'}>
                        {event.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diagnostics" className="space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5" />
                  <span>Network Connectivity Diagnostics</span>
                </CardTitle>
                <CardDescription>
                  Run diagnostic checklists to troubleshoot connectivity issues
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Active Events */}
                {events.filter(e => e.status === 'active').map((event) => (
                  <Alert key={event.id} variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span>🔴 {event.description}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={runDiagnosticChecklist}
                        disabled={isRunningDiagnostic}
                        className="ml-4"
                      >
                        {isRunningDiagnostic ? (
                          <>
                            <Activity className="mr-2 h-4 w-4 animate-spin" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Run Diagnostic Checklist
                          </>
                        )}
                      </Button>
                    </AlertDescription>
                  </Alert>
                ))}

                {/* Resolved Events */}
                {events.filter(e => e.status === 'resolved').map((event) => (
                  <Alert key={event.id} className="border-secondary">
                    <CheckCircle className="h-4 w-4 text-secondary" />
                    <AlertDescription>
                      ✅ {event.description.replace('down', 'up').replace('Connection to localhost down', 'Connection to localhost up')}
                    </AlertDescription>
                  </Alert>
                ))}

                {/* Logs Display */}
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    onClick={displaySakramLogs}
                    className="w-full"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Display Sakram Log
                  </Button>

                  {showLogs && logs.length > 0 && (
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="text-lg">Sakram Execution Log</CardTitle>
                        <CardDescription>
                          Detailed workflow execution trace
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                          {logs.map((log, index) => (
                            <div
                              key={log.id}
                              className="flex items-start space-x-3 p-3 bg-background rounded border-l-4 border-primary/30"
                            >
                              <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                                {log.step_number}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-sm">{log.component}</span>
                                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                  <span className="font-semibold text-sm">{log.action}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{log.details}</p>
                                <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(log.timestamp).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-elevated">
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>
                  Your account information and API access
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">Account Details</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Name:</span> {profile?.name}</p>
                      <p><span className="font-medium">Email:</span> {user?.email}</p>
                      <p><span className="font-medium">Role:</span> <Badge className="capitalize">{profile?.role}</Badge></p>
                      <p><span className="font-medium">Auth Provider:</span> {profile?.auth_provider}</p>
                      <p><span className="font-medium">Joined:</span> {new Date(profile?.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-3">API Access</h3>
                    <div className="space-y-2">
                      <p className="font-medium">API Key (for integration):</p>
                      <div className="p-3 bg-muted rounded-lg font-mono text-sm break-all">
                        {profile?.api_key}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        ⚠️ Keep this key secure. This is a simulated API key for demo purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}