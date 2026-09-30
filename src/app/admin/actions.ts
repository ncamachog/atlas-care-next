"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteRequest, setRequestRead } from "@/lib/ambassadors";
import { isAdmin, login, logout } from "@/lib/auth";
import { setOrderStatus, type Order } from "@/lib/orders";

async function guard() {
  if (!(await isAdmin())) redirect("/admin");
}

export async function loginAction(_prev: { error: string } | null, formData: FormData): Promise<{ error: string }> {
  const ok = await login(String(formData.get("password") ?? ""));
  if (!ok) return { error: "Contraseña incorrecta." };
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin");
}

const STATUSES: Order["status"][] = ["new", "confirmed", "shipped", "delivered", "cancelled"];

export async function orderStatusAction(formData: FormData) {
  await guard();
  const status = String(formData.get("status")) as Order["status"];
  if (!STATUSES.includes(status)) return;
  await setOrderStatus(String(formData.get("id")), status);
  revalidatePath("/admin");
}

export async function requestReadAction(formData: FormData) {
  await guard();
  await setRequestRead(String(formData.get("id")), formData.get("read") === "1");
  revalidatePath("/admin");
}

export async function requestDeleteAction(formData: FormData) {
  await guard();
  await deleteRequest(String(formData.get("id")));
  revalidatePath("/admin");
}
