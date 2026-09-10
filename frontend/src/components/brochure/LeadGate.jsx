import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download, X } from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
export const PDF_URL = `${API}/brochure.pdf`;
const KEY = "suvi-brochure-lead";

const GateContext = createContext({ unlocked: false, request: () => {} });
export const useGate = () => useContext(GateContext);

export const GateProvider = ({ children }) => {
  const [unlocked, setUnlocked] = useState(() => window.localStorage.getItem(KEY) === "1");
  const [open, setOpen] = useState(false);
  const request = () => setOpen(true);
  const unlock = () => {
    window.localStorage.setItem(KEY, "1");
    setUnlocked(true);
  };
  return (
    <GateContext.Provider value={{ unlocked, request }}>
      {children}
      <LeadGate open={open} onClose={() => setOpen(false)} onUnlock={unlock} />
    </GateContext.Provider>
  );
};

export const DownloadButton = ({ className = "btn-brand", testId = "brochure-download-btn", compact = false }) => {
  const { unlocked, request } = useGate();
  const label = (
    <>
      <Download className="h-4 w-4 shrink-0" strokeWidth={1.5} /> Download{compact ? <span className="hidden sm:inline"> PDF</span> : " PDF"}
    </>
  );
  if (unlocked) {
    return (
      <a href={PDF_URL} download="Suvi-Interior-Brochure.pdf" target="_blank" rel="noopener noreferrer" data-testid={testId} data-unlocked="true" className={cn(className, "whitespace-nowrap")}>
        {label}
      </a>
    );
  }
  return (
    <button type="button" onClick={request} data-testid={testId} data-unlocked="false" className={cn(className, "whitespace-nowrap")}>
      {label}
    </button>
  );
};

const LeadGate = ({ open, onClose, onUnlock }) => {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) er.phone = "Please enter a valid WhatsApp number.";
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("loading");
    try {
      await axios.post(`${API}/enquiries`, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        project_type: "Other",
        requirement: "Brochure download",
        message: "Requested the studio brochure (PDF).",
        source_page: "/brochure",
      });
      onUnlock();
      setStatus("success");
      window.open(PDF_URL, "_blank", "noopener");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} data-testid="brochure-gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
          <button type="button" aria-label="Close" onClick={onClose} className="glass-dark absolute inset-0" />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative w-full max-w-lg bg-ivory px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-8 text-charcoal sm:px-10 sm:py-12"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-oxblood" aria-hidden="true" />
            <button type="button" onClick={onClose} data-testid="gate-close-button" aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-taupe transition-colors hover:text-oxblood">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>

            {status === "success" ? (
              <div data-testid="gate-success">
                <p className="label flex items-center gap-4 text-taupe">
                  <span className="h-px w-8 bg-oxblood" />
                  Ready
                </p>
                <h2 id="gate-title" className="h-section mt-5">
                  Thank <span className="italic">you.</span>
                </h2>
                <p className="mt-5 max-w-sm text-[15px] leading-[1.75] text-taupe">Your brochure should open in a new tab. If it didn't, use the link below — the studio will also be in touch on WhatsApp.</p>
                <a href={PDF_URL} download="Suvi-Interior-Brochure.pdf" target="_blank" rel="noopener noreferrer" data-testid="gate-pdf-link" className="btn-brand mt-8">
                  <Download className="h-4 w-4" strokeWidth={1.5} /> Open the PDF
                </a>
              </div>
            ) : (
              <form onSubmit={submit} noValidate data-testid="gate-form">
                <p className="label flex items-center gap-4 text-taupe">
                  <span className="h-px w-8 bg-oxblood" />
                  Studio Brochure
                </p>
                <h2 id="gate-title" className="h-sub mt-5">
                  Your copy of the <span className="italic">brochure.</span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-taupe">Leave your name and WhatsApp number and the PDF opens instantly. We'll only use it to follow up about your project.</p>

                <div className="mt-8 grid gap-6">
                  <div>
                    <label htmlFor="gate-name" className="field-label">
                      Name
                    </label>
                    <input id="gate-name" data-testid="gate-name-input" className="field" value={form.name} onChange={set("name")} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} />
                    {errors.name && (
                      <p className="mt-2 text-xs text-oxblood" role="alert" data-testid="gate-error-name">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="gate-phone" className="field-label">
                      WhatsApp number
                    </label>
                    <input id="gate-phone" data-testid="gate-phone-input" className="field" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+91" aria-invalid={Boolean(errors.phone)} />
                    {errors.phone && (
                      <p className="mt-2 text-xs text-oxblood" role="alert" data-testid="gate-error-phone">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" disabled={status === "loading"} data-testid="gate-submit-button" className="btn-brand disabled:opacity-60">
                    {status === "loading" ? "One moment…" : "Unlock the PDF"} <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <p className="text-xs text-taupe">7 pages · A4 · 3 MB</p>
                </div>
                {status === "error" && (
                  <p className="mt-4 text-sm text-oxblood" role="alert" data-testid="gate-error">
                    Something went wrong. Please try again or WhatsApp us directly.
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
