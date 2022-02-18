# threadless-jewelry-import

## Objetivos

1. Obtener la mayor cantidad de datos de la vista del producto
2. Guardar esos datos en la extension con alguno de los servicios de almacenamiento
3. Descargar esos datos en algun formato como CSV, JSON u otro que convenga para woocommerce

## Acciones

1. Determinar que datos seran tomados en cuenta para ser almacenados.

## Tareas Terminadas

1. Estructura basica de la extension (incluida prueba de la misma)
2. Crear ContentScript que obtendra dichos datos y los enviara al script de fondo.
3. Analizar la pagina, especificamente la vista de producto para validar que datos estan presentes
4. Crear Script de fondo que recibira los datos y los almacenara
5. Crear Popup que disparará la accion
