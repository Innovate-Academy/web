-- Tabla de inscripciones (formulario de contacto para cursos)
create table if not exists inscripciones_formulario (
  id bigserial primary key,
  curso_id bigint references cursos(id) on delete cascade,
  curso_slug text,
  nombre text not null,
  email text not null,
  discord text,
  creado_en timestamp with time zone default now()
);

-- RLS
alter table inscripciones_formulario enable row level security;

-- Políticas
drop policy if exists "Cualquiera puede insertar inscripción" on inscripciones_formulario;
create policy "Cualquiera puede insertar inscripción"
  on inscripciones_formulario for insert
  with check (true);

drop policy if exists "Profesores pueden ver inscripciones" on inscripciones_formulario;
create policy "Profesores pueden ver inscripciones"
  on inscripciones_formulario for select
  using (true);

-- Índices
create index if not exists idx_inscripciones_formulario_curso_id on inscripciones_formulario(curso_id);
create index if not exists idx_inscripciones_formulario_creado_en on inscripciones_formulario(creado_en);
