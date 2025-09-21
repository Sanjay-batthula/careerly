"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CareerlyLogo } from "@/components/careerly-logo"
import { FloatingElements } from "@/components/floating-elements"
import { Search, MapPin, Calendar, ExternalLink, Filter, Star, Building } from "lucide-react"
import Link from "next/link"
import { fetchCollegeData, searchColleges, filterCollegesByType, type College } from "@/lib/college-data"

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [filteredColleges, setFilteredColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")

  useEffect(() => {
    const loadColleges = async () => {
      try {
        const data = await fetchCollegeData()
        setColleges(data)
        setFilteredColleges(data)
      } catch (error) {
        console.error("Failed to load college data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadColleges()
  }, [])

  useEffect(() => {
    let filtered = colleges

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchColleges(searchQuery, filtered)
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filterCollegesByType(selectedType as College["type"], filtered)
    }

    setFilteredColleges(filtered)
  }, [searchQuery, selectedType, colleges])

  const collegeTypes = ["Engineering", "Medical", "Arts", "Commerce", "Science", "Management", "Law", "Other"]

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading college data...</p>
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
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/assessment">
              <Button>Take Assessment</Button>
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="relative overflow-hidden">
        <FloatingElements />

        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">College Explorer</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Discover top colleges and universities across India. Get insights into placements, courses, and career
              outcomes.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search colleges by name, location, or type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {collegeTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Summary */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-muted-foreground">
              Showing {filteredColleges.length} of {colleges.length} colleges
              {searchQuery && ` for "${searchQuery}"`}
              {selectedType !== "all" && ` in ${selectedType}`}
            </p>
          </motion.div>

          {/* College Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college, index) => (
              <motion.div
                key={college.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{college.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">#{college.ranking}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{college.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {college.location}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>Est. {college.establishedYear}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-muted-foreground" />
                        <span>{college.affiliation}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Placement Rate</span>
                        <span className="font-semibold text-green-600">{college.placementRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Avg. Package</span>
                        <span className="font-semibold text-blue-600">{college.averagePackage}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Popular Courses</p>
                      <div className="flex flex-wrap gap-1">
                        {college.courses.slice(0, 3).map((course) => (
                          <Badge key={course} variant="outline" className="text-xs">
                            {course}
                          </Badge>
                        ))}
                        {college.courses.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{college.courses.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Top Recruiters</p>
                      <div className="flex flex-wrap gap-1">
                        {college.topRecruiters.slice(0, 2).map((recruiter) => (
                          <Badge key={recruiter} variant="secondary" className="text-xs">
                            {recruiter}
                          </Badge>
                        ))}
                        {college.topRecruiters.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{college.topRecruiters.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/colleges/${college.id}`}>
                          View Details
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Link>
                      </Button>
                      {college.website && (
                        <Button size="sm" variant="outline" className="bg-transparent" asChild>
                          <a href={college.website} target="_blank" rel="noopener noreferrer">
                            Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredColleges.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or filters to find more results.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedType("all")
                }}
                className="bg-transparent"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
