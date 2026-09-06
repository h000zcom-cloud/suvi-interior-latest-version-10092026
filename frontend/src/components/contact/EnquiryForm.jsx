import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { projectTypes, site } from "@/content/site";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = (type) => ({ name: "", phone: "", email: "", project_type: type && projectTypes.includes(type) ? type : "", budget: "", message: "" });

export const EnquiryForm = ({ presetType }) => {
  const [form, setForm] = useState(() => initial(presetType));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) er.phone = "Please enter a valid phone number.";
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = "Please enter a valid email address.";
    if (!form.project_type) er.project_type = "Please choose a project type.";
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("loading");
    setServerError("");
    try {
      await axios.post(`${API}/enquiries`, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        project_type: form.project_type,
        budget: form.budget.trim() || null,
        message: form.message.trim() || null,
        source_page: window.location.pathname,
      });
      setStatus("success");
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setServerError(Array.isArray(detail) ? detail.map((d) => d.msg?.replace("Value error, ", "")).join(" ") : "Something went wrong. Please try again or call us directly.");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="border-t border-line pt-10" data-testid="contact-success" role="status">
          <p className="label flex items-center gap-4 text-taupe"><span className="h-px w-8 bg-burgundy" />Enquiry received</p>
          <p className="h-section mt-6">
            Thank <span className="italic normal-case">you.</span>
          </p>
          <p className="lede mt-6 max-w-md">
            Your enquiry has been received. The {site.name} team will get in touch with you shortly.
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="grid gap-8 sm:grid-cols-2" data-testid="contact-form">
          <Field label="Name" error={errors.name} className="sm:col-span-1">
            <input id="name" data-testid="contact-name-input" className="field" value={form.name} onChange={set("name")} autoComplete="name" placeholder="Your name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "error-name" : undefined} />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <input id="phone" data-testid="contact-phone-input" className="field" type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" placeholder="+91" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "error-phone" : undefined} />
          </Field>
          <Field label="Email" hint="Optional" error={errors.email}>
            <input id="email" data-testid="contact-email-input" className="field" type="email" value={form.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "error-email" : undefined} />
          </Field>
          <Field label="Project Type" error={errors.project_type}>
            <select id="project_type" data-testid="contact-project-type-select" className={cn("field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%2712%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%236B6257%27 stroke-width=%271.5%27><path d=%27M6 9l6 6 6-6%27/></svg>')] bg-[length:12px] bg-[right_0_center] bg-no-repeat pr-6", !form.project_type && "text-taupe/70")} value={form.project_type} onChange={set("project_type")} required aria-invalid={Boolean(errors.project_type)} aria-describedby={errors.project_type ? "error-project_type" : undefined}>
              <option value="" disabled>
                Select a project type
              </option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Approximate Budget" hint="Optional" className="sm:col-span-2">
            <input id="budget" data-testid="contact-budget-input" className="field" value={form.budget} onChange={set("budget")} placeholder="A rough range is enough — it helps us plan the right approach" />
          </Field>
          <Field label="Message" hint="Optional" className="sm:col-span-2">
            <textarea id="message" data-testid="contact-message-input" className="field min-h-[120px] resize-y" value={form.message} onChange={set("message")} placeholder="Tell us about your space, timeline and ideas." rows={4} />
          </Field>

          <div className="sm:col-span-2 flex flex-col gap-5 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" disabled={status === "loading"} data-testid="contact-submit-button" className="btn-solid disabled:opacity-60">
              {status === "loading" ? "Sending…" : "Request a Consultation"}
            </button>
            <p className="text-xs text-taupe">We'll only use these details to respond to your enquiry.</p>
          </div>
          {status === "error" && (
            <p className="sm:col-span-2 text-sm text-burgundy" role="alert" data-testid="contact-error">
              {serverError}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
};

const Field = ({ label, hint, error, children, className }) => (
  <div className={className}>
    <label htmlFor={children.props.id} className="field-label flex items-baseline justify-between">
      <span>{label}</span>
      {hint && <span className="normal-case tracking-normal text-taupe/70">{hint}</span>}
    </label>
    {children}
    {error && (
      <p id={`error-${children.props.id}`} className="mt-2 text-xs text-burgundy" role="alert" data-testid={`error-${children.props.id}`}>
        {error}
      </p>
    )}
  </div>
);
