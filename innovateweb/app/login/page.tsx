import Link from "next/link";
import { useEffect, useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const err = params.get("error");
    if (err) {
      const messages: Record<string, string> = {
        no_code: "No se recibió el código de autorización.",
        token_failed: "Error al obtener el token de acceso.",
        user_failed: "Error al obtener tu perfil de Discord.",
        not_configured: "Discord OAuth no está configurado en el servidor.",
        unexpected: "Ocurrió un error inesperado.",
      };
      setError(messages[err] || "Error al iniciar sesión.");
    }
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Iniciar sesión
          </h1>
          <p className="text-muted">
            Inicia sesión con tu cuenta de Discord para acceder a tu perfil y
            cursos.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
          <div className="flex items-center justify-center w-full">
            <a
              href="/api/auth/discord"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0"
              >
                <path d="M12.027 1.253C6.473 1.253 2.049 5.695 2.049 11.25c0 2.862 1.212 5.408 3.104 7.357-.735.163-1.439.38-2.089.671-.125-.004-.246-.017-.37-.026-.495-.036-.962-.118-1.396-.28-.254-.094-.463-.22-.648-.378-.778-.665-1.13-1.646-.84-2.604l-.022-.068c-.083-.255-.092-.524-.025-.783.136-.53.445-1.017.935-1.383.09-.066.148-.157.198-.243.588-.997 1.32-1.82 2.18-2.357 1.435-.901 3.13-1.293 4.725-1.145.436.04.845.173 1.206.393.539.331 1.055.796 1.532 1.248.208.196.37.429.468.684.207.542.21 1.113.025 1.666-.202.6-.594 1.074-1.099 1.382-.187.115-.352.25-.491.406-.499.561-.566 1.189-.204 1.849.374.682 1.034 1.13 1.825 1.282.348.066.705.083 1.063.077.666-.01 1.342-.094 2.01-.259.302-.074.574-.19.817-.336.416-.252.85-.57 1.195-.941.239-.256.417-.551.527-.874.26-.76.31-1.572.117-2.379-.164-.684-.528-1.268-1.042-1.68-.46-.368-1.002-.571-1.576-.621-.042-.004-.084-.014-.126-.018a12 12 0 0 0-1.116-.077c-.618-.038-1.242-.038-1.859.001q-.377.023-.745.067c-.355.041-.708.099-1.043.203-.499.155-.96.372-1.382.636-.692.433-1.314.94-1.81 1.56-.316.396-.542.842-.655 1.31-.171.707-.168 1.438.008 2.152.091.364.278.692.56.967q.218.213.472.39c.334.232.699.423 1.093.567.389.142.786.24 1.192.281.873.088 1.757.086 2.632-.017.57-.067 1.115-.193 1.63-.382.525-.193 1.02-.453 1.48-.774.37-.257.708-.561.998-.916.45-.553.74-1.188.816-1.865.031-.267.02-.537-.026-.802a12 12 0 0 0-.526-1.343c-.229-.448-.52-.837-.863-1.181-.341-.341-.723-.607-1.127-.808-.66-.329-1.357-.57-2.084-.675.238-1.062.372-2.154.372-3.268C19.973 5.695 17.582 1.253 12.027 1.253z" />
              </svg>
              Continuar con Discord
            </a>
          </div>
          <p className="mt-6 text-xs text-muted text-center">
            Al continuar, aceptas los Términos de Servicio y la Política de Privacidad.
          </p>
        </div>
      </div>
    </main>
  );
}
