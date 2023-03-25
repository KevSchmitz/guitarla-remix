const Cursos = ({ cursos }) => {
  const { contenido, imagen, titulo } = cursos.attributes;
  return (
    <div className="contenedor curso curso-grid ">
      <div className="contenido">
        <h2 className="heading">{titulo}</h2>
        <p className="texto"> {contenido} </p>
      </div>
    </div>
  );
};

export default Cursos;
