debugger;
let value = e.value
let campoId = '4ef7faa2-9e6f-43cb-8005-773189244935';
let values = {
    otro: "F25ACA27-0C91-42A6-B1B4-38855D12C253",
    Calamidaddomestica: "C18BE5C6-BE31-4CA1-AE4F-C63A08B636E6",
    CitamedicaARL:"F952845A-DEC5-411B-ACB9-6464648EBAB8",
    Citamedicaconespecialista:"0022638E-147A-4FAA-8E7F-50EDA6DA73A8",
    Citamedicinageneral:"24F28307-90B1-45B5-917B-10500CE5F5AD",
    Compensatoriocumpleanios:"04A9509D-824A-48B6-93AE-8F1BD47FABF5",
    Diligenciadelaempresa:"B4D57912-5BB0-4699-A290-DD0876BF4AAC",
    Diligenciapersonal:"CC6AD96F-2C97-4054-9FA4-79D431054285",
    Urgenciamedica:"487832C3-0DED-4928-ADE3-436C04E8C2C3"
}
if(values.otro !== value){

    visibilityField(campoId, false)
}else{
    visibilityField(campoId, true)
}