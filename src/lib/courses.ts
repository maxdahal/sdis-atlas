export interface Course {
  id: string; code: string; title: string; description: string;
  department: 'INLS' | 'DATA'; credits: number; level: number;
  prerequisites: string | null; catalogYear: string; sourceUrl: string; skills?: string[];
}
export interface Filters { query: string; department: string; level: string; credits: string }
export function filterCourses(courses: Course[], filters: Filters) {
  const words = filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return courses.filter(c => {
    const text = [c.code, c.code.replace(/\s/g, ''), c.title, c.description, ...(c.skills ?? [])].join(' ').toLowerCase();
    return words.every(w => text.includes(w)) && (!filters.department || c.department === filters.department) && (!filters.level || c.level === Number(filters.level)) && (!filters.credits || c.credits === Number(filters.credits));
  });
}
export function readSaved(raw: string | null): string[] {
  try { const data: unknown = JSON.parse(raw ?? '[]'); return Array.isArray(data) ? [...new Set(data.filter((v): v is string => typeof v === 'string'))] : []; } catch { return []; }
}
