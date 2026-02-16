import { useState, useRef } from 'react';
import Seo from '../components/Seo';

function InvoiceGenerator() {
  const [from, setFrom] = useState({ name: '', email: '', address: '' });
  const [to, setTo] = useState({ name: '', email: '', address: '' });
  const [invoiceNum, setInvoiceNum] = useState('INV-001');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState([{ desc: '', qty: '1', price: '' }]);
  const [notes, setNotes] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const printRef = useRef();

  const updateItem = (i, field, val) => {
    const updated = [...items];
    updated[i] = { ...updated[i], [field]: val };
    setItems(updated);
  };
  const addItem = () => setItems([...items, { desc: '', qty: '1', price: '' }]);
  const removeItem = (i) => setItems(items.filter((_, j) => j !== i));

  const subtotal = items.reduce((s, it) => s + (parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0), 0);
  const tax = taxRate ? subtotal * (parseFloat(taxRate) / 100) : 0;
  const total = subtotal + tax;

  const handlePrint = () => {
    const content = printRef.current;
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>Invoice ${invoiceNum}</title><style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 2rem; color: #1e293b; }
      .inv-header { display: flex; justify-content: space-between; margin-bottom: 2rem; }
      .inv-title { font-size: 2rem; font-weight: 800; color: #4f46e5; }
      .inv-meta { text-align: right; font-size: 0.9rem; color: #475569; }
      .inv-meta strong { display: block; }
      .inv-parties { display: flex; gap: 2rem; margin-bottom: 2rem; }
      .inv-party { flex: 1; }
      .inv-party-label { font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 700; margin-bottom: 0.25rem; }
      .inv-party-name { font-weight: 700; font-size: 1.05rem; }
      .inv-party p { font-size: 0.9rem; color: #475569; white-space: pre-line; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
      th { background: #f8fafc; text-align: left; padding: 0.6rem 0.75rem; font-size: 0.8rem; text-transform: uppercase; color: #64748b; border-bottom: 2px solid #e2e8f0; }
      td { padding: 0.6rem 0.75rem; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; }
      .text-right { text-align: right; }
      .totals { display: flex; justify-content: flex-end; }
      .totals-table { width: 250px; }
      .totals-table td { padding: 0.35rem 0.75rem; }
      .total-row { font-weight: 700; font-size: 1.1rem; border-top: 2px solid #e2e8f0; }
      .inv-notes { margin-top: 2rem; font-size: 0.85rem; color: #64748b; }
    </style></head><body>`);
    win.document.write(content.innerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  return (
    <div>
      <Seo title="Free Invoice Generator - Create & Print Invoices" description="Free online invoice generator. Create professional invoices with line items, tax, and notes. Print or save as PDF — no sign-up required." />
      <h1>Invoice Generator</h1>
      <p className="subtitle">Create professional invoices and print or save as PDF.</p>

      <div className="inv-form-grid">
        <div className="inv-form-section">
          <h3 className="inv-form-label">From</h3>
          <input type="text" placeholder="Your name / business" value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} />
          <input type="text" placeholder="Email" value={from.email} onChange={(e) => setFrom({ ...from, email: e.target.value })} />
          <textarea placeholder="Address" rows={2} value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} />
        </div>
        <div className="inv-form-section">
          <h3 className="inv-form-label">Bill To</h3>
          <input type="text" placeholder="Client name" value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} />
          <input type="text" placeholder="Email" value={to.email} onChange={(e) => setTo({ ...to, email: e.target.value })} />
          <textarea placeholder="Address" rows={2} value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} />
        </div>
      </div>

      <div className="input-row" style={{ marginBottom: '1rem' }}>
        <div className="input-group">
          <label>Invoice #</label>
          <input type="text" value={invoiceNum} onChange={(e) => setInvoiceNum(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Due Date</label>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Tax %</label>
          <input type="number" min="0" step="any" placeholder="0" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
        </div>
      </div>

      <h3 style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Line Items</h3>
      {items.map((it, i) => (
        <div key={i} className="inv-item-row">
          <input type="text" placeholder="Description" value={it.desc} onChange={(e) => updateItem(i, 'desc', e.target.value)} className="inv-item-desc" />
          <input type="number" min="1" placeholder="Qty" value={it.qty} onChange={(e) => updateItem(i, 'qty', e.target.value)} className="inv-item-qty" />
          <input type="number" min="0" step="any" placeholder="Price" value={it.price} onChange={(e) => updateItem(i, 'price', e.target.value)} className="inv-item-price" />
          <span className="inv-item-total">${((parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0)).toFixed(2)}</span>
          {items.length > 1 && <button onClick={() => removeItem(i)} className="gpa-remove">&times;</button>}
        </div>
      ))}
      <button onClick={addItem} className="form-btn secondary" style={{ marginTop: '0.5rem' }}>+ Add Item</button>

      <textarea className="word-textarea" placeholder="Notes (optional)" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} style={{ marginTop: '1rem' }} />

      <div className="results" style={{ marginTop: '1.25rem' }}>
        <div className="detail-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="detail-card">
            <span className="detail-value">${subtotal.toFixed(2)}</span>
            <span className="detail-label">Subtotal</span>
          </div>
          <div className="detail-card">
            <span className="detail-value">${tax.toFixed(2)}</span>
            <span className="detail-label">Tax</span>
          </div>
          <div className="detail-card highlight">
            <span className="detail-value">${total.toFixed(2)}</span>
            <span className="detail-label">Total</span>
          </div>
        </div>
      </div>

      <button onClick={handlePrint} className="form-btn" style={{ marginTop: '0.5rem', width: '100%' }}>Print / Save as PDF</button>

      {/* Hidden printable invoice */}
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <div className="inv-header">
            <div><div className="inv-title">INVOICE</div></div>
            <div className="inv-meta">
              <strong>{invoiceNum}</strong>
              <span>Date: {date}</span><br />
              {dueDate && <span>Due: {dueDate}</span>}
            </div>
          </div>
          <div className="inv-parties">
            <div className="inv-party">
              <div className="inv-party-label">From</div>
              <div className="inv-party-name">{from.name}</div>
              <p>{from.email}{from.address ? '\n' + from.address : ''}</p>
            </div>
            <div className="inv-party">
              <div className="inv-party-label">Bill To</div>
              <div className="inv-party-name">{to.name}</div>
              <p>{to.email}{to.address ? '\n' + to.address : ''}</p>
            </div>
          </div>
          <table>
            <thead><tr><th>Description</th><th className="text-right">Qty</th><th className="text-right">Price</th><th className="text-right">Amount</th></tr></thead>
            <tbody>
              {items.filter((it) => it.desc).map((it, i) => (
                <tr key={i}><td>{it.desc}</td><td className="text-right">{it.qty}</td><td className="text-right">${(parseFloat(it.price) || 0).toFixed(2)}</td><td className="text-right">${((parseFloat(it.qty) || 0) * (parseFloat(it.price) || 0)).toFixed(2)}</td></tr>
              ))}
            </tbody>
          </table>
          <div className="totals">
            <table className="totals-table">
              <tbody>
                <tr><td>Subtotal</td><td className="text-right">${subtotal.toFixed(2)}</td></tr>
                {tax > 0 && <tr><td>Tax ({taxRate}%)</td><td className="text-right">${tax.toFixed(2)}</td></tr>}
                <tr className="total-row"><td>Total</td><td className="text-right">${total.toFixed(2)}</td></tr>
              </tbody>
            </table>
          </div>
          {notes && <div className="inv-notes"><strong>Notes:</strong> {notes}</div>}
        </div>
      </div>

      <section className="info-section">
        <h2>Free Invoice Generator</h2>
        <p>Create professional invoices in seconds. Add your business details, line items, and tax rate, then print or save as PDF using your browser's print dialog. No account or sign-up required.</p>

        <h2>Features</h2>
        <ul>
          <li>Unlimited line items with automatic totals</li>
          <li>Optional tax percentage calculation</li>
          <li>Print-ready layout with clean formatting</li>
          <li>Save as PDF via browser print dialog (Ctrl+P / Cmd+P)</li>
        </ul>
      </section>
    </div>
  );
}

export default InvoiceGenerator;
