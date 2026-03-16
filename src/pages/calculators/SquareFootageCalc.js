import { useState } from 'react';
import Seo from '../../components/Seo';
import RelatedTools from '../../components/RelatedTools';

function SquareFootageCalc() {
  const [shape, setShape] = useState('rectangle');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [radius, setRadius] = useState('');
  const [base, setBase] = useState('');
  const [height, setHeight] = useState('');
  const [pricePerSqFt, setPricePerSqFt] = useState('');

  let sqft = 0;
  if (shape === 'rectangle') {
    sqft = (parseFloat(length) || 0) * (parseFloat(width) || 0);
  } else if (shape === 'circle') {
    const r = parseFloat(radius) || 0;
    sqft = Math.PI * r * r;
  } else if (shape === 'triangle') {
    sqft = 0.5 * (parseFloat(base) || 0) * (parseFloat(height) || 0);
  }

  const sqMeters = sqft * 0.092903;
  const acres = sqft / 43560;
  const totalCost = sqft * (parseFloat(pricePerSqFt) || 0);

  return (
    <div>
      <Seo
        title="Square Footage Calculator - Calculate Area in Sq Ft"
        description="Free square footage calculator. Calculate area in square feet for rooms, flooring, landscaping, and construction projects. Supports rectangles, circles, and triangles."
        faqs={[
          { q: 'How do I calculate square footage of a room?', a: 'Measure the length and width of the room in feet, then multiply length times width. For example, a 12 x 10 room is 120 square feet. For irregular rooms, divide into rectangles and add them together.' },
          { q: 'How many square feet are in an acre?', a: 'One acre equals 43,560 square feet. To convert square feet to acres, divide by 43,560. To convert acres to square feet, multiply by 43,560.' },
          { q: 'How do I calculate square footage for flooring?', a: 'Measure each room length and width in feet and multiply. Add all rooms together for the total area. Buy 10% extra material to account for cuts, waste, and future repairs.' }
        ]}
      />
      <h1>Square Footage Calculator</h1>
      <p className="subtitle">Calculate area in square feet for any space or project.</p>

      <div className="form">
        <div className="input-group">
          <label>Shape</label>
          <select value={shape} onChange={(e) => setShape(e.target.value)}>
            <option value="rectangle">Rectangle / Square</option>
            <option value="circle">Circle</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>

        {shape === 'rectangle' && (
          <>
            <div className="input-group">
              <label>Length (feet)</label>
              <input type="number" min="0" step="0.01" placeholder="0" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Width (feet)</label>
              <input type="number" min="0" step="0.01" placeholder="0" value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>
          </>
        )}

        {shape === 'circle' && (
          <div className="input-group">
            <label>Radius (feet)</label>
            <input type="number" min="0" step="0.01" placeholder="0" value={radius} onChange={(e) => setRadius(e.target.value)} />
          </div>
        )}

        {shape === 'triangle' && (
          <>
            <div className="input-group">
              <label>Base (feet)</label>
              <input type="number" min="0" step="0.01" placeholder="0" value={base} onChange={(e) => setBase(e.target.value)} />
            </div>
            <div className="input-group">
              <label>Height (feet)</label>
              <input type="number" min="0" step="0.01" placeholder="0" value={height} onChange={(e) => setHeight(e.target.value)} />
            </div>
          </>
        )}

        <div className="input-group">
          <label>Price per Sq Ft (optional)</label>
          <input type="number" min="0" step="0.01" placeholder="0.00" value={pricePerSqFt} onChange={(e) => setPricePerSqFt(e.target.value)} />
        </div>
      </div>

      {sqft > 0 && (
        <div className="results">
          <div className="primary-result">{sqft.toLocaleString(undefined, { maximumFractionDigits: 2 })} sq ft</div>
          <div className="detail-grid">
            <div className="detail-card">
              <span className="detail-value">{sqMeters.toLocaleString(undefined, { maximumFractionDigits: 2 })} m&sup2;</span>
              <span className="detail-label">Square Meters</span>
            </div>
            <div className="detail-card">
              <span className="detail-value">{acres.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
              <span className="detail-label">Acres</span>
            </div>
            {totalCost > 0 && (
              <div className="detail-card highlight">
                <span className="detail-value">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className="detail-label">Total Cost</span>
              </div>
            )}
          </div>
        </div>
      )}

      <section className="info-section">
        <h2>How to Calculate Square Footage</h2>
        <p>
          Square footage measures the area of a two-dimensional space in square feet. It is the standard unit used
          in the United States for real estate, flooring, painting, landscaping, and construction. To find the square
          footage of a rectangular space, simply multiply the length by the width, both measured in feet. For example,
          a room that is 15 feet long and 12 feet wide has an area of 15 x 12 = 180 square feet.
        </p>

        <h2>Common Square Footage Formulas</h2>
        <ul>
          <li><strong>Rectangle / Square:</strong> Length x Width</li>
          <li><strong>Circle:</strong> Pi x Radius&sup2;</li>
          <li><strong>Triangle:</strong> 0.5 x Base x Height</li>
          <li><strong>Irregular shapes:</strong> Break into smaller rectangles or triangles, calculate each, and add together</li>
        </ul>

        <h2>Using Square Footage for Projects</h2>
        <p>
          Knowing the square footage is essential for estimating materials and costs. For flooring, multiply the square
          footage by the price per square foot of your chosen material, then add 10% for waste. For paint, one gallon
          typically covers about 350 square feet. This calculator includes an optional cost estimator so you can
          quickly determine total project costs.
        </p>

        <h3>How do I calculate square footage of a room?</h3>
        <p>
          Measure the length and width of the room in feet using a tape measure, then multiply length times width.
          For example, a room that is 12 feet long and 10 feet wide is 12 x 10 = 120 square feet. For irregularly
          shaped rooms, divide the room into rectangles, calculate each area separately, and add them together.
        </p>

        <h3>How many square feet are in an acre?</h3>
        <p>
          One acre equals 43,560 square feet. An acre is roughly the size of a football field without the end zones.
          To convert square feet to acres, divide by 43,560. To convert acres to square feet, multiply by 43,560.
        </p>

        <h3>How do I calculate square footage for flooring?</h3>
        <p>
          Measure each room length and width in feet and multiply to get square footage. Add all rooms together
          for the total area. It is recommended to buy 10% extra material to account for cuts, waste, and future
          repairs. For rooms with closets or alcoves, measure those separately and add them to the total.
        </p>
      </section>
      <RelatedTools current="/square-footage-calculator" />
    </div>
  );
}

export default SquareFootageCalc;
