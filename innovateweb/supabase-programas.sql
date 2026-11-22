-- Tabla de programas/módulos de cursos
create table if not exists programas (
  id bigserial primary key,
  curso_id bigint not null references cursos(id) on delete cascade,
  mes integer not null,
  titulo text not null,
  contenido text not null,
  descripcion text,
  orden integer default 0,
  creado_en timestamp with time zone default now()
);

-- RLS
alter table programas enable row level security;

-- Políticas
drop policy if exists "Cualquiera puede ver programas de cursos publicados" on programas;
create policy "Cualquiera puede ver programas de cursos publicados"
  on programas for select
  using (
    curso_id in (select id from cursos where dispo = true)
  );

drop policy if exists "Profesores pueden gestionar programas de sus cursos" on programas;
create policy "Profesores pueden gestionar programas de sus cursos"
  on programas for all
  using (
    curso_id in (
      select id from cursos where profe_id in (
        select id from profesores where user_id = current_setting('request.jwt.claims', true)::json->>'sub'
      )
    )
  );

-- Índices
create index if not exists idx_programas_curso_id on programas(curso_id);
create index if not exists idx_programas_curso_mes on programas(curso_id, mes);

-- Insertar datos del JSON (cursos reales: 1-9)
insert into programas (id, curso_id, mes, titulo, contenido, descripcion, orden) values
-- Curso 1: Fundamentos de Programación
(1, 1, 1, 'Nivel 1 - Principiante', 'Bases de la programación.', 'Aprenderás qué es un programa y escribirás tus primeros algoritmos.', 1),
(2, 1, 2, 'Nivel 2 - Básico', 'Lógica, estructuras y proyectos.', null, 2),
-- Curso 2: Lua
(3, 2, 1, 'Nivel 1 - Principiante', 'Fundamentos de Lua.', null, 1),
(4, 2, 2, 'Nivel 2 - Básico/Intermedio', 'Programación con Lua y proyectos.', null, 2),
-- Curso 3: HTML / CSS (4 bloques detallados)
(5, 3, 1, 'Bloque 1 - HTML5: Estructura web', 'Construir la estructura de páginas web, trabajar con textos, imágenes, enlaces, formularios y organizar correctamente sus diferentes elementos.', 'Aprenderás a crear la base semántica y estructural de cualquier sitio web con HTML5.', 1),
(6, 3, 2, 'Bloque 2 - CSS3: Diseño web', 'Diseñar y personalizar páginas web mediante colores, tipografías, estilos, distribuciones, animaciones y diseños adaptables a dispositivos móviles y computadoras.', 'Aprenderás a dar estilo y presentación atractiva y responsive a las páginas web con CSS3.', 2),
(7, 3, 3, 'Bloque 3 - JavaScript: Fundamentos de programación', 'Variables, tipos de datos, operadores, condiciones, bucles, funciones, arrays y objetos. Incorporar interactividad mediante eventos y manipulación del DOM.', 'Aprenderás a programar con JavaScript y añadir interactividad a las páginas web.', 3),
(8, 3, 4, 'Bloque 4 - Proyecto final', 'Desarrollar una página web desde cero, aplicando los conocimientos adquiridos durante los módulos anteriores (HTML5, CSS3 y JavaScript).', 'Proyecto integrador que aplica todo lo aprendido en el curso.', 4),
-- Curso 4: SQL
(9, 4, 1, 'Mes 1', 'Bases de datos, tablas, SELECT, INSERT, UPDATE, DELETE, filtros, operadores, ORDER BY, GROUP BY, funciones y relaciones.', null, 1),
(10, 4, 2, 'Mes 2', 'JOIN, subconsultas, claves primarias/foráneas, índices, vistas, transacciones, normalización, seguridad y proyecto final.', null, 2),
-- Curso 5: JavaScript
(11, 5, 1, 'Mes 1', 'Sintaxis, variables, tipos de datos, operadores, condicionales, bucles, funciones, arrays y objetos.', null, 1),
(12, 5, 2, 'Mes 2', 'DOM, eventos, formularios, JSON, módulos, asincronía, Promises, async/await, APIs y fetch.', null, 2),
(13, 5, 3, 'Mes 3', 'Programación orientada a objetos, manejo de errores, localStorage, buenas prácticas, Git, proyectos y proyecto final.', null, 3),
-- Curso 6: Java
(14, 6, 1, 'Mes 1', 'Sintaxis, variables, tipos de datos, operadores, condicionales, bucles, métodos y arrays.', null, 1),
(15, 6, 2, 'Mes 2', 'POO, clases, objetos, herencia, polimorfismo, interfaces, excepciones y colecciones.', null, 2),
(16, 6, 3, 'Mes 3', 'Archivos, bases de datos, Git, buenas prácticas, proyectos y proyecto final.', null, 3),
-- Curso 7: C#
(17, 7, 1, 'Mes 1', 'Sintaxis, variables, tipos de datos, operadores, condicionales, bucles, métodos, arrays y colecciones.', null, 1),
(18, 7, 2, 'Mes 2', 'POO, clases, objetos, herencia, interfaces, excepciones, archivos, LINQ y gestión de memoria.', null, 2),
(19, 7, 3, 'Mes 3', '.NET, APIs, bases de datos, Git, buenas prácticas, testing, proyectos y proyecto final.', null, 3),
-- Curso 8: Python
(20, 8, 1, 'Mes 1', 'Fundamentos, variables, tipos de datos, operadores, if/else, bucles y funciones.', null, 1),
(21, 8, 2, 'Mes 2', 'Listas, tuplas, diccionarios, conjuntos, strings, manejo de errores, módulos y paquetes.', null, 2),
(22, 8, 3, 'Mes 3', 'Programación orientada a objetos, archivos, JSON, librerías, APIs y entornos virtuales.', null, 3),
(23, 8, 4, 'Mes 4', 'Bases de datos, testing, buenas prácticas, Git, proyectos reales y proyecto final.', null, 4),
-- Curso 9: C++
(24, 9, 1, 'Mes 1', 'Sintaxis, variables, tipos de datos, operadores, condicionales, bucles, funciones, arrays y punteros.', null, 1),
(25, 9, 2, 'Mes 2', 'Referencias, memoria dinámica, struct, clases, POO, herencia, polimorfismo, plantillas y STL.', null, 2),
(26, 9, 3, 'Mes 3', 'Archivos, excepciones, algoritmos, estructuras de datos, buenas prácticas, Git, optimización y proyecto final.', null, 3)
on conflict (id) do nothing;

-- Resetear secuencia
select setval('programas_id_seq', (select max(id) from programas));

-- Actualizar curso HTML / CSS (id 3): precio, modalidades de pago y objetivo
update cursos
set precio = '960 € (pago único con 5 % desc.) / 240 € mensual x 4',
    descripcion = 'Estructura y diseño web: crea páginas modernas y responsive.

PRECIO Y MODALIDADES DE PAGO
Opción 1. Pago mensual: 240 € / 264 USD / 5.030 MXN al mes · 4 mensualidades · Sin descuentos.
Opción 2. Pago completo: 960 € / 1.055 USD / 20.117 MXN · Descuento 5 % · Precio final 912 € / 1.002 USD / 19.111 MXN.
Los importes en dólares y pesos mexicanos son orientativos y pueden variar según el tipo de cambio.

OBJETIVO DE LA FORMACIÓN
Al finalizar el curso, habrás adquirido una base sólida en desarrollo web y podrás crear tus propias páginas, diseñar sus interfaces y añadir funcionalidades mediante JavaScript. La formación busca que comprendas los fundamentos de la programación y puedas aplicarlos de manera autónoma, sentando las bases para continuar aprendiendo y desarrollar proyectos más complejos.'
where id = 3;
