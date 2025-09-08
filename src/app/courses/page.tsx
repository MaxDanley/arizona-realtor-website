import Link from 'next/link'
import { Navigation } from '@/components/navigation'
import { 
  FadeInUp, 
  ScaleIn, 
  BounceIn 
} from '@/components/animations'
import { BookOpen, Clock, Users, Award, CheckCircle, ArrowRight } from 'lucide-react'

export default function Courses() {
  const courses = [
    {
      id: 'salesperson',
      title: 'Arizona Real Estate Salesperson License',
      description: 'Complete 90-hour pre-licensing course required for your Arizona Real Estate Salesperson License. Covers all topics required by the Arizona Department of Real Estate.',
      duration: '90 hours',
      price: 299,
      type: 'SALESPERSON_LICENSE',
      features: [
        '90 hours of comprehensive instruction',
        'Interactive quizzes and assessments',
        'Final exam preparation',
        'Certificate of completion',
        '6 months access',
        'Money-back guarantee'
      ],
      popular: true
    },
    {
      id: 'continuing-education',
      title: 'Continuing Education Courses',
      description: 'Maintain your license with our approved continuing education courses. Choose from various topics including ethics, fair housing, and industry updates.',
      duration: '3-6 hours',
      price: 49,
      type: 'CONTINUING_EDUCATION',
      features: [
        'Multiple course options',
        'Flexible scheduling',
        'Automatic reporting to ADRE',
        'Industry updates',
        'Certificate of completion',
        '1 year access'
      ],
      popular: false
    },
    {
      id: 'broker',
      title: 'Arizona Real Estate Broker License',
      description: 'Advance your career with our comprehensive broker licensing course for experienced agents. Covers advanced topics in real estate law and business management.',
      duration: '120 hours',
      price: 399,
      type: 'BROKER_LICENSE',
      features: [
        '120 hours of advanced instruction',
        'Business management training',
        'Legal requirements coverage',
        'Exam preparation materials',
        'Certificate of completion',
        '6 months access'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-teal-800 to-teal-700">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <FadeInUp className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Arizona Real Estate Courses
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto">
              State-approved courses designed to help you succeed in your real estate career. 
              Choose the path that&apos;s right for you.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20 bg-teal-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <ScaleIn key={course.id} delay={index * 0.2}>
                <div
                  className={`bg-white/10 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:bg-white/20 transition-all duration-300 group ${
                    course.popular ? 'ring-2 ring-lime-400' : ''
                  }`}
                >
                  {course.popular && (
                    <div className="bg-lime-400 text-black text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="bg-lime-400 p-2 rounded-lg mr-3 group-hover:scale-110 transition-transform">
                        <BookOpen className="h-6 w-6 text-black" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    </div>
                    
                    <p className="text-teal-200 mb-6">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center text-teal-300">
                        <Clock className="h-5 w-5 mr-1" />
                        <span className="text-sm">{course.duration}</span>
                      </div>
                      <div className="text-3xl font-bold text-white">
                        ${course.price}
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {course.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-lime-400 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-sm text-teal-100">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link
                      href={`/courses/${course.id}`}
                      className={`w-full flex items-center justify-center py-3 px-6 rounded-full font-semibold transition-all duration-300 group-hover:scale-105 ${
                        course.popular
                          ? 'bg-lime-400 hover:bg-lime-500 text-black'
                          : 'border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black'
                      }`}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
                <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Award className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">State Approved</h3>
                <p className="text-teal-200">
                  All courses are approved by the Arizona Department of Real Estate.
                </p>
              </div>
            </BounceIn>

            <BounceIn delay={0.4}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Expert Instructors</h3>
                <p className="text-teal-200">
                  Learn from experienced real estate professionals.
                </p>
              </div>
            </BounceIn>

            <BounceIn delay={0.6}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Flexible Learning</h3>
                <p className="text-teal-200">
                  Study at your own pace with 24/7 access to course materials.
                </p>
              </div>
            </BounceIn>

            <BounceIn delay={0.8}>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300 group">
                <div className="bg-lime-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Money-Back Guarantee</h3>
                <p className="text-teal-200">
                  Not satisfied? Get your money back within 30 days.
                </p>
              </div>
            </BounceIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Your Real Estate Journey?
            </h2>
            <p className="text-xl mb-8 text-teal-100">
              Join thousands of successful real estate professionals who got their start with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started Today
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white hover:bg-white hover:text-teal-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
              >
                Have Questions?
              </Link>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  )
}
