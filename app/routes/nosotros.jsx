import imagen from "../../public/img/nosotros.jpg";
import styles from "~/styles/nosotros.css";

export function meta() {
  return {
    title: "GuitarLA - Sobre Nosotros",
    description: "Ventas de guitarras, blog de música",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "preload",
      href: imagen,
      as: "image",
    },
  ];
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            alias nemo consequatur commodi quibusdam repudiandae recusandae
            ratione dolorem ipsam expedita. Ut provident molestiae ab vitae
            sapiente dolor nulla ipsum vel, commodi quam corrupti voluptas
            dignissimos, nobis quasi. Molestiae, sed earum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            alias nemo consequatur commodi quibusdam repudiandae recusandae
            ratione dolorem ipsam expedita. Ut provident molestiae ab vitae
            sapiente dolor nulla ipsum vel, commodi quam corrupti voluptas
            dignissimos, nobis quasi. Molestiae, sed earum.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Nosotros;
