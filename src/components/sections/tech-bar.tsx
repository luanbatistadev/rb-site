"use client";

const technologies = [
  {
    name: "Swift",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M27.2 22.4c.1-.5.2-1 .2-1.6 0-3.2-1.8-6.8-5-10 1.4 2.4 2.2 5 2 7.4-3.4-2.4-6.6-5.4-9.2-8.8 2 2.8 4.4 5.2 7 7.2-2.2-1-5.6-4-8.2-7 1.8 2.8 4 5.2 6.4 7.2-3-1.4-6.8-4.6-9-7.4.4.6.8 1.2 1.4 1.8 2.8 3.4 6.2 6.4 10 8.4-1.8 1.8-4.4 2.8-7.2 2.6 4.2 2 9 2 12.6-.2.2-.2.4-.2.6-.4 1-.6 1.8-1.6 2-2.8.2-.8-.2-1.6-.6-2.4z"
            fill="#F05138"
          />
        </svg>
        <span style={{ color: "#F05138" }}>Swift</span>
      </span>
    ),
  },
  {
    name: "Flutter",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg
          width="28"
          height="32"
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M16 0L0 16l5 5L21 5h-5z" fill="#42A5F5" />
          <path d="M16 16L5 27l5 5L26 16h-5z" fill="#42A5F5" />
          <path d="M5 27l5.5-5.5L16 27l-5.5 5z" fill="#0D47A1" />
        </svg>
        <span style={{ color: "#027DFD" }}>Flutter</span>
      </span>
    ),
  },
  {
    name: "Next.js",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-extrabold tracking-tight select-none">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="16" cy="16" r="15" fill="#000" />
          <path
            d="M21.5 22V10h-1.2v10.2L12.4 10H11v12h1.2V11.6l8.3 10.8z"
            fill="#fff"
          />
        </svg>
        <span className="text-black">NEXT.js</span>
      </span>
    ),
  },
  {
    name: "Kotlin",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="kotlin-grad"
              x1="0"
              y1="0"
              x2="32"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#7F52FF" />
              <stop offset="50%" stopColor="#C811E2" />
              <stop offset="100%" stopColor="#E54857" />
            </linearGradient>
          </defs>
          <path d="M0 32L16 16 32 32H0z" fill="url(#kotlin-grad)" />
          <path d="M0 0h32L16 16 0 32V0z" fill="url(#kotlin-grad)" />
        </svg>
        <span
          style={{
            background: "linear-gradient(135deg, #7F52FF, #C811E2, #E54857)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Kotlin
        </span>
      </span>
    ),
  },
  {
    name: "Node.js",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16 1.6L3.2 9v12.8L16 30.4l12.8-8.8V9L16 1.6z"
            fill="#339933"
          />
          <path
            d="M16 8v16l-6.4-4V12L16 8z"
            fill="#fff"
            fillOpacity="0.3"
          />
        </svg>
        <span style={{ color: "#339933" }}>node.js</span>
      </span>
    ),
  },
];

export default function TechBar() {
  return (
    <section data-testid="tech-bar" className="bg-white py-8 overflow-hidden relative">
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
        style={{
          background:
            "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
        }}
      />

      <div className="animate-marquee flex w-max items-center gap-16">
        {technologies.map((tech) => (
          <div key={tech.name} className="shrink-0 px-6">
            {tech.render()}
          </div>
        ))}
        {technologies.map((tech) => (
          <div key={`${tech.name}-dup`} className="shrink-0 px-6">
            {tech.render()}
          </div>
        ))}
      </div>
    </section>
  );
}
