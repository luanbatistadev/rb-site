"use client";

import { useEffect, useState, useMemo, memo } from "react";
import Image from "next/image";
import { pickRandomBg } from "@/lib/background-images";

type Token = { text: string; color: string };
type Line = {
  tokens: Token[];
  indent: number;
  triggers?: "section";
};

const PUNCT = "text-white/80";
const KW = "text-purple-400";
const FN = "text-yellow-300";
const COMP = "text-rose-400";
const STR = "text-emerald-400";
const PROP = "text-sky-300";
const TEXT = "text-white/90";

type CodePreviewDict = {
  tag: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  button: string;
};

function buildLines(dict: CodePreviewDict): Line[] {
  return [
    { indent: 0, tokens: [{ text: "import", color: KW }, { text: " { motion } ", color: TEXT }, { text: "from", color: KW }, { text: " ", color: PUNCT }, { text: "\"framer-motion\"", color: STR }, { text: ";", color: PUNCT }] },
    { indent: 0, tokens: [{ text: "import", color: KW }, { text: " { Tag } ", color: TEXT }, { text: "from", color: KW }, { text: " ", color: PUNCT }, { text: "\"@/components/ui/tag\"", color: STR }, { text: ";", color: PUNCT }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ text: "export default function ", color: KW }, { text: "Hero", color: FN }, { text: "() {", color: PUNCT }] },
    { indent: 1, tokens: [{ text: "return", color: KW }, { text: " (", color: PUNCT }] },
    { indent: 2, tokens: [{ text: "<motion.section ", color: COMP }, { text: "className", color: PROP }, { text: "=", color: PUNCT }, { text: "\"min-h-screen bg-[#0b0b0b]\"", color: STR }, { text: ">", color: PUNCT }], triggers: "section" },
    { indent: 3, tokens: [{ text: "<Tag ", color: COMP }, { text: "variant", color: PROP }, { text: "=", color: PUNCT }, { text: "\"dark\"", color: STR }, { text: ">", color: PUNCT }, { text: dict.tag, color: TEXT }, { text: "</Tag>", color: COMP }] },
    { indent: 3, tokens: [{ text: "<h1 ", color: COMP }, { text: "className", color: PROP }, { text: "=", color: PUNCT }, { text: "\"text-7xl font-medium\"", color: STR }, { text: ">", color: PUNCT }] },
    { indent: 4, tokens: [{ text: dict.titleLine1, color: TEXT }] },
    { indent: 4, tokens: [{ text: dict.titleLine2, color: TEXT }] },
    { indent: 3, tokens: [{ text: "</h1>", color: COMP }] },
    { indent: 3, tokens: [{ text: "<p ", color: COMP }, { text: "className", color: PROP }, { text: "=", color: PUNCT }, { text: "\"text-white/70\"", color: STR }, { text: ">", color: PUNCT }] },
    { indent: 4, tokens: [{ text: dict.subtitle, color: TEXT }] },
    { indent: 3, tokens: [{ text: "</p>", color: COMP }] },
    { indent: 3, tokens: [{ text: "<Button>", color: COMP }, { text: dict.button, color: TEXT }, { text: "</Button>", color: COMP }] },
    { indent: 2, tokens: [{ text: "</motion.section>", color: COMP }] },
    { indent: 1, tokens: [{ text: ");", color: PUNCT }] },
    { indent: 0, tokens: [{ text: "}", color: PUNCT }] },
  ];
}

type TextSource = { lineIdx: number; tokenIdx: number; sep?: string };
const textSources: Record<"tag" | "title" | "subtitle" | "button", TextSource[]> = {
  tag: [{ lineIdx: 6, tokenIdx: 5 }],
  title: [
    { lineIdx: 8, tokenIdx: 0 },
    { lineIdx: 9, tokenIdx: 0, sep: " " },
  ],
  subtitle: [{ lineIdx: 12, tokenIdx: 0 }],
  button: [{ lineIdx: 14, tokenIdx: 1 }],
};

const TYPING_SPEED = 25;
const COMPLETION_PAUSE = 5000;
const FADE_DURATION = 600;
const RESET_PAUSE = 500;

type Phase = "typing" | "complete" | "fading" | "reset";

const LineRow = memo(function LineRow({
  line,
  lineIdx,
  lineCharsTyped,
  isCurrent,
  showCursor,
}: {
  line: Line;
  lineIdx: number;
  lineCharsTyped: number;
  isCurrent: boolean;
  showCursor: boolean;
}) {
  const offsets = line.tokens.reduce<number[]>((acc, tok) => {
    acc.push((acc[acc.length - 1] ?? 0) + tok.text.length);
    return acc;
  }, [0]);
  const tokensRendered = line.tokens.map((tok, tokIdx) => {
    const start = offsets[tokIdx];
    const visibleLen = Math.max(0, Math.min(tok.text.length, lineCharsTyped - start));
    if (visibleLen <= 0) return null;
    return (
      <span key={tokIdx} className={tok.color}>
        {tok.text.slice(0, visibleLen)}
      </span>
    );
  });

  return (
    <div className="flex" style={{ paddingLeft: line.indent * 12 }}>
      <span className="mr-3 inline-block w-5 text-right text-white/20 select-none text-[10px]">
        {lineIdx + 1}
      </span>
      <span className="min-h-4">
        {tokensRendered}
        {isCurrent && showCursor && (
          <span className="inline-block w-0.5 h-3 bg-accent translate-y-0.5" />
        )}
      </span>
    </div>
  );
});

function getTokenTypedChars(lines: Line[], source: TextSource, lineIdx: number, lineChars: number): number {
  if (lineIdx < source.lineIdx) return 0;
  const tok = lines[source.lineIdx].tokens[source.tokenIdx];
  if (!tok) return 0;
  if (lineIdx > source.lineIdx) return tok.text.length;
  const lineTokens = lines[source.lineIdx].tokens;
  let charsBefore = 0;
  for (let i = 0; i < source.tokenIdx; i++) charsBefore += lineTokens[i].text.length;
  const inToken = lineChars - charsBefore;
  return Math.max(0, Math.min(tok.text.length, inToken));
}

function buildText(lines: Line[], sources: TextSource[], lineIdx: number, lineChars: number): string {
  let out = "";
  for (const src of sources) {
    const typed = getTokenTypedChars(lines, src, lineIdx, lineChars);
    if (typed === 0) break;
    if (out.length > 0) out += src.sep ?? "";
    const tok = lines[src.lineIdx].tokens[src.tokenIdx];
    out += tok.text.slice(0, typed);
  }
  return out;
}

export function CodeEditorPreview({ dict }: { dict: CodePreviewDict }) {
  const lines = useMemo(() => buildLines(dict), [dict]);
  const lineLengths = useMemo(
    () => lines.map((l) => l.tokens.reduce((s, t) => s + t.text.length, 0)),
    [lines]
  );

  const [currentLineIdx, setCurrentLineIdx] = useState(-1);
  const [currentLineChars, setCurrentLineChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    setBgSrc(pickRandomBg());
  }, []);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let charTimer: ReturnType<typeof setInterval> | null = null;

    const cycle = () => {
      if (cancelled) return;
      setPhase("typing");
      setCurrentLineIdx(0);
      setCurrentLineChars(0);

      let lineIdx = 0;
      let charIdx = 0;

      charTimer = setInterval(() => {
        if (cancelled) return;
        charIdx++;

        if (charIdx > lineLengths[lineIdx]) {
          lineIdx++;
          charIdx = 0;

          if (lineIdx >= lines.length) {
            if (charTimer) clearInterval(charTimer);
            setPhase("complete");
            timers.push(
              setTimeout(() => {
                if (cancelled) return;
                setPhase("fading");
                timers.push(
                  setTimeout(() => {
                    if (cancelled) return;
                    setPhase("reset");
                    setCurrentLineIdx(-1);
                    setCurrentLineChars(0);
                    timers.push(setTimeout(cycle, RESET_PAUSE));
                  }, FADE_DURATION)
                );
              }, COMPLETION_PAUSE)
            );
            return;
          }
        }

        setCurrentLineIdx(lineIdx);
        setCurrentLineChars(charIdx);
      }, TYPING_SPEED);
    };

    cycle();

    return () => {
      cancelled = true;
      if (charTimer) clearInterval(charTimer);
      timers.forEach((t) => clearTimeout(t));
    };
  }, [lineLengths, lines.length]);

  const phoneTexts = useMemo(() => {
    if (phase === "fading" || phase === "reset" || currentLineIdx < 0) {
      return { tag: "", title: "", subtitle: "", button: "" };
    }
    return {
      tag: buildText(lines, textSources.tag, currentLineIdx, currentLineChars),
      title: buildText(lines, textSources.title, currentLineIdx, currentLineChars),
      subtitle: buildText(lines, textSources.subtitle, currentLineIdx, currentLineChars),
      button: buildText(lines, textSources.button, currentLineIdx, currentLineChars),
    };
  }, [lines, currentLineIdx, currentLineChars, phase]);

  const sectionVisible = useMemo(() => {
    if (phase === "fading" || phase === "reset" || currentLineIdx < 0) return false;
    return currentLineIdx >= 5 && (currentLineIdx > 5 || currentLineChars >= lineLengths[5]);
  }, [lineLengths, currentLineIdx, currentLineChars, phase]);

  const fadingOut = phase === "fading";
  const codeOpacity = fadingOut ? "opacity-0" : "opacity-100";
  const codeTransition = fadingOut ? "transition-opacity duration-500" : "";
  const showCursor = phase === "typing";

  return (
    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-[#0a0a0a] to-[#1a1a1a]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b lg:border-b-0 lg:border-r border-white/6">
          <div className="flex items-center gap-2 border-b border-white/6 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-4 text-xs text-white/40 font-mono">Hero.tsx</span>
          </div>

          <div className={`px-5 py-4 font-mono text-xs leading-relaxed h-105 overflow-hidden ${codeTransition} ${codeOpacity}`}>
            {lines.map((line, lineIdx) => {
              let lineCharsTyped = 0;
              if (lineIdx < currentLineIdx) lineCharsTyped = lineLengths[lineIdx];
              else if (lineIdx === currentLineIdx) lineCharsTyped = currentLineChars;

              return (
                <LineRow
                  key={lineIdx}
                  line={line}
                  lineIdx={lineIdx}
                  lineCharsTyped={lineCharsTyped}
                  isCurrent={lineIdx === currentLineIdx}
                  showCursor={showCursor}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center p-8 bg-linear-to-br from-[#101020] to-[#0a0a0a] min-h-105">
          <PhonePreview texts={phoneTexts} sectionVisible={sectionVisible} bgSrc={bgSrc} />
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
    </div>
  );
}

type PhoneTexts = { tag: string; title: string; subtitle: string; button: string };

const PhonePreview = memo(function PhonePreview({
  texts,
  sectionVisible,
  bgSrc,
}: {
  texts: PhoneTexts;
  sectionVisible: boolean;
  bgSrc: string;
}) {
  const fadeBase = "transition-opacity duration-200 ease-out";

  return (
    <div className="relative w-56 aspect-9/19 rounded-[2.5rem] bg-[#0a0a0a] border-[3px] border-[#1a1a1a] shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_0_0_2px_rgba(255,255,255,0.04)] overflow-hidden">
      <div className="absolute inset-1 rounded-[2.2rem] overflow-hidden bg-[#0b0b0b]">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-5 w-20 rounded-full bg-black" />

        <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-5 pt-1.5 text-[9px] font-semibold text-white/90">
          <span>9:41</span>
          <span className="inline-block w-3 h-2 border border-white/70 rounded-sm relative">
            <span className="absolute inset-0.5 bg-white/70 rounded-[1px]" />
          </span>
        </div>

        {bgSrc && (
          <Image
            src={bgSrc}
            alt=""
            fill
            sizes="224px"
            className={`object-cover transition-opacity duration-500 ease-out ${sectionVisible ? "opacity-100" : "opacity-0"}`}
          />
        )}
        <div className={`absolute inset-0 bg-black/55 transition-opacity duration-500 ${sectionVisible ? "opacity-100" : "opacity-0"}`} />

        <div className="relative h-full flex flex-col items-center justify-center pt-12 pb-12 px-5 gap-3 text-center z-10">
          <div className={`${fadeBase} rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[8px] text-white/80 backdrop-blur-sm ${texts.tag ? "opacity-100" : "opacity-0"}`}>
            &lt;/&gt; {texts.tag || " "}
          </div>

          <div className={`${fadeBase} text-white text-base font-medium leading-tight tracking-tight uppercase whitespace-pre-line min-h-12 ${texts.title ? "opacity-100" : "opacity-0"}`}>
            {texts.title || " "}
          </div>

          <div className={`${fadeBase} text-white/60 text-[8px] leading-snug px-2 ${texts.subtitle ? "opacity-100" : "opacity-0"}`}>
            {texts.subtitle || " "}
          </div>

          <div className={`${fadeBase} mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 pl-3 pr-1 py-0.5 text-[7px] font-medium uppercase tracking-wide text-white ${texts.button ? "opacity-100" : "opacity-0"}`}>
            {texts.button || " "}
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-linear-to-r from-[#00b6aa] to-[#00a5e7]">
              <svg width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-16 rounded-full bg-white/30 z-20" />
      </div>
    </div>
  );
});
