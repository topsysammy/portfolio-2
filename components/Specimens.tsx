"use client";
import { useState } from "react";
import { bestText } from "@/lib/contrast";
import { copyText } from "./CopyEmail";
import type { Swatch } from "@/lib/projects";

export function Palette({ swatches }: { swatches: Swatch[] }) {
  return (
    <div className="swatches">
      {swatches.map((s) => {
        const t = bestText(s.hex);
        return (
          <button key={s.hex + s.name} type="button" className="swatch" onClick={() => copyText(s.hex, `${s.hex} copied`)} aria-label={`${s.name} ${s.hex}, copy`}>
            <div className="swatch-chip" style={{ background: s.hex, color: t.fg }}>
              <span className="aa" style={{ color: t.fg }}>{t.grade} {t.ratio.toFixed(1)}:1</span>
              <span className="Aa">Aa</span>
            </div>
            <div className="swatch-values">
              <b>{s.name}</b>
              <span>{s.hex}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function TypeSpecimen({ family, varName, weights, note, sample, className }: { family: string; varName: string; weights: number[]; note: string; sample: string; className: string }) {
  const [size, setSize] = useState(72);
  const [w, setW] = useState(weights[weights.length - 1]);
  return (
    <div className={`spec ${className}`}>
      <div className="spec-top">
        <b>{family}</b>
        <span>{size}px · {w} · click the sample to type</span>
      </div>
      <p
        className="spec-sample"
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        style={{ fontFamily: `var(${varName})`, fontSize: size, fontWeight: w }}
      >
        {sample}
      </p>
      <div className="spec-controls">
        <label>
          size
          <input type="range" min={14} max={128} value={size} onChange={(e) => setSize(+e.target.value)} />
        </label>
        <div className="weights" role="group" aria-label="Font weight">
          {weights.map((x) => (
            <button key={x} type="button" className={x === w ? "is-on" : ""} aria-pressed={x === w} onClick={() => setW(x)}>{x}</button>
          ))}
        </div>
      </div>
      <p className="spec-note">{note}</p>
    </div>
  );
}
