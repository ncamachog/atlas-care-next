"use client";

import { useState } from "react";
import { useLocale } from "./locale-provider";

type Status = "idle" | "sending" | "ok" | "error" | "wait";

export default function AmbassadorForm() {
  const { locale, t } = useLocale();
  const f = t.amb.form;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setStatus("sending");
    try {
      const r = await fetch("/api/ambassadors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: locale,
          name: d.get("name"), space: d.get("space"), type: d.get("type"), city: d.get("city"),
          email: d.get("email"), phone: d.get("phone"), message: d.get("message"), website: d.get("website"),
        }),
      });
      if (r.status === 429) return setStatus("wait");
      if (!r.ok) return setStatus("error");
      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") return <p className="a-note a-note--ok" role="status">{f.ok}</p>;

  return (
    <>
      {(status === "error" || status === "wait") && <p className="a-note a-note--err" role="alert">{status === "wait" ? f.wait : f.err}</p>}
      <form className="a-form" onSubmit={onSubmit}>
        <label className="a-field"><span>{f.name}</span><input name="name" required autoComplete="name" /></label>
        <label className="a-field"><span>{f.space}</span><input name="space" required autoComplete="organization" /></label>
        <div className="a-field-row">
          <label className="a-field"><span>{f.type}</span>
            <select name="type">{f.types.map((ty) => <option key={ty}>{ty}</option>)}</select>
          </label>
          <label className="a-field"><span>{f.city}</span><input name="city" required autoComplete="address-level2" /></label>
        </div>
        <div className="a-field-row">
          <label className="a-field"><span>{f.email}</span><input name="email" type="email" required autoComplete="email" /></label>
          <label className="a-field"><span>{f.phone}</span><input name="phone" type="tel" autoComplete="tel" /></label>
        </div>
        <label className="a-field"><span>{f.message}</span><textarea name="message" rows={4} /></label>
        <input type="text" name="website" className="a-hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" className="a-btn a-btn--brass a-btn--block" disabled={status === "sending"}>{f.send}</button>
      </form>
    </>
  );
}
