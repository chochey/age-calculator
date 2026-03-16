import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function DueDateCalculator() {
  const [lmpDate, setLmpDate] = useState('');
  const [result, setResult] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const lmp = new Date(lmpDate + 'T00:00:00');
    if (isNaN(lmp.getTime())) { setResult(null); return; }

    const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const daysSinceLmp = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const weeksPregnant = Math.floor(daysSinceLmp / 7);
    const daysRemainder = daysSinceLmp % 7;
    const daysUntilDue = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));

    let trimester;
    if (weeksPregnant < 13) trimester = '1st Trimester';
    else if (weeksPregnant < 27) trimester = '2nd Trimester';
    else trimester = '3rd Trimester';

    const conceptionDate = new Date(lmp.getTime() + 14 * 24 * 60 * 60 * 1000);
    const firstTrimesterEnd = new Date(lmp.getTime() + 90 * 24 * 60 * 60 * 1000);
    const secondTrimesterEnd = new Date(lmp.getTime() + 188 * 24 * 60 * 60 * 1000);
    const viabilityDate = new Date(lmp.getTime() + 168 * 24 * 60 * 60 * 1000);

    const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    setResult({
      dueDate: formatDate(dueDate),
      weeksPregnant,
      daysRemainder,
      daysUntilDue,
      trimester,
      conceptionDate: formatDate(conceptionDate),
      firstTrimesterEnd: formatDate(firstTrimesterEnd),
      secondTrimesterEnd: formatDate(secondTrimesterEnd),
      viabilityDate: formatDate(viabilityDate)
    });
  };

  return (
    <div>
      <Seo title="Due Date Calculator - Pregnancy Due Date Calculator" description="Free pregnancy due date calculator. Enter your last menstrual period to find your estimated due date, current weeks pregnant, trimester, and key milestones." faqs={[{ q: 'How is the due date calculated from the last menstrual period?', a: 'The standard method adds 280 days (40 weeks) to the first day of your last menstrual period (LMP). This is known as Naegele\'s rule. It assumes a 28-day menstrual cycle with ovulation occurring on day 14. While most babies are born between 38 and 42 weeks, the 40-week estimate gives doctors a reliable reference point for scheduling prenatal care and monitoring fetal development.' }, { q: 'How accurate is a due date based on LMP?', a: 'Only about 5% of babies are born on their exact due date. The LMP method is most accurate for women with regular 28-day cycles. If your cycles are longer or shorter, the estimate may be off by a week or more. A first-trimester ultrasound can refine the due date to within 5-7 days and is considered more accurate than LMP dating, especially for women with irregular cycles.' }, { q: 'What are the three trimesters of pregnancy?', a: 'The first trimester spans weeks 1 through 12 and is when major organs begin forming. The second trimester covers weeks 13 through 26 and is often called the most comfortable period — the baby grows rapidly and movement becomes noticeable. The third trimester runs from week 27 until birth around week 40, during which the baby gains significant weight and the lungs mature for breathing outside the womb.' }]} />
      <h1>Due Date Calculator</h1>
      <p className="subtitle">Calculate your estimated due date, weeks pregnant, and pregnancy milestones.</p>

      <form onSubmit={calculate} className="form">
        <div className="input-row">
          <div className="input-group">
            <label>First Day of Last Menstrual Period</label>
            <input type="date" value={lmpDate} onChange={(e) => setLmpDate(e.target.value)} required />
          </div>
        </div>
        <button type="submit">Calculate</button>
      </form>

      {result && (
        <div className="results">
          <div className="primary-result">
            <span className="age-number">{result.dueDate}</span>
            <span className="age-label">estimated due date</span>
          </div>

          <div className="detail-grid">
            <div className="detail-card highlight">
              <span className="detail-value">{result.weeksPregnant}w {result.daysRemainder}d</span>
              <span className="detail-label">Current Progress</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.daysUntilDue}</span>
              <span className="detail-label">Days Until Due Date</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.trimester}</span>
              <span className="detail-label">Current Trimester</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.conceptionDate}</span>
              <span className="detail-label">Estimated Conception</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.firstTrimesterEnd}</span>
              <span className="detail-label">1st Trimester Ends</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{result.viabilityDate}</span>
              <span className="detail-label">Viability Milestone (24 wks)</span>
            </div>
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Use This Due Date Calculator</h2>
        <p>
          Enter the first day of your last menstrual period (LMP) using the date picker, then click "Calculate."
          The tool instantly shows your estimated due date, how many weeks and days pregnant you are today, which
          trimester you are in, and important milestones like the estimated conception date, end of the first
          trimester, and the 24-week viability milestone. Share these dates with your healthcare provider to help
          plan prenatal appointments and prepare for your baby's arrival.
        </p>

        <h2>How the Due Date Calculation Works</h2>
        <p>
          This calculator uses Naegele's Rule, the standard method used by obstetricians worldwide. It adds
          <strong> 280 days (40 weeks)</strong> to the first day of your last menstrual period. The method assumes
          a regular 28-day cycle with ovulation occurring around day 14. While conception typically happens about
          two weeks after the LMP, pregnancy is dated from the LMP because it provides a more reliably known
          starting point. The estimated conception date shown is calculated as LMP plus 14 days.
        </p>

        <h2>Worked Example</h2>
        <p>
          If the first day of your last period was <strong>January 1, 2026</strong>, adding 280 days gives an
          estimated due date of <strong>October 8, 2026</strong>. The estimated conception date would be around
          <strong> January 15, 2026</strong>. The first trimester ends around <strong>April 1, 2026</strong> (week
          13), and the viability milestone at 24 weeks falls around <strong>June 18, 2026</strong>. If today were
          March 15, 2026, you would be approximately <strong>10 weeks and 3 days</strong> pregnant, in the first
          trimester, with about 207 days until your due date.
        </p>

        <h3>How is the due date calculated from the last menstrual period?</h3>
        <p>
          The standard method adds 280 days (40 weeks) to the first day of your last menstrual period (LMP).
          This is known as Naegele's rule. It assumes a 28-day menstrual cycle with ovulation occurring on day
          14. While most babies are born between 38 and 42 weeks, the 40-week estimate gives doctors a reliable
          reference point for scheduling prenatal care and monitoring fetal development.
        </p>

        <h3>How accurate is a due date based on LMP?</h3>
        <p>
          Only about 5% of babies are born on their exact due date. The LMP method is most accurate for women
          with regular 28-day cycles. If your cycles are longer or shorter, the estimate may be off by a week
          or more. A first-trimester ultrasound can refine the due date to within 5-7 days and is considered
          more accurate than LMP dating, especially for women with irregular cycles.
        </p>

        <h3>What are the three trimesters of pregnancy?</h3>
        <p>
          The first trimester spans weeks 1 through 12 and is when major organs begin forming. The second
          trimester covers weeks 13 through 26 and is often called the most comfortable period — the baby
          grows rapidly and movement becomes noticeable. The third trimester runs from week 27 until birth
          around week 40, during which the baby gains significant weight and the lungs mature for breathing
          outside the womb.
        </p>
      </section>
      <RelatedTools current="/due-date-calculator" />
    </div>
  );
}

export default DueDateCalculator;
