import { User, Course, Chapter, Quiz, Question, Enrollment, CourseProgress, ChapterProgress, QuizAttempt, ExamAttempt, CourseType, QuestionType, EnrollmentStatus } from '@prisma/client'

export type {
  User,
  Course,
  Chapter,
  Quiz,
  Question,
  Enrollment,
  CourseProgress,
  ChapterProgress,
  QuizAttempt,
  ExamAttempt,
  CourseType,
  QuestionType,
  EnrollmentStatus,
}

export interface UserWithProgress extends User {
  enrollments: (Enrollment & {
    course: Course
  })[]
  progress: CourseProgress[]
}

export interface CourseWithChapters extends Course {
  chapters: Chapter[]
  enrollments: Enrollment[]
  progress: CourseProgress[]
}

export interface ChapterWithQuizzes extends Chapter {
  quizzes: Quiz[]
  progress: ChapterProgress[]
}

export interface QuizWithQuestions extends Quiz {
  questions: Question[]
  attempts: QuizAttempt[]
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  licenseNumber?: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface CourseFormData {
  title: string
  description: string
  courseType: CourseType
  duration: number
  price: number
}

export interface ChapterFormData {
  title: string
  content: string
  order: number
  duration: number
}

export interface QuizFormData {
  title: string
  description?: string
  timeLimit?: number
}

export interface QuestionFormData {
  question: string
  type: QuestionType
  options: string[]
  correctAnswer: string
  explanation?: string
  order: number
}
