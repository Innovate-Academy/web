import Navbar from "../components/Navbar";
export default function Cursos() {

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-1">
                <h1 className="text-4xl font-bold text-center mt-8">Nuestros Cursos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">

                    <div id="curso1" className="bg-gray-100 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Curso de Desarrollo Web</h2>
                        <p className="text-gray-700 mb-4">Aprende a crear sitios web modernos y responsivos utilizando HTML, CSS y JavaScript.</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor: pointer;">Inscribirse</button>
                    </div>
                </div>
            </main>
        </div>
    );
}