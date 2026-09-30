import { Fragment } from "react";

/** Pinta un texto del diccionario que puede traer <br> y <em> (y &amp;) sin usar innerHTML. */
export function Rich({ text }: { text: string }) {
  const parts = text.replace(/&amp;/g, "&").split(/(<br\s*\/?>|<em>.*?<\/em>)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (/^<br/.test(p)) return <br key={i} />;
        if (p.startsWith("<em>")) return <em key={i}>{p.slice(4, -5)}</em>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
