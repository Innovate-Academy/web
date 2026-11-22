-- Tabla de programas/módulos de cursos
create table programas (
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
create policy "Cualquiera puede ver programas de cursos publicados"
  on programas for select
  using (
    curso_id in (select id from cursos where dispo = true)
  );

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
create index idx_programas_curso_id on programas(curso_id);
create index idx_programas_curso_mes on programas(curso_id, mes);

-- Insertar datos del JSON
insert into programas (id, curso_id, mes, titulo, contenido, descripcion, orden) values
(1, 1, 1, 'Nivel 1 - Principiante', 'Bases de la programación.', 'Aprenderás qué es un programa y escribirás tus primeros algoritmos.', 1),
(2, 1, 2, 'Nivel 2 - Básico', 'Lógica, estructuras y proyectos.', null, 2),
(3, 2, 1, 'Nivel 1 - Principiante', 'Fundamentos de Lua.', null, 1),
(4, 2, 2, 'Nivel 2 - Básico/Intermedio', 'Programación con Lua y proyectos.', null, 2),
(5, 3, 1, 'Mes 1', 'Estructura HTML, etiquetas, formularios, selectores CSS, box model, colores, tipografía y flexbox.', null, 1),
(6, 3, 2, 'Mes 2', 'Grid, diseño responsive, animaciones, transiciones, buenas prácticas, accesibilidad y proyecto final.', null, 2),
(7, 4, 1, 'Mes 1', 'Bases de datos, tablas, SELECT, INSERT, UPDATE, DELETE, filtros, operadores, ORDER BY, GROUP BY, funciones y relaciones.', null, 1),
(8, 4, 2, 'Mes 2', 'JOIN, subconsultas, claves primarias/foráneas, índices, vistas, transacciones, normalización, seguridad y proyecto final.', null, 2),
(9, 5, 1, 'Mes 1', 'Sintaxis, variables, tipos de datos, operadores, condicionales, bucles, funciones, arrays y objetos.', null, 1),
(10, 5, 2, 'Mes 2', 'DOM, eventos, formularios, JSON, módulos, asincronía, Promises, async/await, APIs y fetch.', null, 2),
(11, 5, 3, 'Mes 3', 'Programación orientada a objetos, manejo de errores, localStorage, buenas prácticas, Git, proyectos y proyecto final.', null, 3),
(12, 6, 1, 'Mes 1', 'Sintaxis, variables, tipos de datos, operadores, condicionales, bucles, métodos y arrays.', null, 1),
(13, 6, 2, 'Mes 2', 'POO, clases, objetos, herencia, polimorfismo, interfaces, excepciones y colecciones.', null, 2),
(14, 6, 3, 'Mes 3', 'Archivos, bases de datos, Git, buenas prácticas, proyectos y proyecto final.', null, 3),
(15, 7, 1, 'Mes 1', 'Sintaxis, variables, tipos de datos, operadores, condicionales, bucles, métodos, arrays y colecciones.', null, 1),
(16, 7, 2, 'Mes 2', 'POO, clases, objetos, herencia, interfaces, excepciones, archivos, LINQ y gestión de memoria.', null, 2),
(17, 7, 3, 'Mes 3', '.NET, APIs, bases de datos, Git, buenas prácticas, testing, proyectos y proyecto final.', null, 3),
(18, 8, 1, 'Mes 1', 'Fundamentos, variables, tipos de datos, operadores, if/else, bucles y funciones.', null, 1),
(19, 8, 2, 'Mes 2', 'Listas, tuplas, diccionarios, conjuntos, strings, manejo de errores, módulos y paquetes.', null, 2),
(20, 8, 3, 'Mes 3', 'Programación orientada a objetos, archivos, JSON, librerías, APIs y entornos virtuales.', null, 3),
(21, 8, 4, 'Mes 4', 'Bases de datos, testing, buenas prácticas, Git, proyectos reales y proyecto final.', null, 4),
(22, 9, 1, 'Mes 1', 'Sintaxis, variables, tipos de datos, operadores, condicionales, bucles, funciones, arrays y punteros.', null, 1),
(23, 9, 2, 'Mes 2', 'Referencias, memoria dinámica, struct, clases, POO, herencia, polimorfismo, plantillas y STL.', null, 2),
(24, 9, 3, 'Mes 3', 'Archivos, excepciones, algoritmos, estructuras de datos, buenas prácticas, Git, optimización y proyecto final.', null, 3);

-- Resetear secuencia
select setval('programas_id_seq', (select max(id) from programas));