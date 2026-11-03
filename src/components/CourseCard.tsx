import { ArrowUpRight, Bookmark, Check } from 'lucide-react';
import { motion } from 'motion/react';
import type { Course } from '../lib/courses';
export function SaveButton({ course, saved, toggle }: { course: Course; saved: boolean; toggle: () => void }) {
  return <motion.button whileTap={{ scale: .88 }} className={`save-button ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Remove' : 'Save'} ${course.code}${saved ? ' from saved courses' : ''}`} aria-pressed={saved} onClick={toggle}>{saved ? <Check size={18}/> : <Bookmark size={18}/>}</motion.button>;
}
export default function CourseCard({ course, saved, toggle, open }: { course: Course; saved: boolean; toggle: () => void; open: () => void }) {
  return <motion.article layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2 }} className={`course-card ${course.department.toLowerCase()}`}>
    <div className="card-top"><span className="course-code">{course.code}</span><SaveButton course={course} saved={saved} toggle={toggle}/></div>
    <h3><button onClick={open} className="course-title">{course.title}<span className="sr-only"> — view details</span></button></h3>
    <p className="description">{course.description}</p>
    <div className="tags" aria-label="Atlas-generated skill tags">{course.skills?.map(s => <span key={s}>{s}</span>)}</div>
    <div className="card-bottom"><span><span className="department-dot"/>{course.department} <span className="divider">/</span> {course.credits} {course.credits === 1 ? 'credit' : 'credits'}</span><button onClick={open} aria-label={`View ${course.code} details`}><ArrowUpRight size={19}/></button></div>
  </motion.article>;
}
