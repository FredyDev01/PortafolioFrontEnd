import swal from "sweetalert2";

export function showMessage({ err, tlt, msg }) {
  swal.fire({
    icon: err ? "error" : "success",
    title: tlt,
    html: `<p class="text-sm">${msg}</p>`,
  });
}
export async function confirmMessage({ tlt, msg }) {
  const result = await swal.fire({
    icon: "question",
    title: tlt,
    html: `<p class="text-sm">${msg}</p>`,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Eliminar",
  });
  return result.isConfirmed;
}
export function loadingMessage({ tlt, msg }) {
  swal.fire({
    title: tlt,
    html: `                       
            <div class="flex justify-center items-center mx-auto"><span class="loader text-indigo-500 dark:text-emerald-600"></span></div>
            <p class="text-sm mt-5" style="margin-bottom: 10px">${msg}</p>                        
    `,
    showConfirmButton: false,
  });
}
export function closeMessage() {
  swal.close();
}
