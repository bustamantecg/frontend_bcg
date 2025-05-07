import ventajasImg from '../../assets/imagenes/ventajas-elearning-corporativo.jpg';

const About = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Sobre Nosotros</h1>

        <div className="grid md:grid-cols-2 gap-8 items-start text-justify">
          {/* Texto descriptivo */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              <i className="bi bi-shop-window"></i> Instituto BCG
            </h2>
            <p className="text-base leading-relaxed">
              En el Instituto BCG, estamos comprometidos con la formación integral de profesionales,
              docentes, emprendedores y personas que buscan desarrollarse personal y laboralmente.
              Nuestra institución se destaca por ofrecer programas de capacitación innovadores,
              adaptados a las necesidades reales del mercado y las demandas sociales actuales.
            </p>

            <p className="text-base leading-relaxed">
              Contamos con espacios cómodos, equipados con tecnología de vanguardia, y un equipo
              docente altamente capacitado y comprometido con la excelencia educativa. Nuestras
              clases presenciales y virtuales promueven el pensamiento crítico, la creatividad
              y el aprendizaje colaborativo.
            </p>

            <p className="text-base leading-relaxed">
              A través de nuestra plataforma eLearning, brindamos la posibilidad de estudiar
              desde cualquier lugar y en cualquier momento, facilitando el acceso a la educación
              continua sin barreras de tiempo ni distancia.
            </p>

            <p className="text-base leading-relaxed">
              Como institución formadora, aspiramos a contribuir activamente al desarrollo de la
              comunidad, promoviendo la inserción laboral, el emprendimiento, la inclusión digital
              y el fortalecimiento de competencias clave para un mundo en constante transformación.
            </p>

            <p className="text-base leading-relaxed">
              Nuestro compromiso con la calidad educativa, la innovación pedagógica y el
              acompañamiento permanente a nuestros estudiantes nos impulsa a seguir creciendo
              junto a quienes eligen superarse día a día.
            </p>
          </div>

          {/* Imagen fija */}
          <div>
            <img
              src={ventajasImg}
              alt="Ventajas del eLearning corporativo"
              className="rounded-lg shadow-lg w-full object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Sección del video */}
        <div className="mt-10"> {/* Agregado para separar el video */}
          <h2 className="text-2xl font-semibold mb-4 text-center">Video de Presentación</h2>
          <div className="relative pt-[56.25%]"> {/* Proporción 16:9 */}
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
              src="https://www.youtube.com/embed/fqMJeCn2PsM?si=YNrdZBZqn55Q4MHN"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
