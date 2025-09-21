import { NextResponse } from "next/server"
import { fetchCollegeData, getCollegeRecommendations } from "@/lib/college-data"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const interests = searchParams.get("interests")?.split(",") || []
    const location = searchParams.get("location") || undefined
    const recommend = searchParams.get("recommend") === "true"

    const colleges = await fetchCollegeData()

    if (recommend && interests.length > 0) {
      const recommendations = getCollegeRecommendations(interests, location, colleges)
      return NextResponse.json({ colleges: recommendations, total: recommendations.length })
    }

    return NextResponse.json({ colleges, total: colleges.length })
  } catch (error) {
    console.error("Error fetching colleges:", error)
    return NextResponse.json({ error: "Failed to fetch colleges" }, { status: 500 })
  }
}
