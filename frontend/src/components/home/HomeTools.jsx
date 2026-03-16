import { useState } from 'react'
import { toolCards } from '../../data/homeData'

export default function HomeTools() {
  const [calcTab, setCalcTab] = useState('VAT')
  const [vatAmount, setVatAmount] = useState('')
  const [vatMode, setVatMode] = useState('excl')
  const [levySalary, setLevySalary] = useState('')
  const [shifSalary, setShifSalary] = useState('')
  const [loanP, setLoanP] = useState('')
  const [loanR, setLoanR] = useState('')
  const [loanN, setLoanN] = useState('')
  const [qrText, setQrText] = useState('')
  const [qrSrc, setQrSrc] = useState('')

  const vatNum = parseFloat(vatAmount) || 0
  const vatExcl = vatMode === 'excl' ? vatNum : vatNum / 1.16
  const vatAmt = vatExcl * 0.16
  const vatIncl = vatExcl + vatAmt
  const levy = (parseFloat(levySalary) || 0) * 0.015
  const shif = Math.max((parseFloat(shifSalary) || 0) * 0.0275, shifSalary ? 300 : 0)

  const loanMonthly = (() => {
    const p = parseFloat(loanP) || 0
    const r = (parseFloat(loanR) || 0) / 12 / 100
    const n = parseInt(loanN, 10) || 0
    if (!p || !r || !n) return null
    const m = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    return { monthly: m, total: m * n, interest: m * n - p }
  })()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-2">Free tools</p>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">Kenya calculators & generators</h2>
          <p className="text-zinc-600 text-sm mt-1">100% free. No sign-up required.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {['VAT', 'Housing Levy', 'SHIF', 'Loan Repayment', 'QR Code'].map((tab) => (
            <button
              key={tab}
              onClick={() => setCalcTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${calcTab === tab ? 'bg-zinc-900 text-white' : 'bg-white border border-zinc-200 text-zinc-600 hover:border-zinc-400'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
            {calcTab === 'VAT' && (
              <div className="space-y-5">
                <h3 className="font-bold text-zinc-900">VAT Calculator <span className="text-zinc-500 font-normal text-sm">(Kenya 16%)</span></h3>
                <div className="flex rounded-lg overflow-hidden border border-zinc-200 w-fit">
                  {[
                    ['excl', 'Add VAT'],
                    ['incl', 'Extract VAT'],
                  ].map(([m, l]) => (
                    <button key={m} onClick={() => { setVatMode(m); setVatAmount('') }} className={`px-4 py-2 text-sm font-medium transition-colors ${vatMode === m ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-50'}`}>
                      {l}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Amount {vatMode === 'excl' ? '(excl. VAT)' : '(incl. VAT)'} — KES</label>
                  <input type="number" value={vatAmount} onChange={(e) => setVatAmount(e.target.value)} placeholder="e.g. 10000" className="mt-1.5 w-full border border-zinc-200 rounded-lg px-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-400 bg-white" />
                </div>
                {vatNum > 0 && (
                  <div className="border border-zinc-200 rounded-xl overflow-hidden">
                    {[
                      ['Amount (excl. VAT)', `KES ${vatExcl.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['VAT (16%)', `KES ${vatAmt.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['Total (incl. VAT)', `KES ${vatIncl.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                    ].map(([label, value], i) => (
                      <div key={label} className={`flex justify-between items-center px-4 py-3 ${i > 0 ? 'border-t border-zinc-100' : ''} ${i === 2 ? 'bg-zinc-100' : 'bg-white'}`}>
                        <span className={`text-sm ${i === 2 ? 'font-bold text-zinc-800' : 'text-zinc-600'}`}>{label}</span>
                        <span className={`text-sm font-bold ${i === 2 ? 'text-zinc-900' : 'text-zinc-900'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {calcTab === 'Housing Levy' && (
              <div className="space-y-5">
                <h3 className="font-bold text-zinc-900">Affordable Housing Levy <span className="text-zinc-500 font-normal text-sm">(1.5% employee + 1.5% employer)</span></h3>
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Gross Monthly Salary — KES</label>
                  <input type="number" value={levySalary} onChange={(e) => setLevySalary(e.target.value)} placeholder="e.g. 50000" className="mt-1.5 w-full border border-zinc-200 rounded-lg px-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-400 bg-white" />
                </div>
                {levySalary && (
                  <div className="border border-zinc-200 rounded-xl overflow-hidden">
                    {[
                      ['Gross Salary', `KES ${parseFloat(levySalary).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['Employee Deduction (1.5%)', `KES ${levy.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['Employer Contribution (1.5%)', `KES ${levy.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['Net Pay (after deduction)', `KES ${((parseFloat(levySalary) || 0) - levy).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                    ].map(([label, value], i) => (
                      <div key={label} className={`flex justify-between items-center px-4 py-3 ${i > 0 ? 'border-t border-zinc-100' : ''} ${i === 3 ? 'bg-zinc-100' : 'bg-white'}`}>
                        <span className={`text-sm ${i === 3 ? 'font-bold text-zinc-800' : 'text-zinc-600'}`}>{label}</span>
                        <span className={`text-sm font-bold ${i === 3 ? 'text-zinc-900' : 'text-zinc-900'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {calcTab === 'SHIF' && (
              <div className="space-y-5">
                <h3 className="font-bold text-zinc-900">SHIF Deduction <span className="text-zinc-500 font-normal text-sm">(2.75% · min KES 300)</span></h3>
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Gross Monthly Salary — KES</label>
                  <input type="number" value={shifSalary} onChange={(e) => setShifSalary(e.target.value)} placeholder="e.g. 50000" className="mt-1.5 w-full border border-zinc-200 rounded-lg px-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-400 bg-white" />
                </div>
                {shifSalary && (
                  <div className="border border-zinc-200 rounded-xl overflow-hidden">
                    {[
                      ['Gross Salary', `KES ${(parseFloat(shifSalary) || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['SHIF Contribution (2.75%)', `KES ${shif.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['Net Pay', `KES ${((parseFloat(shifSalary) || 0) - shif).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                    ].map(([label, value], i) => (
                      <div key={label} className={`flex justify-between items-center px-4 py-3 ${i > 0 ? 'border-t border-zinc-100' : ''} ${i === 2 ? 'bg-zinc-100' : 'bg-white'}`}>
                        <span className={`text-sm ${i === 2 ? 'font-bold text-zinc-800' : 'text-zinc-600'}`}>{label}</span>
                        <span className={`text-sm font-bold ${i === 2 ? 'text-zinc-900' : 'text-zinc-900'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {calcTab === 'Loan Repayment' && (
              <div className="space-y-5">
                <h3 className="font-bold text-zinc-900">Loan Repayment Calculator</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Principal (KES)', val: loanP, set: setLoanP, ph: '100000' },
                    { label: 'Annual Rate (%)', val: loanR, set: setLoanR, ph: '14' },
                    { label: 'Term (months)', val: loanN, set: setLoanN, ph: '24' },
                  ].map(({ label, val, set, ph }) => (
                    <div key={label}>
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">{label}</label>
                      <input type="number" value={val} onChange={(e) => set(e.target.value)} placeholder={ph} className="mt-1.5 w-full border border-zinc-200 rounded-lg px-3 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-400 bg-white" />
                    </div>
                  ))}
                </div>
                {loanMonthly && (
                  <div className="border border-zinc-200 rounded-xl overflow-hidden">
                    {[
                      ['Monthly Payment', `KES ${loanMonthly.monthly.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['Total Payment', `KES ${loanMonthly.total.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                      ['Total Interest', `KES ${loanMonthly.interest.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`],
                    ].map(([label, value], i) => (
                      <div key={label} className={`flex justify-between items-center px-4 py-3 ${i > 0 ? 'border-t border-zinc-100' : ''} ${i === 0 ? 'bg-zinc-100' : 'bg-white'}`}>
                        <span className={`text-sm ${i === 0 ? 'font-bold text-zinc-800' : 'text-zinc-600'}`}>{label}</span>
                        <span className={`text-sm font-bold ${i === 0 ? 'text-zinc-900' : 'text-zinc-900'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {calcTab === 'QR Code' && (
              <div className="space-y-5">
                <h3 className="font-bold text-zinc-900">QR Code Generator</h3>
                <div>
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">URL or Text</label>
                  <input type="text" value={qrText} onChange={(e) => setQrText(e.target.value)} placeholder="https://yoursite.co.ke or any text" className="mt-1.5 w-full border border-zinc-200 rounded-lg px-4 py-2.5 text-zinc-900 text-sm focus:outline-none focus:border-zinc-400 bg-white" />
                </div>
                <button onClick={() => qrText.trim() && setQrSrc(`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrText.trim())}`)} className="bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
                  Generate QR Code
                </button>
                {qrSrc && (
                  <div className="flex flex-col items-center gap-3 pt-2">
                    <img src={qrSrc} alt="QR Code" className="w-48 h-48 border border-zinc-200 rounded-xl p-2 bg-white" />
                    <a href={qrSrc} download="qrcode.png" target="_blank" rel="noreferrer" className="text-zinc-700 hover:text-zinc-900 text-sm font-medium underline underline-offset-2">
                      Download QR Code →
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-zinc-600 text-sm">All tools run directly in your browser — nothing is stored or tracked.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toolCards.map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-zinc-800 font-semibold text-sm">{item.title}</p>
                    <p className="text-zinc-500 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
