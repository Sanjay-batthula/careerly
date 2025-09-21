"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Database,
  Users,
  TrendingUp,
  Settings,
  Upload,
  Download,
  RefreshCw,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"

interface TrainingData {
  id: string
  studentProfile: {
    interests: string[]
    skills: Record<string, number>
    education: string
    college: string
  }
  careerOutcome: {
    chosenCareer: string
    satisfaction: number
    timeToJob: number
    salary: string
  }
  timestamp: string
}

interface ModelMetrics {
  accuracy: number
  totalPredictions: number
  successfulPlacements: number
  averageSatisfaction: number
  lastTrainingDate: string
  modelVersion: string
}

const mockTrainingData: TrainingData[] = [
  {
    id: "1",
    studentProfile: {
      interests: ["Technology", "Programming"],
      skills: { Python: 4, JavaScript: 3, "Data Analysis": 4 },
      education: "B.Tech Computer Science",
      college: "IIT Delhi",
    },
    careerOutcome: {
      chosenCareer: "Software Engineer",
      satisfaction: 9,
      timeToJob: 3,
      salary: "₹18 LPA",
    },
    timestamp: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    studentProfile: {
      interests: ["Healthcare", "Research"],
      skills: { Biology: 5, Research: 4, Communication: 3 },
      education: "MBBS",
      college: "AIIMS Delhi",
    },
    careerOutcome: {
      chosenCareer: "Medical Researcher",
      satisfaction: 8,
      timeToJob: 6,
      salary: "₹12 LPA",
    },
    timestamp: "2024-01-14T14:20:00Z",
  },
]

const mockMetrics: ModelMetrics = {
  accuracy: 87.5,
  totalPredictions: 1247,
  successfulPlacements: 1091,
  averageSatisfaction: 8.3,
  lastTrainingDate: "2024-01-15T08:00:00Z",
  modelVersion: "v2.1.3",
}

export default function AdminPage() {
  const [trainingData, setTrainingData] = useState<TrainingData[]>(mockTrainingData)
  const [metrics, setMetrics] = useState<ModelMetrics>(mockMetrics)
  const [isTraining, setIsTraining] = useState(false)
  const [trainingProgress, setTrainingProgress] = useState(0)
  const [newDataEntry, setNewDataEntry] = useState({
    interests: "",
    skills: "",
    education: "",
    college: "",
    chosenCareer: "",
    satisfaction: "",
    timeToJob: "",
    salary: "",
  })

  const handleTrainModel = async () => {
    setIsTraining(true)
    setTrainingProgress(0)

    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          // Update metrics after training
          setMetrics((prev) => ({
            ...prev,
            accuracy: prev.accuracy + Math.random() * 2,
            lastTrainingDate: new Date().toISOString(),
            modelVersion: `v${(Number.parseFloat(prev.modelVersion.slice(1)) + 0.1).toFixed(1)}`,
          }))
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 500)
  }

  const handleAddTrainingData = () => {
    if (!newDataEntry.interests || !newDataEntry.chosenCareer) return

    const newEntry: TrainingData = {
      id: Date.now().toString(),
      studentProfile: {
        interests: newDataEntry.interests.split(",").map((i) => i.trim()),
        skills: newDataEntry.skills
          ? Object.fromEntries(
              newDataEntry.skills.split(",").map((skill) => {
                const [name, level] = skill.trim().split(":")
                return [name, Number.parseInt(level) || 3]
              }),
            )
          : {},
        education: newDataEntry.education,
        college: newDataEntry.college,
      },
      careerOutcome: {
        chosenCareer: newDataEntry.chosenCareer,
        satisfaction: Number.parseInt(newDataEntry.satisfaction) || 8,
        timeToJob: Number.parseInt(newDataEntry.timeToJob) || 6,
        salary: newDataEntry.salary,
      },
      timestamp: new Date().toISOString(),
    }

    setTrainingData([newEntry, ...trainingData])
    setNewDataEntry({
      interests: "",
      skills: "",
      education: "",
      college: "",
      chosenCareer: "",
      satisfaction: "",
      timeToJob: "",
      salary: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
            <img src="/logo.png" alt="Careerly Logo" className="h-8 w-auto" />
            </Link>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              Admin Panel
            </Badge>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">Model Training</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative overflow-hidden">

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="gradient-text">AI Model Training</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage and optimize the career recommendation AI model with real student data.
            </p>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Model Accuracy</p>
                    <p className="text-2xl font-bold text-green-600">{metrics.accuracy.toFixed(1)}%</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Predictions</p>
                    <p className="text-2xl font-bold text-blue-600">{metrics.totalPredictions.toLocaleString()}</p>
                  </div>
                  <Brain className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {((metrics.successfulPlacements / metrics.totalPredictions) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Satisfaction</p>
                    <p className="text-2xl font-bold text-orange-600">{metrics.averageSatisfaction}/10</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs defaultValue="training" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="training">Model Training</TabsTrigger>
                <TabsTrigger value="data">Training Data</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Model Training Tab */}
              <TabsContent value="training" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        Model Status
                      </CardTitle>
                      <CardDescription>Current AI model information and training status</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Model Version</span>
                        <Badge variant="secondary">{metrics.modelVersion}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Last Training</span>
                        <span className="text-sm text-muted-foreground">
                          {new Date(metrics.lastTrainingDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Training Data Points</span>
                        <span className="font-medium">{trainingData.length.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Status</span>
                        <div className="flex items-center gap-2">
                          {isTraining ? (
                            <>
                              <Clock className="w-4 h-4 text-orange-500" />
                              <span className="text-orange-600">Training</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-green-600">Ready</span>
                            </>
                          )}
                        </div>
                      </div>

                      {isTraining && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Training Progress</span>
                            <span>{Math.round(trainingProgress)}%</span>
                          </div>
                          <Progress value={trainingProgress} className="h-2" />
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleTrainModel}
                          disabled={isTraining}
                          className="flex-1"
                          variant={isTraining ? "secondary" : "default"}
                        >
                          {isTraining ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Training...
                            </>
                          ) : (
                            <>
                              <Brain className="w-4 h-4 mr-2" />
                              Train Model
                            </>
                          )}
                        </Button>
                        <Button variant="outline" className="bg-transparent">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-primary" />
                        Add Training Data
                      </CardTitle>
                      <CardDescription>Manually add new student outcome data for training</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Interests (comma-separated)</label>
                          <Input
                            placeholder="Technology, Programming"
                            value={newDataEntry.interests}
                            onChange={(e) => setNewDataEntry({ ...newDataEntry, interests: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Skills (name:level)</label>
                          <Input
                            placeholder="Python:4, JavaScript:3"
                            value={newDataEntry.skills}
                            onChange={(e) => setNewDataEntry({ ...newDataEntry, skills: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Education</label>
                          <Input
                            placeholder="B.Tech Computer Science"
                            value={newDataEntry.education}
                            onChange={(e) => setNewDataEntry({ ...newDataEntry, education: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">College</label>
                          <Input
                            placeholder="IIT Delhi"
                            value={newDataEntry.college}
                            onChange={(e) => setNewDataEntry({ ...newDataEntry, college: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Chosen Career</label>
                          <Input
                            placeholder="Software Engineer"
                            value={newDataEntry.chosenCareer}
                            onChange={(e) => setNewDataEntry({ ...newDataEntry, chosenCareer: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Satisfaction (1-10)</label>
                          <Input
                            type="number"
                            min="1"
                            max="10"
                            placeholder="8"
                            value={newDataEntry.satisfaction}
                            onChange={(e) => setNewDataEntry({ ...newDataEntry, satisfaction: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Time to Job (months)</label>
                          <Input
                            type="number"
                            placeholder="6"
                            value={newDataEntry.timeToJob}
                            onChange={(e) => setNewDataEntry({ ...newDataEntry, timeToJob: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Salary</label>
                          <Input
                            placeholder="₹18 LPA"
                            value={newDataEntry.salary}
                            onChange={(e) => setNewDataEntry({ ...newDataEntry, salary: e.target.value })}
                          />
                        </div>
                      </div>

                      <Button onClick={handleAddTrainingData} className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Add Training Data
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Training Data Tab */}
              <TabsContent value="data" className="space-y-6">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-primary" />
                      Training Dataset
                    </CardTitle>
                    <CardDescription>
                      Student profiles and career outcomes used for model training ({trainingData.length} entries)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trainingData.slice(0, 10).map((entry) => (
                        <div key={entry.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="font-semibold mb-2">Student Profile</h3>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="text-muted-foreground">Education:</span>{" "}
                                  {entry.studentProfile.education}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">College:</span> {entry.studentProfile.college}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Interests:</span>{" "}
                                  {entry.studentProfile.interests.join(", ")}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Top Skills:</span>{" "}
                                  {Object.entries(entry.studentProfile.skills)
                                    .slice(0, 3)
                                    .map(([skill, level]) => `${skill} (${level}/5)`)
                                    .join(", ")}
                                </p>
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold mb-2">Career Outcome</h3>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="text-muted-foreground">Career:</span>{" "}
                                  {entry.careerOutcome.chosenCareer}
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Satisfaction:</span>{" "}
                                  {entry.careerOutcome.satisfaction}/10
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Time to Job:</span>{" "}
                                  {entry.careerOutcome.timeToJob} months
                                </p>
                                <p>
                                  <span className="text-muted-foreground">Salary:</span> {entry.careerOutcome.salary}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground">
                              Added: {new Date(entry.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center mt-6">
                      <Button variant="outline" className="bg-transparent">
                        Load More Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Model Performance Trends</CardTitle>
                      <CardDescription>Accuracy and prediction quality over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span>Current Accuracy</span>
                          <span className="font-semibold text-green-600">{metrics.accuracy.toFixed(1)}%</span>
                        </div>
                        <Progress value={metrics.accuracy} className="h-3" />
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center p-3 rounded-lg bg-muted/50">
                            <p className="text-muted-foreground">Precision</p>
                            <p className="font-semibold">89.2%</p>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-muted/50">
                            <p className="text-muted-foreground">Recall</p>
                            <p className="font-semibold">85.7%</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Career Path Distribution</CardTitle>
                      <CardDescription>Most recommended career paths</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { career: "Software Engineer", percentage: 28 },
                          { career: "Data Scientist", percentage: 22 },
                          { career: "Product Manager", percentage: 18 },
                          { career: "UI/UX Designer", percentage: 15 },
                          { career: "Business Analyst", percentage: 17 },
                        ].map((item) => (
                          <div key={item.career} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{item.career}</span>
                              <span>{item.percentage}%</span>
                            </div>
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recent Model Insights</CardTitle>
                    <CardDescription>Key findings from the latest training cycle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-green-700">Improved Accuracy</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Model accuracy increased by 2.3% after incorporating recent college placement data.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          <span className="font-medium text-blue-700">New Patterns</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Identified emerging career paths in AI/ML and sustainable technology sectors.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                          <span className="font-medium text-orange-700">Data Gap</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Need more training data for non-technical career paths to improve recommendations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-primary" />
                      Model Configuration
                    </CardTitle>
                    <CardDescription>Adjust AI model parameters and training settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Learning Rate</label>
                          <Select defaultValue="0.001">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.01">0.01 (High)</SelectItem>
                              <SelectItem value="0.001">0.001 (Medium)</SelectItem>
                              <SelectItem value="0.0001">0.0001 (Low)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Batch Size</label>
                          <Select defaultValue="32">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="16">16</SelectItem>
                              <SelectItem value="32">32</SelectItem>
                              <SelectItem value="64">64</SelectItem>
                              <SelectItem value="128">128</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Training Epochs</label>
                          <Input type="number" defaultValue="100" min="10" max="1000" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Validation Split</label>
                          <Select defaultValue="0.2">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0.1">10%</SelectItem>
                              <SelectItem value="0.2">20%</SelectItem>
                              <SelectItem value="0.3">30%</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-border pt-6">
                      <h3 className="font-semibold mb-4">Data Sources</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">Google Sheets Integration</p>
                            <p className="text-sm text-muted-foreground">College data from external spreadsheet</p>
                          </div>
                          <Badge variant="secondary">Connected</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">Student Assessment Data</p>
                            <p className="text-sm text-muted-foreground">User responses from career assessments</p>
                          </div>
                          <Badge variant="secondary">Active</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">Industry Job Market Data</p>
                            <p className="text-sm text-muted-foreground">External job market trends and salary data</p>
                          </div>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">Save Configuration</Button>
                      <Button variant="outline" className="bg-transparent">
                        Reset to Defaults
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
