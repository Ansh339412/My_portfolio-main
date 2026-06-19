import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Check, Loader2, Github, Linkedin, Twitter } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { sendContactNotification } from "@/lib/contact-email.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Anshpreet Singh" },
      { name: "description", content: "Get in touch with Anshpreet Singh for project inquiries, collaborations, or just to say hello." },
      { property: "og:title", content: "Contact — Anshpreet Singh" },
      { property: "og:description", content: "Let's discuss your next project." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const contactInfo = [
  { icon: Mail, label: "Email", value: "anshpreetoneplus@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 7657872974" },
  { icon: MapPin, label: "Location", value: "Hoshiarpur, Punjab, India" },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/Ansh339412" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anshpreet-singh-57974b202/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/Anshpreetdev_09" },
];

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ---------------- Ambient background ---------------- */
function AmbientBackdrop() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* drifting gold blobs in figure-8 */}
      {!reduce && (
        <>
          <motion.div
            className="absolute -top-32 left-1/4 h-[460px] w-[460px] rounded-full"
            style={{
              background: "radial-gradient(closest-side, rgba(245,200,76,0.14), transparent 70%)",
              filter: "blur(100px)",
            }}
            animate={{ x: [0, 120, 0, -120, 0], y: [0, 80, 160, 80, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-[520px] w-[520px] rounded-full"
            style={{
              background: "radial-gradient(closest-side, rgba(234,198,3,0.10), transparent 70%)",
              filter: "blur(120px)",
            }}
            animate={{ x: [0, -100, 0, 100, 0], y: [0, -60, -140, -60, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      {/* faint grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,200,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245,200,76,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />
    </div>
  );
}

/* ---------------- Animated input ---------------- */
function FieldInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  textarea,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const baseClass =
    "w-full rounded-xl border bg-black/40 px-4 text-sm text-white placeholder:text-white/30 outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-out";
  const stateClass = error
    ? "border-red-500/60"
    : focused
      ? "border-[#f5c84c]/70"
      : "border-white/10";

  const glow = focused
    ? "0 0 0 4px rgba(245,200,76,0.10), 0 0 22px rgba(245,200,76,0.18)"
    : "0 0 0 0 rgba(0,0,0,0)";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">
        {label}
      </label>
      {textarea ? (
        <motion.textarea
          id={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          animate={{ boxShadow: glow }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`${baseClass} ${stateClass} resize-y py-3 leading-relaxed`}
        />
      ) : (
        <motion.input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          animate={{ boxShadow: glow }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`${baseClass} ${stateClass} h-12`}
        />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-1.5 text-xs text-red-400/90"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Page ---------------- */
function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formState.name.trim()) errs.name = "Name is required";
    if (!formState.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errs.email = "Invalid email address";
    }
    if (!formState.subject.trim()) errs.subject = "Subject is required";
    if (!formState.message.trim() || formState.message.length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      subject: formState.subject.trim(),
      message: formState.message.trim(),
    };
    const { error } = await supabase.from("contact_submissions").insert(payload);
    if (error) {
      setStatus("idle");
      toast.error("Could not send your message. Please try again.");
      return;
    }
    try {
      await sendContactNotification({ data: payload });
    } catch (err) {
      console.error("Email notification failed", err);
    }
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 2600);
  };

  return (
    <main className="bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <AmbientBackdrop />
        <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EXPO_OUT }}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#f5c84c]"
          >
            Contact
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EXPO_OUT }}
            className="mt-5 font-heading text-5xl leading-[1.05] tracking-tight md:text-7xl"
          >
            Let&apos;s Talk
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EXPO_OUT }}
            className="mx-auto mt-6 max-w-xl text-base text-[#9ca3af] md:text-lg"
          >
            Open to freelance projects, collaborations, and conversations about software craft — I usually reply within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Main */}
      <section ref={ref} className="relative pb-32">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-5 lg:gap-20">
            {/* Left column */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="lg:col-span-2"
            >
              <h2 className="font-heading text-3xl text-white md:text-4xl">Get in Touch</h2>
              <p className="mt-4 max-w-md leading-relaxed text-[#9ca3af]">
                Currently available for freelance and full-time work. Drop a line about your project, an idea, or just to say hi — I&apos;ll respond within 24 hours.
              </p>

              <div className="mt-10 space-y-5">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.07, ease: "easeOut" }}
                    className="group flex items-center gap-4"
                  >
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-[#f5c84c]/15 bg-white/[0.03] text-[#f5c84c] transition-all duration-200 ease-out group-hover:border-[#f5c84c]/50 group-hover:bg-[#f5c84c]/[0.06] group-hover:shadow-[0_0_22px_rgba(245,200,76,0.25)]">
                      <info.icon className="h-5 w-5 transition-colors duration-200 group-hover:text-[#ffd766]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">{info.label}</p>
                      <p className="mt-0.5 text-[15px] font-medium text-white">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.4, ease: "easeOut" }}
                className="mt-12"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">Follow Me</p>
                <div className="mt-4 flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/65 transition-all duration-200 ease-out hover:scale-[1.08] hover:border-[#f5c84c] hover:text-[#f5c84c] hover:shadow-[0_0_18px_rgba(245,200,76,0.3)]"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Form card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="relative lg:col-span-3"
            >
              {/* ambient glow behind card */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 -z-10"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 40%, rgba(245,200,76,0.18), transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-sm md:p-10">
                {/* corner gold hairline */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-[#f5c84c]/10" />

                <form onSubmit={handleSubmit} className="relative space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FieldInput
                      id="name"
                      label="Name"
                      value={formState.name}
                      onChange={(v) => setFormState((s) => ({ ...s, name: v }))}
                      placeholder="Your name"
                      error={errors.name}
                    />
                    <FieldInput
                      id="email"
                      label="Email"
                      type="email"
                      value={formState.email}
                      onChange={(v) => setFormState((s) => ({ ...s, email: v }))}
                      placeholder="your@email.com"
                      error={errors.email}
                    />
                  </div>
                  <FieldInput
                    id="subject"
                    label="Subject"
                    value={formState.subject}
                    onChange={(v) => setFormState((s) => ({ ...s, subject: v }))}
                    placeholder="Project inquiry"
                    error={errors.subject}
                  />
                  <FieldInput
                    id="message"
                    label="Message"
                    textarea
                    value={formState.message}
                    onChange={(v) => setFormState((s) => ({ ...s, message: v }))}
                    placeholder="Tell me about your project..."
                    error={errors.message}
                  />

                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={status !== "idle"}
                      whileHover={status === "idle" ? { scale: 1.03 } : {}}
                      whileTap={status === "idle" ? { scale: 0.97 } : {}}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="group relative inline-flex h-12 min-w-[180px] items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 text-sm font-semibold text-black shadow-[0_8px_30px_rgba(255,255,255,0.08)] transition-shadow duration-200 hover:shadow-[0_14px_40px_rgba(245,200,76,0.25)] disabled:opacity-90"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {status === "idle" && (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-2"
                          >
                            Send Message
                            <Send className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                          </motion.span>
                        )}
                        {status === "submitting" && (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-2"
                          >
                            Sending
                            <Loader2 className="h-4 w-4 animate-spin" />
                          </motion.span>
                        )}
                        {status === "success" && (
                          <motion.span
                            key="success"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center gap-2 text-[#0a7d2c]"
                          >
                            Message sent
                            <Check className="h-4 w-4" strokeWidth={3} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
