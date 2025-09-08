import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { 
  FadeInUp, 
  SlideInLeft, 
  SlideInRight, 
  ScaleIn, 
  BounceIn, 
  FloatingCard 
} from '@/components/animations'
import { 
  BookOpen, 
  Users, 
  Award, 
  Star,
  ArrowRight,
  PlayCircle,
  GraduationCap,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          {/* Wireframe Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
          </div>
          {/* Dot Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <SlideInLeft className="space-y-8">
              <div className="space-y-4">
                <FadeInUp delay={0.2}>
                  <p className="text-lime-400 text-lg font-medium">Your Real Estate Learning Partner</p>
                </FadeInUp>
                
                <FadeInUp delay={0.4}>
                  <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                    Learn, Grow, and Achieve with{' '}
                    <span className="text-lime-400">Expert Guidance</span>
                  </h1>
                </FadeInUp>
                
                <FadeInUp delay={0.6}>
                  <p className="text-xl text-teal-100 max-w-2xl">
                    Access high-quality Arizona real estate courses anytime, anywhere, and take control of your licensing journey with ease.
                  </p>
                </FadeInUp>
              </div>

              <FadeInUp delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/auth/signup"
                    className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
                  >
                    Get Started Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <Link
                    href="/courses"
                    className="border-2 border-white hover:bg-white hover:text-teal-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center justify-center group"
                  >
                    <PlayCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    View Courses
                  </Link>
                </div>
              </FadeInUp>

              {/* Student Review Section */}
              <FadeInUp delay={1.0}>
                <div className="flex items-center space-x-4 pt-8">
                  <div className="flex -space-x-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white font-bold">
                      A
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-2 border-white flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-red-500 border-2 border-white flex items-center justify-center text-white font-bold">
                      M
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-white font-bold text-lg ml-1">4.8</span>
                    </div>
                    <div className="text-white">
                      <p className="font-medium">Student Review</p>
                      <p className="text-sm text-teal-200">Based on more than 1,000 feedbacks</p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </SlideInLeft>

            {/* Right Side - Visuals and Statistics */}
            <SlideInRight className="relative">
              {/* Main Student Image Placeholder */}
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <GraduationCap className="h-24 w-24 mx-auto mb-4 text-lime-400" />
                    <p className="text-xl font-semibold">Professional Real Estate Education</p>
                    <p className="text-teal-200 mt-2">State-approved courses for Arizona</p>
                  </div>
                </div>
                
                {/* Floating Statistics Cards */}
                <FloatingCard delay={1.2} className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-lime-400 p-2 rounded-lg">
                      <BookOpen className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-teal-900">50+</p>
                      <p className="text-sm text-teal-700">Total Courses</p>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard delay={1.4} className="absolute top-1/2 -right-8 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-lime-400 p-2 rounded-lg">
                      <Users className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-teal-900">25+</p>
                      <p className="text-sm text-teal-700">Expert Instructors</p>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard delay={1.6} className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
                  <div className="flex items-center space-x-3">
                    <div className="bg-lime-400 p-2 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-black" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-teal-900">5,000+</p>
                      <p className="text-sm text-teal-700">Total Students</p>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-teal-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Arizona Real Estate Academy?
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              We&apos;re committed to providing the best real estate education experience in Arizona.
            </p>
          </FadeInUp>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <BounceIn delay={0.2}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">State Approved</h3>
                <p className="text-teal-200">
                  All courses are approved by the Arizona Department of Real Estate.
                </p>
              </div>
            </BounceIn>

            <BounceIn delay={0.4}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Expert Instructors</h3>
                <p className="text-teal-200">
                  Learn from experienced real estate professionals.
                </p>
              </div>
            </BounceIn>

            <BounceIn delay={0.6}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Flexible Learning</h3>
                <p className="text-teal-200">
                  Study at your own pace with 24/7 access to course materials.
                </p>
              </div>
            </BounceIn>

            <BounceIn delay={0.8}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Money-Back Guarantee</h3>
                <p className="text-teal-200">
                  Not satisfied? Get your money back within 30 days.
                </p>
              </div>
            </BounceIn>
          </div>
        </div>
      </section>

      {/* Course Types Section */}
      <section className="py-20 bg-teal-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              Whether you&apos;re starting your real estate career or maintaining your license, we have the right course for you.
            </p>
          </FadeInUp>

          <div className="grid md:grid-cols-3 gap-8">
            <ScaleIn delay={0.2}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-10 w-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Salesperson License</h3>
                <p className="text-teal-200 mb-6">
                  Complete 90-hour pre-licensing course required for your Arizona Real Estate Salesperson License.
                </p>
                <ul className="text-left mb-6 space-y-2 text-teal-100">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    90 hours of instruction
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Interactive quizzes
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Final exam preparation
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Certificate of completion
                  </li>
                </ul>
                <Link
                  href="/courses/salesperson"
                  className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-block group-hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.4}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group border-2 border-lime-400">
                <div className="bg-lime-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award className="h-10 w-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Continuing Education</h3>
                <p className="text-teal-200 mb-6">
                  Maintain your license with our approved continuing education courses. Choose from various topics.
                </p>
                <ul className="text-left mb-6 space-y-2 text-teal-100">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Flexible scheduling
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Multiple course options
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Industry updates
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Automatic reporting
                  </li>
                </ul>
                <Link
                  href="/courses/continuing-education"
                  className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-block group-hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </ScaleIn>

            <ScaleIn delay={0.6}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-10 w-10 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Broker License</h3>
                <p className="text-teal-200 mb-6">
                  Advance your career with our comprehensive broker licensing course for experienced agents.
                </p>
                <ul className="text-left mb-6 space-y-2 text-teal-100">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Advanced curriculum
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Business management
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Legal requirements
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-lime-400 rounded-full mr-3"></div>
                    Exam preparation
                  </li>
                </ul>
                <Link
                  href="/courses/broker"
                  className="bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-block group-hover:scale-105"
                >
                  Learn More
                </Link>
              </div>
            </ScaleIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Real Estate Career?
            </h2>
            <p className="text-xl mb-8 text-teal-100">
              Join thousands of successful real estate professionals who got their start with Arizona Real Estate Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Enroll Now - Start Today
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white hover:bg-white hover:text-teal-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Have Questions? Contact Us
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <FadeInUp delay={0.2}>
              <div>
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-lime-400" />
                  <span className="ml-2 text-xl font-bold">Arizona Real Estate Academy</span>
                </div>
                <p className="text-teal-200">
                  Your trusted partner for Arizona real estate licensing and continuing education.
                </p>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.4}>
              <div>
                <h3 className="text-lg font-semibold mb-4">Courses</h3>
                <ul className="space-y-2 text-teal-200">
                  <li><Link href="/courses/salesperson" className="hover:text-lime-400 transition-colors">Salesperson License</Link></li>
                  <li><Link href="/courses/continuing-education" className="hover:text-lime-400 transition-colors">Continuing Education</Link></li>
                  <li><Link href="/courses/broker" className="hover:text-lime-400 transition-colors">Broker License</Link></li>
                </ul>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.6}>
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-teal-200">
                  <li><Link href="/contact" className="hover:text-lime-400 transition-colors">Contact Us</Link></li>
                  <li><Link href="/faq" className="hover:text-lime-400 transition-colors">FAQ</Link></li>
                  <li><Link href="/support" className="hover:text-lime-400 transition-colors">Help Center</Link></li>
                </ul>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.8}>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-teal-200">
                  <li><Link href="/privacy" className="hover:text-lime-400 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-lime-400 transition-colors">Terms of Service</Link></li>
                  <li><Link href="/refund" className="hover:text-lime-400 transition-colors">Refund Policy</Link></li>
                </ul>
              </div>
            </FadeInUp>
          </div>
          <div className="border-t border-teal-800 mt-8 pt-8 text-center text-teal-200">
            <p>&copy; 2024 Arizona Real Estate Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}