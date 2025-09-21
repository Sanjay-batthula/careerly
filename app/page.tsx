"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedText } from "@/components/animated-text"
import { MarqueeText } from "@/components/marquee-text"
import { ArrowRight, Brain, Target, TrendingUp, Users, Sparkles, Rocket, Globe } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/10">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 w-full z-50 glass-card"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="Careerly Logo" className="h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              How It Works
            </Link>
            <Link href="#insights" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Insights
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hover:bg-primary/10">
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild className="animate-pulse-glow">
              <Link href="/assessment">Get Started</Link>
            </Button>
          </div>
        </div>
      </motion.nav>

      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-bg-hero" />

        <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >

          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-balance leading-tight">
            <AnimatedText text="Shape Your" className="gradient-text" />
            <br />
            <AnimatedText text="Future Career" className="gradient-text" delay={1000} />
          </h1>

          <motion.p
            className="text-xl md:text-2xl text-white text-muted-foreground mb-10 max-w-4xl mx-auto text-balance leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            Discover personalized career paths with AI-powered insights. Map your skills, explore opportunities, and
            prepare for India's evolving job market with intelligent recommendations tailored just for you.
          </motion.p>
        </motion.div>

        {/* Marquee Section */}
        <motion.div
          className="mt-20 py-6 glass-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 0.8 }}
        >
          <MarqueeText
            text="Career Mapping • AI Recommendations • Skill Assessment • Future-Ready • Personalized Learning • Industry Insights • "
            className="text-lg font-medium text-primary"
            speed={30}
          />
        </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 relative">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text">Intelligent Career Guidance</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-balance leading-relaxed">
              Our AI-powered platform combines advanced algorithms with comprehensive career data to provide
              personalized recommendations tailored to your unique profile and aspirations.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Brain,
                title: "AI-Powered Analysis",
                description:
                  "Advanced machine learning algorithms analyze your skills, interests, and aptitudes to provide precise career recommendations",
                color: "from-blue-500/20 to-cyan-500/20",
                image:
                  "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              },
              {
                icon: Target,
                title: "Personalized Roadmaps",
                description:
                  "Get detailed career paths tailored specifically to your unique profile, goals, and learning preferences",
                color: "from-green-500/20 to-emerald-500/20",
                image:
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              },
              {
                icon: TrendingUp,
                title: "Market Intelligence",
                description:
                  "Stay ahead with real-time insights on emerging job roles, salary trends, and industry demands",
                color: "from-purple-500/20 to-pink-500/20",
                image:
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card
                  className={`h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 glass-card neon-border bg-gradient-to-br ${feature.color} overflow-hidden`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Users,
                title: "College Integration",
                description: "Recommendations based on your educational background and institution's placement records",
                color: "text-orange-500",
                bgColor: "from-orange-500/10 to-yellow-500/10",
              },
              {
                icon: Globe,
                title: "Global Opportunities",
                description: "Explore career paths that span across India and international markets",
                color: "text-cyan-500",
                bgColor: "from-cyan-500/10 to-blue-500/10",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 glass-card bg-gradient-to-br ${feature.bgColor}`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-muted/50 flex items-center justify-center flex-shrink-0">
                        <feature.icon className={`w-7 h-7 ${feature.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 bg-gradient-to-br from-primary/5 to-secondary/10 relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text">Your Journey to Success</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto text-balance leading-relaxed">
              Four simple steps to unlock your career potential with AI-powered insights and personalized guidance
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Complete Smart Assessment",
                description:
                  "Take our comprehensive AI-powered assessment that analyzes your skills, interests, personality, and career aspirations",
                image:
                  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              },
              {
                step: "02",
                title: "AI Analysis & Processing",
                description:
                  "Our advanced algorithms process your data against thousands of career paths and market trends to find perfect matches",
                image:
                  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              },
              {
                step: "03",
                title: "Get Personalized Recommendations",
                description:
                  "Receive detailed career suggestions with salary insights, skill requirements, and step-by-step roadmaps",
                image:
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              },
              {
                step: "04",
                title: "Track & Achieve Goals",
                description:
                  "Monitor your progress, update skills, and receive continuous guidance as you advance in your chosen career path",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className={`flex items-center gap-12 mb-16 last:mb-0 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex-1">
                  <div className="glass-card p-8 rounded-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center text-xl font-bold">
                        {item.step}
                      </div>
                      <h3 className="text-2xl font-bold">{item.title}</h3>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-64 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-primary/90" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-primary-foreground"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-balance">Ready to Shape Your Future?</h2>
            <p className="text-xl mb-10 opacity-90 text-balance leading-relaxed">
              Join thousands of students who have discovered their perfect career path with Careerly's AI-powered
              guidance. Your dream career is just one assessment away.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-12 py-8 animate-pulse-glow text-primary"
              asChild
            >
              <Link href="/assessment">
                Start Your Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 glass-card">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <img src="/logo.png" alt="Careerly Logo" className="h-10 w-auto" />
            <div className="flex items-center gap-8 mt-6 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Terms of Service
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
