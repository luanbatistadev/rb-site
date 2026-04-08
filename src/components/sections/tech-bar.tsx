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
  {
    name: "React",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="16" cy="16" r="3" fill="#61DAFB" />
          <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" />
          <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="14" ry="5.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)" />
        </svg>
        <span style={{ color: "#61DAFB" }}>React</span>
      </span>
    ),
  },
  {
    name: "TypeScript",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect width="32" height="32" rx="4" fill="#3178C6" />
          <path d="M18.5 16.5v9.2c.6.3 1.3.5 2.1.6.8.1 1.5.2 2.3.2.8 0 1.5-.1 2.2-.3.7-.2 1.2-.5 1.7-.9.5-.4.8-.9 1.1-1.5.3-.6.4-1.3.4-2.1 0-.6-.1-1.1-.3-1.6-.2-.4-.5-.8-.8-1.2-.4-.3-.8-.6-1.3-.9-.5-.3-1-.5-1.6-.7-.4-.2-.8-.3-1.1-.5-.3-.2-.6-.3-.8-.5-.2-.2-.4-.3-.5-.5-.1-.2-.1-.4-.1-.6 0-.2 0-.4.1-.5.1-.2.2-.3.4-.4.2-.1.4-.2.7-.3.3-.1.6-.1.9-.1.3 0 .5 0 .8.1.3.1.5.1.8.2.3.1.5.2.7.4.2.1.4.3.6.5v-3.3c-.5-.2-1-.3-1.6-.4-.6-.1-1.2-.1-1.9-.1-.8 0-1.5.1-2.2.3-.7.2-1.2.5-1.7.9-.5.4-.8.9-1.1 1.4-.3.6-.4 1.2-.4 2 0 1.1.3 2 .9 2.7.6.7 1.5 1.3 2.7 1.8.4.2.9.4 1.2.5.4.2.7.4.9.5.3.2.5.4.6.6.1.2.2.4.2.7 0 .2 0 .4-.1.6-.1.2-.3.3-.5.4-.2.1-.4.2-.7.3-.3.1-.6.1-1 .1-.7 0-1.3-.1-2-.4-.6-.3-1.2-.7-1.7-1.2zM7 13.5h3.5v12H13v-12h3.5V11H7v2.5z" fill="white" />
        </svg>
        <span style={{ color: "#3178C6" }}>TypeScript</span>
      </span>
    ),
  },
  {
    name: "Figma",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5.5 32c3 0 5.5-2.5 5.5-5.5v-5.5H5.5C2.5 21 0 23.5 0 26.5S2.5 32 5.5 32z" fill="#0ACF83" />
          <path d="M0 16c0-3 2.5-5.5 5.5-5.5H11v11H5.5C2.5 21.5 0 19 0 16z" fill="#A259FF" />
          <path d="M0 5.5C0 2.5 2.5 0 5.5 0H11v11H5.5C2.5 11 0 8.5 0 5.5z" fill="#F24E1E" />
          <path d="M11 0h5.5C19.5 0 22 2.5 22 5.5S19.5 11 16.5 11H11V0z" fill="#FF7262" />
          <path d="M22 16c0 3-2.5 5.5-5.5 5.5S11 19 11 16s2.5-5.5 5.5-5.5S22 13 22 16z" fill="#1ABCFE" />
        </svg>
        <span style={{ color: "#A259FF" }}>Figma</span>
      </span>
    ),
  },
  {
    name: "Firebase",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg width="26" height="32" viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M4.4 26.6L5.8 4.8c0-.4.3-.6.6-.4L9 8.6l-4.6 18z" fill="#FFA000" />
          <path d="M16.2 13.4L13.6 8 9 .4c-.2-.4-.6-.4-.8 0L4.4 26.6l11.8-13.2z" fill="#F57C00" />
          <path d="M16.2 13.4L4.4 26.6 20.2 30c.4.2.8 0 .8-.4l3-25.8-7.8 9.6z" fill="#FFCA28" />
          <path d="M4.4 26.6L16.2 13.4 13.6 8 4.4 26.6z" fill="#F57C00" opacity="0.3" />
        </svg>
        <span style={{ color: "#FFCA28" }}>Firebase</span>
      </span>
    ),
  },
  {
    name: "Docker",
    render: () => (
      <span className="flex items-center gap-2 text-2xl font-bold select-none">
        <svg width="36" height="26" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M20 8h-4v4h4V8zM15 8h-4v4h4V8zM10 8H6v4h4V8zM25 8h-4v4h4V8zM15 3h-4v4h4V3zM20 3h-4v4h4V3zM10 3H6v4h4V3zM15 13h-4v4h4v-4zM35 11c-.7-.5-2.4-.7-3.6-.4-.2-1.4-.9-2.6-2.2-3.6l-.8-.5-.5.8c-.6 1-1 2.2-.8 3.2.1.6.3 1.2.7 1.7-.8.4-2.2.7-3.3.7H.3c-.4 2 .1 4.6 1.3 6.4 1.2 1.8 3.2 2.7 5.6 2.7 5.4 0 9.4-2.5 11.3-7 .7 0 2.3 0 3.1-1.6l.2-.4-.5-.3c-.7-.3-2.2-.5-3.3-.2z" fill="#2496ED" />
        </svg>
        <span style={{ color: "#2496ED" }}>Docker</span>
      </span>
    ),
  },
];

export default function TechBar() {
  return (
    <section data-testid="tech-bar" className="bg-background py-8 overflow-hidden relative">
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
        style={{
          background:
            "linear-gradient(to right, #f7f7f7, transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
        style={{
          background:
            "linear-gradient(to left, #f7f7f7, transparent)",
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
