import "./Benefits.css";

const benefits = [
    {
        id: 1,
        title: "Múltiples medios de pago",
        description: "Pagá de la manera que prefieras."
    },
    {
        id: 2,
        title: "Compra segura",
        description: "Protegemos tus datos y tu compra."
    },
    {
        id: 3,
        title: "Atención personalizada",
        description: "Estamos para ayudarte cuando lo necesites."
    }
];

export default function Benefits() {

    return (
        <section className="benefits">

            <div className="benefits-container">

                <div className="benefits-header">

                    <h2>
                        ¿Por qué elegir Farmacia Pierabella?
                    </h2>

                </div>


                <div className="benefits-grid">

                    {benefits.map(benefit => (

                        <div
                            key={benefit.id}
                            className="benefit"
                        >
                            <div className="benefit-content">

                                <h3>
                                    {benefit.title}
                                </h3>

                                <p>
                                    {benefit.description}
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}