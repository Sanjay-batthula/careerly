"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CareerlyLogo } from "@/components/careerly-logo"
import { FloatingElements } from "@/components/floating-elements"
import { ChevronLeft, ChevronRight, Brain, Target, BookOpen, Lightbulb } from "lucide-react"
import Link from "next/link"

interface AssessmentData {
  personalInfo: {
    name: string
    age: string
    education: string
    college: string
    field: string
  }
  interests: string[]
  skills: Record<string, number>
  preferences: {
    workEnvironment: string
    careerGoals: string
    timeCommitment: string
  }
  experience: string
}

const assessmentSteps = [
  {
    id: "personal",
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: Target,
  },
  {
    id: "interests",
    title: "Interests & Passions",
    description: "What excites you?",
    icon: Lightbulb,
  },
  {
    id: "skills",
    title: "Skills Assessment",
    description: "Rate your abilities",
    icon: Brain,
  },
  {
    id: "preferences",
    title: "Career Preferences",
    description: "Your ideal work environment",
    icon: BookOpen,
  },
]

const interestOptions = [
  "Technology & Programming",
  "Creative Arts & Design",
  "Business & Entrepreneurship",
  "Healthcare & Medicine",
  "Education & Teaching",
  "Engineering & Manufacturing",
  "Finance & Banking",
  "Marketing & Communications",
  "Research & Development",
  "Social Work & NGO",
  "Government & Public Service",
  "Sports & Fitness",
]

const skillCategories = [
  { name: "Programming", skills: ["Python", "JavaScript", "Java", "C++"] },
  { name: "Design", skills: ["UI/UX Design", "Graphic Design", "Video Editing", "3D Modeling"] },
  { name: "Business", skills: ["Leadership", "Project Management", "Sales", "Marketing"] },
  { name: "Communication", skills: ["Public Speaking", "Writing", "Languages", "Presentation"] },
  { name: "Analytical", skills: ["Data Analysis", "Problem Solving", "Research", "Critical Thinking"] },
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    personalInfo: {
      name: "",
      age: "",
      education: "",
      college: "",
      field: "",
    },
    interests: [],
    skills: {},
    preferences: {
      workEnvironment: "",
      careerGoals: "",
      timeCommitment: "",
    },
    experience: "",
  })

  const progress = ((currentStep + 1) / assessmentSteps.length) * 100

  const handleNext = () => {
    if (currentStep < assessmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit assessment
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here we would normally send data to AI for analysis
    console.log("Assessment Data:", assessmentData)
    // Redirect to results/dashboard
    window.location.href = "/dashboard"
  }

  const updatePersonalInfo = (field: string, value: string) => {
    setAssessmentData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const toggleInterest = (interest: string) => {
    setAssessmentData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const updateSkill = (skill: string, rating: number) => {
    setAssessmentData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [skill]: rating },
    }))
  }

  const updatePreference = (field: string, value: string) => {
    setAssessmentData((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value },
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="border-b border-border bg-background/80 backdrop-blur-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <CareerlyLogo size="sm" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {assessmentSteps.length}
            </span>
            <div className="w-32">
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="relative overflow-hidden">
        <FloatingElements />

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Step Indicator */}
            <motion.div
              className="flex items-center justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4">
                {assessmentSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="w-5 h-5" />
                    </div>
                    {index < assessmentSteps.length - 1 && (
                      <div
                        className={`w-16 h-1 mx-2 transition-all duration-300 ${
                          index < currentStep ? "bg-primary" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Assessment Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-0 shadow-xl bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-3xl font-bold gradient-text">
                      {assessmentSteps[currentStep].title}
                    </CardTitle>
                    <CardDescription className="text-lg">{assessmentSteps[currentStep].description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-8">
                    {/* Personal Information Step */}
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              placeholder="Enter your full name"
                              value={assessmentData.personalInfo.name}
                              onChange={(e) => updatePersonalInfo("name", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="age">Age</Label>
                            <Input
                              id="age"
                              type="number"
                              placeholder="Your age"
                              value={assessmentData.personalInfo.age}
                              onChange={(e) => updatePersonalInfo("age", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="education">Education Level</Label>
                          <Select onValueChange={(value) => updatePersonalInfo("education", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your education level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high-school">High School</SelectItem>
                              <SelectItem value="undergraduate">Undergraduate</SelectItem>
                              <SelectItem value="postgraduate">Postgraduate</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="college">College/University</Label>
                            <Input
                              id="college"
                              placeholder="Your institution name"
                              value={assessmentData.personalInfo.college}
                              onChange={(e) => updatePersonalInfo("college", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="field">Field of Study</Label>
                            <Input
                              id="field"
                              placeholder="Your major/specialization"
                              value={assessmentData.personalInfo.field}
                              onChange={(e) => updatePersonalInfo("field", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Interests Step */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <p className="text-center text-muted-foreground">
                          Select all areas that interest you (choose at least 3)
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {interestOptions.map((interest) => (
                            <motion.div
                              key={interest}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                assessmentData.interests.includes(interest)
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => toggleInterest(interest)}
                            >
                              <div className="text-center">
                                <h3 className="font-medium">{interest}</h3>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Skills Step */}
                    {currentStep === 2 && (
                      <div className="space-y-8">
                        <p className="text-center text-muted-foreground">
                          Rate your proficiency in these skills (1 = Beginner, 5 = Expert)
                        </p>
                        {skillCategories.map((category) => (
                          <div key={category.name} className="space-y-4">
                            <h3 className="text-xl font-semibold">{category.name}</h3>
                            <div className="grid gap-4">
                              {category.skills.map((skill) => (
                                <div key={skill} className="flex items-center justify-between">
                                  <Label className="text-base">{skill}</Label>
                                  <RadioGroup
                                    value={assessmentData.skills[skill]?.toString() || "0"}
                                    onValueChange={(value) => updateSkill(skill, Number.parseInt(value))}
                                    className="flex gap-2"
                                  >
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                      <div key={rating} className="flex items-center space-x-1">
                                        <RadioGroupItem value={rating.toString()} id={`${skill}-${rating}`} />
                                        <Label htmlFor={`${skill}-${rating}`} className="text-sm">
                                          {rating}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Preferences Step */}
                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <Label className="text-lg font-medium">Preferred Work Environment</Label>
                          <RadioGroup
                            value={assessmentData.preferences.workEnvironment}
                            onValueChange={(value) => updatePreference("workEnvironment", value)}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="office" id="office" />
                              <Label htmlFor="office">Traditional Office</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="remote" id="remote" />
                              <Label htmlFor="remote">Remote Work</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="hybrid" id="hybrid" />
                              <Label htmlFor="hybrid">Hybrid (Office + Remote)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="startup" id="startup" />
                              <Label htmlFor="startup">Startup Environment</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="goals" className="text-lg font-medium">
                            Career Goals (Optional)
                          </Label>
                          <Textarea
                            id="goals"
                            placeholder="Describe your career aspirations and goals..."
                            value={assessmentData.preferences.careerGoals}
                            onChange={(e) => updatePreference("careerGoals", e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div className="space-y-4">
                          <Label className="text-lg font-medium">Time Commitment for Skill Development</Label>
                          <RadioGroup
                            value={assessmentData.preferences.timeCommitment}
                            onValueChange={(value) => updatePreference("timeCommitment", value)}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="minimal" id="minimal" />
                              <Label htmlFor="minimal">1-2 hours per week</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="moderate" id="moderate" />
                              <Label htmlFor="moderate">3-5 hours per week</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="intensive" id="intensive" />
                              <Label htmlFor="intensive">6+ hours per week</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              className="flex items-center justify-between mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <Button onClick={handleNext} className="flex items-center gap-2 animate-glow">
                {currentStep === assessmentSteps.length - 1 ? "Complete Assessment" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
