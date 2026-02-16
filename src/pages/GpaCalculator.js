import { useState } from 'react';
import Seo from '../components/Seo';

const gradePoints = { 'A+': 4.0, 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'D-': 0.7, 'F': 0.0 };
const gradeOptions = Object.keys(gradePoints);

function GpaCalculator() {
  const [courses, setCourses] = useState([
    { name: '', grade: 'A', credits: '3' },
    { name: '', grade: 'B+', credits: '3' },
    { name: '', grade: 'A-', credits: '4' },
  ]);

  const updateCourse = (i, field, value) => {
    const updated = [...courses];
    updated[i] = { ...updated[i], [field]: value };
    setCourses(updated);
  };

  const addCourse = () => setCourses([...courses, { name: '', grade: 'A', credits: '3' }]);
  const removeCourse = (i) => setCourses(courses.filter((_, j) => j !== i));

  const validCourses = courses.filter((c) => c.credits && Number(c.credits) > 0);
  const totalCredits = validCourses.reduce((s, c) => s + Number(c.credits), 0);
  const totalPoints = validCourses.reduce((s, c) => s + gradePoints[c.grade] * Number(c.credits), 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <div>
      <Seo title="GPA Calculator - Calculate Your Grade Point Average" description="Free GPA calculator. Calculate your grade point average by entering your courses, grades, and credit hours. Supports A+ through F grading scale." />
      <h1>GPA Calculator</h1>
      <p className="subtitle">Calculate your grade point average from your courses.</p>

      {totalCredits > 0 && (
        <div className="results" style={{ marginBottom: '1.5rem' }}>
          <div className="primary-result">
            <span className="age-number">{gpa}</span>
            <span className="age-label">GPA</span>
          </div>
          <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="detail-card">
              <span className="detail-value">{totalCredits}</span>
              <span className="detail-label">Total Credits</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{totalPoints.toFixed(1)}</span>
              <span className="detail-label">Quality Points</span>
            </div>
          </div>
        </div>
      )}

      <div className="gpa-courses">
        {courses.map((c, i) => (
          <div key={i} className="gpa-row">
            <input type="text" placeholder={`Course ${i + 1}`} value={c.name} onChange={(e) => updateCourse(i, 'name', e.target.value)} className="gpa-name" />
            <select value={c.grade} onChange={(e) => updateCourse(i, 'grade', e.target.value)} className="select-input gpa-grade">
              {gradeOptions.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
            <input type="number" min="1" max="12" value={c.credits} onChange={(e) => updateCourse(i, 'credits', e.target.value)} placeholder="Cr" className="gpa-credits" />
            {courses.length > 1 && <button onClick={() => removeCourse(i)} className="gpa-remove">&times;</button>}
          </div>
        ))}
      </div>

      <button onClick={addCourse} className="form-btn" style={{ marginTop: '0.75rem' }}>+ Add Course</button>

      <section className="info-section">
        <h2>How GPA is Calculated</h2>
        <p>Your GPA is calculated by multiplying each course's grade points by its credit hours, summing the results, and dividing by total credit hours. This weighted calculation means courses with more credits have a bigger impact on your GPA.</p>

        <h2>Grade Point Scale</h2>
        <ul>
          <li><strong>A / A+</strong> = 4.0 | <strong>A-</strong> = 3.7</li>
          <li><strong>B+</strong> = 3.3 | <strong>B</strong> = 3.0 | <strong>B-</strong> = 2.7</li>
          <li><strong>C+</strong> = 2.3 | <strong>C</strong> = 2.0 | <strong>C-</strong> = 1.7</li>
          <li><strong>D+</strong> = 1.3 | <strong>D</strong> = 1.0 | <strong>F</strong> = 0.0</li>
        </ul>
      </section>
    </div>
  );
}

export default GpaCalculator;
