import CategoryHub from '../../components/CategoryHub';

const tools = [
  { name: 'Age Calculator', description: 'Exact age in years, months, days, hours & minutes.', path: '/age-calculator' },
  { name: 'Percentage Calculator', description: 'Percentages, increases, decreases & differences.', path: '/percentage-calculator' },
  { name: 'BMI Calculator', description: 'Body Mass Index with weight category.', path: '/bmi-calculator' },
  { name: 'Tip Calculator', description: 'Tips & bill splitting for any group size.', path: '/tip-calculator' },
  { name: 'Loan Calculator', description: 'Monthly payments, interest & total loan cost.', path: '/loan-calculator' },
  { name: 'Discount Calculator', description: 'Sale prices, savings & final cost with tax.', path: '/discount-calculator' },
  { name: 'GPA Calculator', description: 'Grade point average from courses & credits.', path: '/gpa-calculator' },
  { name: 'Aspect Ratio Calculator', description: 'Calculate & resize dimensions proportionally.', path: '/aspect-ratio-calculator' },
  { name: 'Salary Calculator', description: 'Convert between annual, monthly, weekly & hourly pay.', path: '/salary-calculator' },
  { name: 'Electricity Cost Calculator', description: 'Estimate appliance running costs per day, month & year.', path: '/electricity-cost-calculator' },
  { name: 'Mortgage Calculator', description: 'Monthly payments, total interest & amortization schedule.', path: '/mortgage-calculator' },
  { name: 'Compound Interest Calculator', description: 'See how savings & investments grow over time.', path: '/compound-interest-calculator' },
  { name: 'Calorie Calculator', description: 'Daily calorie needs based on age, gender & activity.', path: '/calorie-calculator' },
  { name: 'Fuel Cost Calculator', description: 'Estimate gas costs for any trip distance.', path: '/fuel-cost-calculator' },
  { name: 'BMR Calculator', description: 'Basal metabolic rate with two equations.', path: '/bmr-calculator' },
  { name: 'Pace Calculator', description: 'Running pace, time & distance calculator.', path: '/pace-calculator' },
  { name: 'Grade Calculator', description: 'Weighted grades & final exam score needed.', path: '/grade-calculator' },
  { name: 'Savings Goal Calculator', description: 'Monthly savings needed to reach your goal.', path: '/savings-goal-calculator' },
  { name: 'Average Calculator', description: 'Mean, median, mode, range & more.', path: '/average-calculator' },
  { name: 'Area Calculator', description: 'Area & perimeter for rectangles, circles, triangles & more.', path: '/area-calculator' },
  { name: 'Proportion Calculator', description: 'Solve proportions & find the missing value.', path: '/proportion-calculator' },
  { name: 'Profit Margin Calculator', description: 'Margin, markup & revenue from cost and price.', path: '/profit-margin-calculator' },
  { name: 'Body Fat Calculator', description: 'Body fat percentage using the U.S. Navy method.', path: '/body-fat-calculator' },
  { name: 'Inflation Calculator', description: 'See how money value changes over time with inflation.', path: '/inflation-calculator' },
  { name: 'Sleep Calculator', description: 'Find ideal bedtimes & wake times based on sleep cycles.', path: '/sleep-calculator' },
  { name: 'Unit Price Calculator', description: 'Compare product prices to find the best deal.', path: '/unit-price-calculator' },
  { name: 'Standard Deviation Calculator', description: 'Calculate standard deviation, variance & more.', path: '/standard-deviation-calculator' },
  { name: 'Sales Tax Calculator', description: 'Calculate sales tax and total price for any state.', path: '/sales-tax-calculator' },
  { name: 'TDEE Calculator', description: 'Total daily energy expenditure based on activity level.', path: '/tdee-calculator' },
  { name: 'Due Date Calculator', description: 'Estimate your pregnancy due date and milestones.', path: '/due-date-calculator' },
  { name: 'Square Footage Calculator', description: 'Calculate area in sq ft for rooms and projects.', path: '/square-footage-calculator' },
];

const faqs = [
  { q: 'Are these calculators really free to use?', a: 'Yes, every calculator on this page is completely free with no sign-up, no account, and no hidden fees. You can use them as many times as you need directly in your browser.' },
  { q: 'Do the calculators work on phones and tablets?', a: 'All of our calculators are fully responsive and work on any device -- phones, tablets, laptops, and desktops. No app download is required because everything runs right in your web browser.' },
  { q: 'How accurate are the results?', a: 'Our calculators use standard mathematical formulas and are designed to give reliable results for everyday use. For critical financial or medical decisions, we recommend consulting a qualified professional to confirm the figures.' },
];

function CalculatorsHub() {
  return (
    <CategoryHub
      title="Free Online Calculators - Math, Finance, Health & More"
      description="Browse 31 free online calculators for math, finance, health, and everyday tasks. Percentage, BMI, loan, mortgage, salary, and more calculators -- no sign-up required."
      intro="31 free calculators for math, finance, health, fitness, and everyday tasks."
      tools={tools}
      faqs={faqs}
    >
      <section className="info-section">
        <h2>About Our Free Online Calculators</h2>
        <p>
          This collection brings together 26 free online calculators covering finance, health, math,
          education, and daily life -- all in one place. Whether you need to figure out a monthly
          mortgage payment, check your BMI, convert a salary between pay periods, or calculate a
          weighted GPA, there is a dedicated tool here for the job. Our financial calculators handle
          loans, compound interest, profit margins, inflation adjustments, and savings goals. Health
          and fitness tools cover calories, body fat, basal metabolic rate, pace tracking, and sleep
          cycles. Math and education calculators tackle percentages, proportions, averages, area
          formulas, and grade computations. Every calculator runs instantly in your browser with no
          sign-up and no software to install. Results are displayed clearly so you can make informed
          decisions without reaching for a spreadsheet or pulling out a textbook.
        </p>

        <h2>How to Choose the Right Calculator</h2>
        <p>
          Start by identifying the category your question falls into. If you are working with money
          -- budgeting, borrowing, or investing -- look at the financial calculators like the loan,
          mortgage, compound interest, or savings goal tools. For health-related questions about
          weight, nutrition, or exercise, the BMI, calorie, BMR, body fat, and pace calculators are
          the right fit. Students and educators will find the GPA, grade, average, and proportion
          calculators especially useful for coursework and exam planning. For everyday tasks such as
          splitting a restaurant bill, comparing unit prices at the grocery store, or estimating your
          electricity costs, the tip, unit price, discount, and electricity cost calculators have you
          covered. If you are not sure where to start, scroll through the grid above -- each tool
          includes a short description so you can quickly spot the one that matches your needs.
        </p>

        <h2>Frequently Asked Questions</h2>

        <h3>Are these calculators really free to use?</h3>
        <p>
          Yes, every calculator on this page is completely free with no sign-up, no account, and no
          hidden fees. You can use them as many times as you need directly in your browser.
        </p>

        <h3>Do the calculators work on phones and tablets?</h3>
        <p>
          All of our calculators are fully responsive and work on any device -- phones, tablets,
          laptops, and desktops. No app download is required because everything runs right in your
          web browser.
        </p>

        <h3>How accurate are the results?</h3>
        <p>
          Our calculators use standard mathematical formulas and are designed to give reliable
          results for everyday use. For critical financial or medical decisions, we recommend
          consulting a qualified professional to confirm the figures.
        </p>
      </section>
    </CategoryHub>
  );
}

export default CalculatorsHub;
