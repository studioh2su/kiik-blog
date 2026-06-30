type Section = {
  title: string;
  content: React.ReactNode;
};

type Props = {
  step: string;
  title: string;
  desc: string;
  tags: string[];
  sections: Section[];
  prev?: { href: string; label: string };
  next?: { href: string; label: string };
};

export default function DocPage({ step, title, desc, tags, sections, prev, next }: Props) {
  return (
    <div>
      <div className="mb-2" style={{ color: "var(--accent)", fontWeight: 700, fontSize: "0.8rem", letterSpacing: 1 }}>
        STEP {step}
      </div>
      <h1 className="text-3xl font-bold mb-3">{title}</h1>
      <p className="mb-6" style={{ color: "var(--light)", lineHeight: 1.75 }}>{desc}</p>
      <div className="flex gap-2 flex-wrap mb-10">
        {tags.map((tag) => (
          <span
            key={tag}
            style={{ background: "var(--border)", color: "var(--light)", fontSize: "0.7rem", padding: "2px 10px", borderRadius: 4 }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-10">
        {sections.map((s, i) => (
          <section key={i}>
            <h2 className="text-lg font-bold mb-4 pb-2" style={{ borderBottom: "1px solid var(--border)" }}>
              {s.title}
            </h2>
            <div style={{ color: "var(--light)", lineHeight: 1.8 }}>{s.content}</div>
          </section>
        ))}
      </div>

      <div className="flex justify-between mt-16 pt-8" style={{ borderTop: "1px solid var(--border)" }}>
        {prev ? (
          <a href={prev.href} style={{ color: "var(--light)" }} className="text-sm hover:text-white">
            ← {prev.label}
          </a>
        ) : <span />}
        {next ? (
          <a href={next.href} style={{ color: "var(--accent)" }} className="text-sm hover:opacity-80">
            {next.label} →
          </a>
        ) : <span />}
      </div>
    </div>
  );
}
