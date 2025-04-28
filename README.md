### Servicio de conexión de Whastapp para empresas, envío de plantillas


### Enpoints

- En el archivo server.ts se encuentran los endpoint GET y POST "/webhook"
- El GET es únicamente para validación y verificación por parte de Meta
- El POST es para recibir los eventos de mensajes al número vinculado de la empresa

- En la ruta "/conversation" enviando en el body el bussiness_phone_number_id (el identificador del numero que envía) activa el envío de la plantilla de confirmación de evento

PENDIENTE:
- Revisar si llega un token en el header del post del webhook