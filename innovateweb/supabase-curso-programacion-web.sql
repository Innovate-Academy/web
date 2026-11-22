-- Curso: Introducción a la Programación Web (Innovate Academy)
-- Nota: Verificar que la tabla 'cursos' exista con estos campos en tu instancia de Supabase.
-- Campos usados: id, slug, nombre, descripcion, icono, estado, duracion_meses, precio, resultado, orden, dispo, profe_id
-- El curso se asume como id 10 (siguiente después de los 9 cursos existentes).

insert into cursos (id, slug, nombre, descripcion, icono, estado, duracion_meses, precio, resultado, orden, dispo, profe_id) values
(10, 'introduccion-programacion-web', 'Introducción a la Programación Web', 'Curso diseñado para comenzar desde cero y aprender los fundamentos del desarrollo web mediante HTML5, CSS3 y JavaScript. No es necesario tener conocimientos previos de programación.', '🌐', 'publicado', 4, 'Consultar precio', '', 10, true, null);

-- Módulos del programa del curso (curso_id = 10), ordenados por mes
insert into programas (id, curso_id, mes, titulo, contenido, descripcion, orden) values
(25, 10, 1, 'Bloque 1 - HTML5: Estructura web', 'Construir la estructura de páginas web, trabajar con textos, imágenes, enlaces, formularios y organizar correctamente sus diferentes elementos.', 'Aprenderás a crear la base semántica y estructural de cualquier sitio web con HTML5.', 1),
(26, 10, 2, 'Bloque 2 - CSS3: Diseño web', 'Diseñar y personalizar páginas web mediante colores, tipografías, estilos, distribuciones, animaciones y diseños adaptables a dispositivos móviles y computadoras.', 'Aprenderás a dar estilo y presentación atractiva y responsive a las páginas web con CSS3.', 2),
(27, 10, 3, 'Bloque 3 - JavaScript: Fundamentos de programación', 'Variables, tipos de datos, operadores, condiciones, bucles, funciones, arrays y objetos. Incorporar interactividad mediante eventos y manipulación del DOM.', 'Aprenderás a programar con JavaScript y añadir interactividad a las páginas web.', 3),
(28, 10, 4, 'Bloque 4 - Proyecto final', 'Desarrollar una página web desde cero, aplicando los conocimientos adquiridos durante los módulos anteriores (HTML5, CSS3 y JavaScript).', 'Proyecto integrador que aplica todo lo aprendido en el curso.', 4);

-- Resetear secuencia
select setval('programas_id_seq', (select max(id) from programas));
