export const Input = ({ className = '', ...props }) => (
  <input
    className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
      focus:bg-white focus:ring-2 focus:ring-cpme-lightblue/20 focus:border-cpme-lightblue
      outline-none transition-all text-sm font-medium text-slate-700 placeholder-slate-400
      disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    {...props}
  />
)

export const Textarea = ({ className = '', ...props }) => (
  <textarea
    className={`w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl
      focus:bg-white focus:ring-2 focus:ring-cpme-lightblue/20 focus:border-cpme-lightblue
      outline-none transition-all text-sm font-medium text-slate-700 placeholder-slate-400
      min-h-[110px] resize-y ${className}`}
    {...props}
  />
)

export const FormGroup = ({ label, children, required, hint }) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-cpme-red">*</span>}
      </label>
    )}
    {hint && <p className="text-xs text-slate-500 leading-relaxed -mt-0.5">{hint}</p>}
    {children}
  </div>
)

export const PillRadio = ({ name, value, checked, onChange, label }) => (
  <label
    className={`px-4 py-2 border rounded-full text-sm font-semibold cursor-pointer transition-all select-none
      ${checked
        ? 'bg-cpme-lightblue text-white border-cpme-lightblue shadow-sm'
        : 'bg-white text-slate-600 border-slate-200 hover:border-cpme-lightblue hover:text-cpme-lightblue'
      }`}
  >
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="hidden" />
    {label}
  </label>
)

export const RadioCard = ({ name, value, checked, onChange, label, icon: Icon }) => (
  <label className="relative cursor-pointer flex-1">
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
    <div className={`h-full p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center
      ${checked
        ? 'border-cpme-lightblue bg-blue-50 text-cpme-lightblue'
        : 'border-slate-100 bg-white hover:bg-slate-50 text-slate-400'
      }`}
    >
      {Icon && <Icon size={18} className="mb-1" />}
      <span className={`text-sm font-semibold ${checked ? 'text-cpme-lightblue' : 'text-slate-700'}`}>{label}</span>
    </div>
  </label>
)

export const Checkbox = ({ name, checked, onChange, label }) => (
  <label className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-all">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 rounded text-cpme-lightblue border-slate-300 focus:ring-cpme-lightblue accent-cpme-lightblue cursor-pointer"
    />
    <span className="text-sm font-semibold text-slate-700">{label}</span>
  </label>
)

export const ToggleRow = ({ label, name, value, onChange, children }) => (
  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <div className="flex gap-2">
        {['Oui', 'Non'].map(opt => (
          <label key={opt}
            className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all border
              ${value === opt
                ? opt === 'Oui' ? 'bg-cpme-lightblue text-white border-cpme-lightblue' : 'bg-slate-600 text-white border-slate-600'
                : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'
              }`}
          >
            <input type="radio" name={name} value={opt} checked={value === opt} onChange={onChange} className="hidden" />
            {opt}
          </label>
        ))}
      </div>
    </div>
    {value === 'Oui' && children && <div>{children}</div>}
  </div>
)

export const SectionCard = ({ title, number, children }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
      <div className="w-8 h-8 rounded-lg bg-cpme-blue text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
        {number}
      </div>
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
    {children}
  </div>
)
