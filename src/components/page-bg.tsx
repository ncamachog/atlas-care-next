/** Cambia la foto de fondo desenfocada de la página (por defecto: Cartagena). */
export default function PageBg({ img }: { img: string }) {
  return <style>{`:root{--a-bg:url('/img/${img}')}`}</style>;
}
