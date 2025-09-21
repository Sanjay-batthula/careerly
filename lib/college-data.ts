// College data integration for Careerly platform
// This would typically connect to the Google Sheets API or a database

export interface College {
  id: string
  name: string
  location: string
  type: "Engineering" | "Medical" | "Arts" | "Commerce" | "Science" | "Management" | "Law" | "Other"
  ranking: number
  establishedYear: number
  affiliation: string
  courses: string[]
  placementRate: number
  averagePackage: string
  topRecruiters: string[]
  facilities: string[]
  website?: string
}

// Mock college data - in production this would be fetched from Google Sheets
export const mockCollegeData: College[] = [
  {
    id: "iit-delhi",
    name: "Indian Institute of Technology Delhi",
    location: "New Delhi",
    type: "Engineering",
    ranking: 1,
    establishedYear: 1961,
    affiliation: "Autonomous",
    courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering"],
    placementRate: 95,
    averagePackage: "₹25 LPA",
    topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs"],
    facilities: ["Library", "Hostels", "Sports Complex", "Research Labs"],
    website: "https://home.iitd.ac.in/",
  },
  {
    id: "iit-bombay",
    name: "Indian Institute of Technology Bombay",
    location: "Mumbai, Maharashtra",
    type: "Engineering",
    ranking: 2,
    establishedYear: 1958,
    affiliation: "Autonomous",
    courses: ["Computer Science", "Electrical Engineering", "Aerospace Engineering", "Chemical Engineering"],
    placementRate: 94,
    averagePackage: "₹23 LPA",
    topRecruiters: ["Microsoft", "Google", "JP Morgan", "Qualcomm"],
    facilities: ["Central Library", "Hostels", "Sports Facilities", "Innovation Labs"],
    website: "https://www.iitb.ac.in/",
  },
  {
    id: "aiims-delhi",
    name: "All India Institute of Medical Sciences Delhi",
    location: "New Delhi",
    type: "Medical",
    ranking: 1,
    establishedYear: 1956,
    affiliation: "Autonomous",
    courses: ["MBBS", "MD", "MS", "DM", "MCh"],
    placementRate: 100,
    averagePackage: "₹15 LPA",
    topRecruiters: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Government Hospitals"],
    facilities: ["Hospital", "Library", "Hostels", "Research Centers"],
    website: "https://www.aiims.edu/",
  },
  {
    id: "du-delhi",
    name: "University of Delhi",
    location: "New Delhi",
    type: "Arts",
    ranking: 3,
    establishedYear: 1922,
    affiliation: "Central University",
    courses: ["Economics", "Political Science", "English", "History", "Psychology"],
    placementRate: 75,
    averagePackage: "₹8 LPA",
    topRecruiters: ["Deloitte", "EY", "KPMG", "TCS", "Infosys"],
    facilities: ["Central Library", "Sports Complex", "Cultural Centers", "Research Facilities"],
    website: "https://www.du.ac.in/",
  },
  {
    id: "iim-ahmedabad",
    name: "Indian Institute of Management Ahmedabad",
    location: "Ahmedabad, Gujarat",
    type: "Management",
    ranking: 1,
    establishedYear: 1961,
    affiliation: "Autonomous",
    courses: ["MBA", "Executive MBA", "Fellow Programme", "Management Development"],
    placementRate: 100,
    averagePackage: "₹35 LPA",
    topRecruiters: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan"],
    facilities: ["Library", "Hostels", "Sports Facilities", "Case Study Rooms"],
    website: "https://www.iima.ac.in/",
  },
]

// Function to fetch college data (would integrate with Google Sheets API)
export async function fetchCollegeData(): Promise<College[]> {
  // In production, this would make an API call to Google Sheets
  // For now, returning mock data
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCollegeData), 1000)
  })
}

// Function to search colleges by name or location
export function searchColleges(query: string, colleges: College[]): College[] {
  const lowercaseQuery = query.toLowerCase()
  return colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(lowercaseQuery) ||
      college.location.toLowerCase().includes(lowercaseQuery) ||
      college.type.toLowerCase().includes(lowercaseQuery),
  )
}

// Function to filter colleges by type
export function filterCollegesByType(type: College["type"], colleges: College[]): College[] {
  return colleges.filter((college) => college.type === type)
}

// Function to get college recommendations based on user profile
export function getCollegeRecommendations(
  userInterests: string[],
  userLocation?: string,
  colleges: College[] = mockCollegeData,
): College[] {
  // Simple recommendation algorithm - in production this would be more sophisticated
  const scored = colleges.map((college) => {
    let score = 0

    // Score based on course relevance to interests
    const relevantCourses = college.courses.filter((course) =>
      userInterests.some((interest) => course.toLowerCase().includes(interest.toLowerCase())),
    )
    score += relevantCourses.length * 10

    // Bonus for location preference
    if (userLocation && college.location.toLowerCase().includes(userLocation.toLowerCase())) {
      score += 5
    }

    // Factor in ranking (higher ranking = higher score)
    score += (100 - college.ranking) / 10

    // Factor in placement rate
    score += college.placementRate / 10

    return { ...college, score }
  })

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ score, ...college }) => college)
}

// Function to get career outcomes for a specific college
export function getCollegeCareerOutcomes(collegeId: string): {
  topCareerPaths: string[]
  industryDistribution: { industry: string; percentage: number }[]
  averageSalaryByField: { field: string; salary: string }[]
} {
  // Mock data - in production this would come from analytics
  const outcomes = {
    "iit-delhi": {
      topCareerPaths: ["Software Engineer", "Data Scientist", "Product Manager", "Research Scientist"],
      industryDistribution: [
        { industry: "Technology", percentage: 45 },
        { industry: "Finance", percentage: 25 },
        { industry: "Consulting", percentage: 15 },
        { industry: "Research", percentage: 15 },
      ],
      averageSalaryByField: [
        { field: "Software Engineering", salary: "₹28 LPA" },
        { field: "Data Science", salary: "₹25 LPA" },
        { field: "Product Management", salary: "₹30 LPA" },
        { field: "Research", salary: "₹20 LPA" },
      ],
    },
    "aiims-delhi": {
      topCareerPaths: ["Doctor", "Medical Researcher", "Healthcare Administrator", "Public Health Specialist"],
      industryDistribution: [
        { industry: "Healthcare", percentage: 70 },
        { industry: "Research", percentage: 20 },
        { industry: "Public Health", percentage: 10 },
      ],
      averageSalaryByField: [
        { field: "Clinical Practice", salary: "₹18 LPA" },
        { field: "Medical Research", salary: "₹15 LPA" },
        { field: "Healthcare Administration", salary: "₹22 LPA" },
      ],
    },
  }

  return (
    outcomes[collegeId as keyof typeof outcomes] || {
      topCareerPaths: [],
      industryDistribution: [],
      averageSalaryByField: [],
    }
  )
}
