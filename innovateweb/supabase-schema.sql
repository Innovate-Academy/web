-- Tabla de profesores
create table profesores (
  id bigserial primary key,
  user_id text not null unique,  -- Discord user ID
  nombre text not null,
  email text,
  bio text,
  avatar_url text,
  creado_en timestamp with time zone default now(),
  actualizado_en timestamp with time zone default now()
);

-- RLS para profesores
alter table profesores enable row level security;

create policy "Profesores pueden ver su propio perfil"
  on profesores for select
  using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "Profesores pueden actualizar su propio perfil"
  on profesores for update
  using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Tabla de inscripciones (alumnos en cursos)
create table inscripciones (
  id bigserial primary key,
  user_id text not null,  -- Discord user ID del alumno
  curso_id bigint not null references cursos(id),
  profesor_id bigint references profesores(id),  -- profesor que imparte el curso
  creado_en timestamp with time zone default now(),
  unique (user_id, curso_id)
);

-- RLS para inscripciones
alter table inscripciones enable row level security;

create policy "Alumnos ven sus propias inscripciones"
  on inscripciones for select
  using (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

create policy "Profesores ven inscripciones de sus cursos"
  on inscripciones for select
  using (
    profesor_id in (
      select id from profesores where user_id = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

create policy "Alumnos pueden inscribirse"
  on inscripciones for insert
  with check (user_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Agregar profesor_id a cursos (opcional, para saber qué profesor imparte qué curso)
alter table cursos add column if not exists profesor_id bigint references profesores(id);

-- Índices para performance
create index idx_inscripciones_user_id on inscripciones(user_id);
create index idx_inscripciones_profesor_id on inscripciones(profesor_id);
create index idx_cursos_profesor_id on cursos(profesor_id);