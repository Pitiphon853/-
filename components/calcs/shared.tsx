import { useState, useEffect } from "react";
import { Lang } from "../dictionary";
import { DonateButton } from "../DonateButton";

// Helper hook for LocalStorage
export function useLocalState<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [state, setState] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(key);
    if (stored) {
      try { setState(JSON.parse(stored)); } catch (e) {}
    }
  }, [key]);

  const setValue = (value: T) => {
    setState(value);
    if (mounted) localStorage.setItem(key, JSON.stringify(value));
  };

  return [state, setValue];
}

// Common CSS Classes
export const inputClass = "w-full px-4 py-3.5 bg-gray-50/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/40 dark:focus:ring-blue-400/40 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300";
export const labelClass = "block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 tracking-wide";

// Numeric Input with Comma Auto-format
export function NumericInput({ 
  value, 
  onChange, 
  placeholder, 
  min, 
  max, 
  step,
  required,
  className
}: { 
  value: number | string; 
  onChange: (val: string) => void; 
  placeholder?: string;
  min?: number | string;
  max?: number | string;
  step?: string;
  required?: boolean;
  className?: string;
}) {
  const [displayValue, setDisplayValue] = useState(value ? Number(value).toLocaleString("en-US", { maximumFractionDigits: 10 }) : "");

  useEffect(() => {
    if (value === "") setDisplayValue("");
    else {
      const rawNum = String(value);
      if (rawNum !== displayValue.replace(/,/g, '')) {
         const parts = rawNum.split('.');
         parts[0] = Number(parts[0]).toLocaleString("en-US");
         setDisplayValue(parts.join('.'));
      }
    }
  }, [value, displayValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.-]/g, '');
    
    if (raw === "" || raw === "-") {
      setDisplayValue(raw);
      onChange("");
      return;
    }

    if (raw.endsWith('.')) {
      setDisplayValue(Number(raw.slice(0, -1)).toLocaleString("en-US") + ".");
      onChange(raw);
      return;
    }
    
    const num = Number(raw);
    if (!isNaN(num)) {
      const parts = raw.split('.');
      parts[0] = Number(parts[0]).toLocaleString("en-US");
      setDisplayValue(parts.join('.'));
      onChange(raw);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={className || inputClass}
      min={min}
      max={max}
      step={step}
      required={required}
    />
  );
}

// SEO & FAQ Component
export function SEOFAQ({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10 text-sm text-gray-700 dark:text-gray-300 text-left">
      <h3 className="font-black text-xl text-gray-900 dark:text-white mb-6 text-center">{title}</h3>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

export function FAQItem({ q, a, isStep }: { q: string, a: React.ReactNode | string, isStep?: boolean }) {
  return (
    <div className={isStep ? "bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10" : ""}>
      <h4 className={`font-bold text-gray-900 dark:text-white ${isStep ? "mb-2 text-deep-teal dark:text-soft-mint" : "mb-1"}`}>{q}</h4>
      <div className="leading-relaxed text-gray-600 dark:text-gray-400">{a}</div>
    </div>
  );
}

export function CalculationSteps({ title, steps }: { title: string, steps: React.ReactNode }) {
  return (
    <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 p-5 rounded-xl text-left">
      <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        {title}
      </h4>
      <div className="text-sm text-blue-900 dark:text-blue-200 space-y-2">
        {steps}
      </div>
    </div>
  );
}

// Export Result (Save as Image) Component
export function ExportResult({ elementId, fileName, lang }: { elementId: string, fileName: string, lang: Lang }) {
  const exportImage = async () => {
    try {
      const element = document.getElementById(elementId);
      if (!element) return;
      
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(element, { backgroundColor: null });
      const dataUrl = canvas.toDataURL("image/png");
      
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error exporting image", err);
    }
  };

  return (
    <button 
      onClick={exportImage}
      className="mt-4 px-4 py-2 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-bold transition-colors inline-flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
      {lang === "TH" ? "บันทึกเป็นรูปภาพ" : "Save as Image"}
    </button>
  );
}

// Internal Linking (Related Calculators)
export function RelatedCalcs({ links, lang, setCalc }: { links: {id: string, name: string}[], lang: Lang, setCalc: (id: string) => void }) {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10">
      <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3">{lang === "TH" ? "เครื่องมือที่เกี่ยวข้อง:" : "Related Tools:"}</h4>
      <div className="flex flex-wrap gap-2 mb-6">
        {links.map(l => (
          <button 
            key={l.id} 
            onClick={() => setCalc(l.id)}
            className="px-3 py-1 bg-gray-100 dark:bg-white/5 hover:bg-deep-teal hover:text-white dark:hover:bg-soft-mint dark:hover:text-black rounded-full text-xs font-bold transition-colors"
          >
            {l.name}
          </button>
        ))}
      </div>
      
      <div className="pt-6 border-t border-gray-100 dark:border-white/5 text-center">
        <DonateButton lang={lang} type="button" />
      </div>
    </div>
  );
}
