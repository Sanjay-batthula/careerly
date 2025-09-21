"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Star,
  Clock,
  Award,
  ChevronRight,
  ExternalLink,
  Download,
  Bell,
  Settings,
} from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from AI analysis
const mockUserData = {
  name: "Priya Sharma",
  completionDate: "2024-01-15",
  overallMatch: 92,
  topCareerPaths: [
    {
      title: "AI/ML Engineer",
      match: 95,
      description: "Design and develop machine learning models and AI systems",
      skills: ["Python", "TensorFlow", "Data Analysis", "Mathematics"],
      averageSalary: "₹12-25 LPA",
      growth: "High",
      demandLevel: "Very High",
      timeToEntry: "6-12 months",
      learningPath: [
        "Complete Python fundamentals",
        "Learn machine learning basics",
        "Build portfolio projects",
        "Get certified in cloud platforms",
      ],
    },
    {
      title: "Data Scientist",
      match: 88,
      description: "Extract insights from data to drive business decisions",
      skills: ["Python", "Statistics", "SQL", "Data Visualization"],
      averageSalary: "₹8-20 LPA",
      growth: "High",
      demandLevel: "High",
      timeToEntry: "4-8 months",
      learningPath: [
        "Master statistical analysis",
        "Learn data visualization tools",
        "Practice with real datasets",
        "Build data science portfolio",
      ],
    },
    {
      title: "Product Manager",
      match: 82,
      description: "Lead product development and strategy",
      skills: ["Leadership", "Analytics", "Communication", "Strategy"],
      averageSalary: "₹15-35 LPA",
      growth: "Very High",
      demandLevel: "High",
      timeToEntry: "8-18 months",
      learningPath: [
        "Develop business acumen",
        "Learn product management frameworks",
        "Build leadership skills",
        "Get PM certification",
      ],
    },
  ],
  skillGaps: [
    { skill: "Cloud Computing", currentLevel: 2, requiredLevel: 4, priority: "High" },
    { skill: "Advanced Statistics", currentLevel: 3, requiredLevel: 5, priority: "Medium" },
    { skill: "Project Management", currentLevel: 2, requiredLevel: 4, priority: "Medium" },
  ],
  recommendedCourses: [
    {
      title: "AWS Machine Learning Specialty",
      provider: "Amazon Web Services",
      duration: "40 hours",
      rating: 4.8,
      price: "₹15,000",
    },
    {
      title: "Advanced Statistics for Data Science",
      provider: "Coursera",
      duration: "60 hours",
      rating: 4.7,
      price: "₹8,000",
    },
    {
      title: "Product Management Fundamentals",
      provider: "Udemy",
      duration: "25 hours",
      rating: 4.6,
      price: "₹3,500",
    },
  ],
  industryInsights: [
    {
      title: "AI/ML Job Market Growing 40% YoY",
      description: "Demand for AI professionals continues to surge across industries",
      date: "2024-01-10",
    },
    {
      title: "Remote Work Opportunities Increasing",
      description: "70% of tech companies now offer remote positions",
      date: "2024-01-08",
    },
    {
      title: "New Certification Programs Launched",
      description: "Google and Microsoft announce new AI certification tracks",
      date: "2024-01-05",
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium">{mockUserData.name}</p>
                <p className="text-xs text-muted-foreground">Assessment completed</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                P
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative overflow-hidden">

        <div className="container mx-auto px-4 py-8">
          {/* Welcome Section */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="gradient-text">{mockUserData.name}</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Your personalized career insights are ready. Let's explore your path to success.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Match</p>
                    <p className="text-2xl font-bold gradient-text">{mockUserData.overallMatch}%</p>
                  </div>
                  <Target className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Career Paths</p>
                    <p className="text-2xl font-bold text-green-600">{mockUserData.topCareerPaths.length}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Skill Gaps</p>
                    <p className="text-2xl font-bold text-orange-600">{mockUserData.skillGaps.length}</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Courses</p>
                    <p className="text-2xl font-bold text-purple-600">{mockUserData.recommendedCourses.length}</p>
                  </div>
                  <Award className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="careers">Career Paths</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="learning">Learning</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Top Career Recommendations */}
                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-primary" />
                        Top Career Matches
                      </CardTitle>
                      <CardDescription>AI-powered recommendations based on your profile</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockUserData.topCareerPaths.slice(0, 3).map((career, index) => (
                        <motion.div
                          key={career.title}
                          className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold">{career.title}</h3>
                            <p className="text-sm text-muted-foreground">{career.averageSalary}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">{career.match}% match</Badge>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Skill Development */}
                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        Priority Skills
                      </CardTitle>
                      <CardDescription>Focus areas for career advancement</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {mockUserData.skillGaps.map((gap, index) => (
                        <motion.div
                          key={gap.skill}
                          className="space-y-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{gap.skill}</span>
                            <Badge variant={gap.priority === "High" ? "destructive" : "secondary"}>
                              {gap.priority}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Current: {gap.currentLevel}/5</span>
                              <span>Target: {gap.requiredLevel}/5</span>
                            </div>
                            <Progress value={(gap.currentLevel / gap.requiredLevel) * 100} className="h-2" />
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Industry Insights */}
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      Industry Insights
                    </CardTitle>
                    <CardDescription>Latest trends and opportunities in your field</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      {mockUserData.industryInsights.map((insight, index) => (
                        <motion.div
                          key={insight.title}
                          className="p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <h3 className="font-semibold mb-2">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                          <p className="text-xs text-muted-foreground">{insight.date}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Career Paths Tab */}
              <TabsContent value="careers" className="space-y-6">
                <div className="grid gap-6">
                  {mockUserData.topCareerPaths.map((career, index) => (
                    <motion.div
                      key={career.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl">{career.title}</CardTitle>
                              <CardDescription className="mt-2">{career.description}</CardDescription>
                            </div>
                            <Badge variant="secondary" className="text-lg px-3 py-1">
                              {career.match}% match
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground">Average Salary</p>
                              <p className="font-semibold text-green-600">{career.averageSalary}</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground">Growth</p>
                              <p className="font-semibold text-blue-600">{career.growth}</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground">Demand</p>
                              <p className="font-semibold text-purple-600">{career.demandLevel}</p>
                            </div>
                            <div className="text-center p-4 rounded-lg bg-muted/50">
                              <p className="text-sm text-muted-foreground">Time to Entry</p>
                              <p className="font-semibold text-orange-600">{career.timeToEntry}</p>
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3">Required Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              {career.skills.map((skill) => (
                                <Badge key={skill} variant="outline">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3">Learning Path</h3>
                            <div className="space-y-2">
                              {career.learningPath.map((step, stepIndex) => (
                                <div key={stepIndex} className="flex items-center gap-3">
                                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                                    {stepIndex + 1}
                                  </div>
                                  <p className="text-sm">{step}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button className="flex-1">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Explore Jobs
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              <Download className="w-4 h-4 mr-2" />
                              Download Roadmap
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {/* Skills Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Skill Development Plan</CardTitle>
                    <CardDescription>Prioritized skills to advance your career</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {mockUserData.skillGaps.map((gap, index) => (
                      <motion.div
                        key={gap.skill}
                        className="p-6 rounded-lg bg-muted/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{gap.skill}</h3>
                          <Badge variant={gap.priority === "High" ? "destructive" : "secondary"}>
                            {gap.priority} Priority
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Current Level: {gap.currentLevel}/5</span>
                            <span>Target Level: {gap.requiredLevel}/5</span>
                          </div>
                          <Progress value={(gap.currentLevel / 5) * 100} className="h-3" />
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Gap: {gap.requiredLevel - gap.currentLevel} levels</span>
                            <span>Est. Time: {gap.priority === "High" ? "2-3 months" : "1-2 months"}</span>
                          </div>
                        </div>
                        <Button className="mt-4 w-full bg-transparent" variant="outline">
                          View Learning Resources
                        </Button>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Learning Tab */}
              <TabsContent value="learning" className="space-y-6">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Recommended Courses</CardTitle>
                    <CardDescription>Curated learning paths to bridge your skill gaps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {mockUserData.recommendedCourses.map((course, index) => (
                        <motion.div
                          key={course.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <CardHeader>
                              <CardTitle className="text-lg">{course.title}</CardTitle>
                              <CardDescription>{course.provider}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {course.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  {course.rating}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-semibold text-green-600">{course.price}</span>
                                <Button size="sm">
                                  <ExternalLink className="w-4 h-4 mr-2" />
                                  Enroll
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
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
