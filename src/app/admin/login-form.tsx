"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <form action={action} className="a-form a-form--admin">
      <label className="a-field"><span>Contraseña</span><input name="password" type="password" autoComplete="current-password" required autoFocus /></label>
      {state?.error && <p className="a-note a-note--err" role="alert">{state.error}</p>}
      <button className="a-btn a-btn--brass" type="submit" disabled={pending}>{pending ? "Entrando…" : "Entrar"}</button>
    </form>
  );
}
