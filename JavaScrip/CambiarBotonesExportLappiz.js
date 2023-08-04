if (
  window.location.href.includes(
    "appViewId=4d30aefa-1731-4a1c-8b49-14b1e77e5ee7"
  )
) {
  setTimeout(() => {
    /* cambiar nombre boton excel */
    document.querySelector(
      "#grid1 > div.k-header.k-grid-toolbar > a.k-button.k-button-icontext.k-grid-excel"
    ).innerHTML = '<span class="k-icon k-i-file-excel"></span>Exportar a Excel';
    /* cambiar nombre boton pdf */
    document.querySelector(
      "#grid1 > div.k-header.k-grid-toolbar > a.k-button.k-button-icontext.k-grid-pdf"
    ).innerHTML = '<span class="k-icon k-i-file-pdf"></span>Exportar a Pdf';
  }, 200);
}
