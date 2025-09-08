import Link from 'next/link'
import { Navigation } from '@/components/navigation'
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
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Arizona Real Estate Courses
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              State-approved courses designed to help you succeed in your real estate career. 
              Choose the path that's right for you.
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                  course.popular ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                {course.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-5 w-5 mr-1" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      ${course.price}
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href={`/courses/${course.id}`}
                    className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-colors ${
                      course.popular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Arizona Real Estate Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best real estate education experience in Arizona.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">State Approved</h3>
              <p className="text-gray-600">
                All courses are approved by the Arizona Department of Real Estate.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from experienced real estate professionals.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Flexible Learning</h3>
              <p className="text-gray-600">
                Study at your own pace with 24/7 access to course materials.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Money-Back Guarantee</h3>
              <p className="text-gray-600">
                Not satisfied? Get your money back within 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Real Estate Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of successful real estate professionals who got their start with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Have Questions?
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
