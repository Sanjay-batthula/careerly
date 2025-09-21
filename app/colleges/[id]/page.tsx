"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CareerlyLogo } from "@/components/careerly-logo"
import { FloatingElements } from "@/components/floating-elements"
import {
  MapPin,
  Calendar,
  Building,
  ExternalLink,
  Star,
  TrendingUp,
  BookOpen,
  Briefcase,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { mockCollegeData, getCollegeCareerOutcomes, type College } from "@/lib/college-data"
import { useParams } from "next/navigation"

export default function CollegeDetailPage() {
  const params = useParams()
  const collegeId = params.id as string
  const [college, setCollege] = useState<College | null>(null)
  const [careerOutcomes, setCareerOutcomes] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In production, this would fetch from API
    const foundCollege = mockCollegeData.find((c) => c.id === collegeId)
    if (foundCollege) {
      setCollege(foundCollege)
      setCareerOutcomes(getCollegeCareerOutcomes(collegeId))
    }
    setLoading(false)
  }, [collegeId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading college details...</p>
        </div>
      </div>
    )
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">College Not Found</h1>
          <Link href="/colleges">
            <Button>Back to Colleges</Button>
          </Link>
        </div>
      </div>
    )
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
            <CareerlyLogo size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/colleges">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Colleges
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="relative overflow-hidden">
        <FloatingElements />

        <div className="container mx-auto px-4 py-8">
          {/* College Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="text-sm">
                        {college.type}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">Rank #{college.ranking}</span>
                      </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{college.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{college.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Established {college.establishedYear}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span>{college.affiliation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:text-right">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                      <div className="text-center lg:text-right p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Placement Rate</p>
                        <p className="text-2xl font-bold text-green-600">{college.placementRate}%</p>
                      </div>
                      <div className="text-center lg:text-right p-4 rounded-lg bg-muted/50">
                        <p className="text-sm text-muted-foreground">Avg. Package</p>
                        <p className="text-2xl font-bold text-blue-600">{college.averagePackage}</p>
                      </div>
                    </div>
                    {college.website && (
                      <Button className="mt-4 w-full lg:w-auto" asChild>
                        <a href={college.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Information Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="placements">Placements</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Academic Excellence
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>National Ranking</span>
                        <Badge variant="secondary">#{college.ranking}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Establishment Year</span>
                        <span className="font-medium">{college.establishedYear}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Affiliation</span>
                        <span className="font-medium">{college.affiliation}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>College Type</span>
                        <Badge variant="outline">{college.type}</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {careerOutcomes && (
                    <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-primary" />
                          Career Outcomes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Top Career Paths</p>
                          <div className="space-y-1">
                            {careerOutcomes.topCareerPaths.slice(0, 4).map((path: string) => (
                              <div key={path} className="text-sm">
                                • {path}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Industry Distribution</p>
                          <div className="space-y-2">
                            {careerOutcomes.industryDistribution.map((item: any) => (
                              <div key={item.industry} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>{item.industry}</span>
                                  <span>{item.percentage}%</span>
                                </div>
                                <Progress value={item.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Available Courses</CardTitle>
                    <CardDescription>Programs offered by {college.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {college.courses.map((course) => (
                        <div key={course} className="p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors">
                          <h3 className="font-semibold">{course}</h3>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Placements Tab */}
              <TabsContent value="placements" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        Placement Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
                        <p className="text-3xl font-bold text-green-600 mb-2">{college.placementRate}%</p>
                        <p className="text-sm text-muted-foreground">Placement Rate</p>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                        <p className="text-3xl font-bold text-blue-600 mb-2">{college.averagePackage}</p>
                        <p className="text-sm text-muted-foreground">Average Package</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Top Recruiters</CardTitle>
                      <CardDescription>Companies that regularly hire from {college.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {college.topRecruiters.map((recruiter) => (
                          <div
                            key={recruiter}
                            className="p-3 rounded-lg bg-muted/50 text-center hover:bg-muted/80 transition-colors"
                          >
                            <span className="font-medium">{recruiter}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {careerOutcomes && careerOutcomes.averageSalaryByField.length > 0 && (
                  <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle>Average Salary by Field</CardTitle>
                      <CardDescription>Compensation ranges for different career paths</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {careerOutcomes.averageSalaryByField.map((item: any) => (
                          <div
                            key={item.field}
                            className="flex justify-between items-center p-4 rounded-lg bg-muted/50"
                          >
                            <span className="font-medium">{item.field}</span>
                            <span className="text-green-600 font-semibold">{item.salary}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Facilities Tab */}
              <TabsContent value="facilities">
                <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Campus Facilities</CardTitle>
                    <CardDescription>Infrastructure and amenities available at {college.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {college.facilities.map((facility) => (
                        <div
                          key={facility}
                          className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <Building className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium">{facility}</span>
                        </div>
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
