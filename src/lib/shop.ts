/** Reglas de la tienda: moneda, envío y departamentos. Se usan igual en el cliente (resumen) y en el servidor (cálculo real). */

/** Desde este monto (COP) el envío es gratis. */
export const FREE_SHIPPING = 250_000;
/** Tarifas planas (COP). */
export const SHIPPING_LOCAL = 8_000; // Cartagena y Bolívar
export const SHIPPING_NATIONAL = 15_000; // resto de Colombia
export const LOCAL_DEPARTMENT = "Bolívar";

export const DEPARTMENTS = [
  "Amazonas", "Antioquia", "Arauca", "Atlántico", "Bogotá D.C.", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare",
  "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena",
  "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander",
  "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada",
] as const;

export function shippingCost(department: string, subtotal: number): number {
  if (subtotal >= FREE_SHIPPING) return 0;
  return department === LOCAL_DEPARTMENT ? SHIPPING_LOCAL : SHIPPING_NATIONAL;
}

/** $112.000 */
export const cop = (n: number): string => "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
