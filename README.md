# threadless-jewelry-import

## Objetivos

1. Obtener la mayor cantidad de datos de la vista del producto
2. Guardar esos datos en la extension con alguno de los servicios de almacenamiento
3. Descargar esos datos en algun formato como CSV, JSON u otro que convenga para woocommerce
4. La acción de descarga es recomendable hacerlo en una pagina de configuracion (aun por confirmar)

## Acciones

1. Analizar la pagina, especificamente la vista de producto para validar que datos estan presentes
2. Determinar que datos seran tomados en cuenta para ser almacenados.
3. Crear Script de fondo que recibira los datos y los almacenara
4. Crear Popup que disparará la accion
5. Crear pagina de configuracion donde se descargará el archivo (aun por confirmar)

## Tareas Terminadas

1. Estructura basica de la extension (incluida prueba de la misma)
2. Crear ContentScript que obtendra dichos datos y los enviara al script de fondo.
