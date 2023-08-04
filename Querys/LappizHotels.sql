use Lappiz_basic_Apps
use LappizV2Test

Select  * from information_schema.columns WHERE TABLE_NAME= 'lappizhotels_Lappiz_Reserva'


select 
r.Numeroreserva[numeroReserva],
c.Nombrecompleto [Nombrecompleto],
c.Correo [correoCliente],
isnull (format(r.Fechacheckin,'dd-MM-yyyy'),'') [fechaLlegada],
isnull (format(r.Fechacheckout,'dd-MM-yyyy'),'')[fechaSalida],
r.Cantidadnoches[numeroNoches],
r.Cantidadpersonas[cantidadPersonas],
mp.CEMetodosdepagos [metodoPago],
ht.Nombrehotel [Hotel],
th.CETipodehabitacines [tipoHabitacion],
h.Numerohabitacion[numeroHabitacion]
from lappizhotels_Lappiz_Reserva r
inner join lappizhotels_Lappiz_DetalleHabitacion dh on dh.ReservaFk = r.Id
inner join lappizhotels_Lappiz_Habitaciones h on dh.HabitacionFk = h.Id
inner join lappizhotels_Lappiz_Clientes c on r.ClienteFK = c.Id
inner join lappizhotels_Lappiz_Metodospago mp on r.MetodosdepagoFk = mp.Id
inner join lappizhotels_Lappiz_Hotel ht on r.HotelFk = ht.Id
inner join lappizhotels_Lappiz_Tipohabitacion th on h.TipohabitacionFk = th.Id
where r.Id ='30EBDE7B-645F-46D4-BD84-CD8FAB5A4E52'



format (sdsr.Fecha,'dd-MM-yyyy') [Fecha],

select * from lappizhotels_Lappiz_DetalleHabitacion
select * from lappizhotels_Lappiz_Habitaciones
select * from lappizhotels_Lappiz_Clientes
select * from lappizhotels_Lappiz_Metodospago
select * from lappizhotels_Lappiz_bancos
select * from lappizhotels_Lappiz_Hotel
select * from lappizhotels_Lappiz_Reserva
select * from lappizhotels_Lappiz_Tipohabitacion
select * from lappizhotels_Lappiz_Users where HotelFk='B82D4CE3-2A24-470F-A326-CAF79F05D5DD'








select * from lappizhotels_Lappiz_Users


select distinct u.HotelFk,h.Nombrehotel,h.Nit, h.Logo, h.ColorPrimario, h.ColorSecundario from lappizhotels_Lappiz_Hotel h
join lappizhotels_Lappiz_Users u on u.HotelFk = h.Id
where u.HotelFk='B82D4CE3-2A24-470F-A326-CAF79F05D5DD'

select distinct h.Nombrehotel,h.Nit, h.Logo, h.ColorPrimario, h.ColorSecundario from lappizhotels_Lappiz_Hotel h
--join lappizhotels_Lappiz_Users u on u.HotelFk = h.Id
join lappizhotels_Lappiz_Users u on h.Id = u.HotelFk
where u.HotelFk='B82D4CE3-2A24-470F-A326-CAF79F05D5DD'


Use LappizV2Test


select*from AspNetUsers
where Email='admin@canaveral.com'

update AspNetUsers
set EmailConfirmed='1'
where Email='admin@canaveral.com'