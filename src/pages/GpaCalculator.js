import { useState } from 'react';
import Seo from '../components/Seo';
import RelatedTools from '../components/RelatedTools';

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
        <h2>How to Use the GPA Calculator</h2>
        <p>
          For each course, type an optional name, select the letter grade you received from the dropdown, and enter the number of credit hours. The calculator updates your GPA in real time as you fill in the fields. Click "+ Add Course" to add more rows, or click the X button to remove a course. Your GPA, total credits, and total quality points are displayed at the top. There is no need to press a submit button -- results refresh with every change you make.
        </p>

        <h2>The GPA Formula with a Worked Example</h2>
        <p>
          GPA = Total Quality Points / Total Credit Hours, where Quality Points for a course = Grade Points x Credit Hours. The standard 4.0 scale assigns A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, D- = 0.7, and F = 0.0.
        </p>
        <p>
          <strong>Worked example:</strong> Suppose you take three courses this semester: English (3 credits, grade A = 4.0), Biology (4 credits, grade B+ = 3.3), and History (3 credits, grade A- = 3.7). Quality points: English = 4.0 x 3 = 12.0, Biology = 3.3 x 4 = 13.2, History = 3.7 x 3 = 11.1. Total quality points = 36.3, total credits = 10. GPA = 36.3 / 10 = <strong>3.63</strong>.
        </p>

        <h3>What is the difference between semester GPA and cumulative GPA?</h3>
        <p>
          Semester GPA covers only the courses taken during a single term. Cumulative GPA covers every course from every term combined. To calculate cumulative GPA, add up all quality points from all semesters and divide by all credit hours attempted. Most schools display both on your transcript. This calculator can handle either -- just enter the courses for one semester to get a semester GPA, or enter every course across all semesters to get your cumulative figure.
        </p>

        <h3>Do plus and minus grades really matter?</h3>
        <p>
          Yes, on a standard 4.0 scale they make a measurable difference. An A- (3.7) in a 4-credit course contributes 1.2 fewer quality points than a straight A (4.0) in the same course. Over a full course load, several minus grades can lower your GPA by a tenth or more. Conversely, earning B+ (3.3) instead of a flat B (3.0) in multiple courses can noticeably raise your average. Schools that do not use plus/minus grading assign the same points to every variant of a letter.
        </p>

        <h3>How can I raise my GPA?</h3>
        <p>
          Focus on courses with more credit hours, because they carry more weight in the GPA calculation. Improving a grade in a 4-credit course affects your GPA twice as much as the same improvement in a 2-credit course. Retaking a failed or low-grade course -- if your school allows grade replacement -- is one of the most effective strategies. Beyond academics, consistent study habits, using office hours, and forming study groups all contribute to higher grades over time.
        </p>
      </section>
      <RelatedTools current="/gpa-calculator" />
    </div>
  );
}

export default GpaCalculator;
