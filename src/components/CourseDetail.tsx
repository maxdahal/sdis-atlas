import { useEffect, useRef } from 'react';
import { ExternalLink, X, Sparkles } from 'lucide-react';
import type { Course } from '../lib/courses';
import { SaveButton } from './CourseCard';
export default function CourseDetail({ course, saved, toggle, close }: { course: Course; saved: boolean; toggle: () => void; close: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!; const previous = document.activeElement as HTMLElement;
    dialog.showModal(); document.body.style.overflow = 'hidden';
    return () => { dialog.close(); document.body.style.overflow = ''; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className="detail-dialog" onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="detail-title">
    <div className="detail-inner"><div className="detail-toolbar"><span>COURSE OVERVIEW</span><button autoFocus className="icon-button" onClick={close} aria-label="Close course details"><X/></button></div>
    <span className={`course-code ${course.department.toLowerCase()}`}>{course.code}</span><h2 id="detail-title">{course.title}</h2>
    <div className="detail-meta"><span>{course.credits} credit hours</span><span>{course.level}-level</span><span>{course.department}</span><SaveButton course={course} saved={saved} toggle={toggle}/></div>
    <section><h3>Official catalog description</h3><p className="full-description">{course.description}</p></section>
    <section><h3>Prerequisites & corequisites</h3><p>{course.prerequisites ?? 'No requisites listed in the catalog. Review the description for any additional restrictions or permissions.'}</p></section>
    <section className="skill-section"><h3><Sparkles size={16}/> Skills you might explore</h3><div className="tags">{course.skills?.map(s => <span key={s}>{s}</span>)}</div><p>Atlas-generated classifications, not official UNC learning outcomes or recommendations.</p></section>
    <section className="source-section"><span className="eyebrow">SOURCE · {course.catalogYear} UNC CATALOG</span><p>Verified November 3, 2026. A catalog listing does not indicate current enrollment availability.</p><a className="primary-link" href={course.sourceUrl} target="_blank" rel="noreferrer">View official {course.department} catalog <ExternalLink size={16}/></a></section>
    </div></dialog>;
}
