import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "../../atoms/Button/Button";


const k_e = 8.99 * Math.pow(10, 9); // Constante de Coulomb

const Form = () => {
    const [campoElectrico, setCampoElectrico] = useState([0, 0, 0]); // Campo eléctrico en formato [x, y, z]
    const [charges, setCharges] = useState([
        { value: 0, position: [0, 0, 0] }, // Carga 1
        { value: 0, position: [0, 0, 0] }, // Carga 2
        { value: 0, position: [0, 0, 0] }  // Carga 3
    ]);
    const [result, setResult] = useState(null);
    const [steps, setSteps] = useState([]); // Para guardar los pasos del procedimiento

    const handleCampoChange = (index, value) => {
        const newCampo = [...campoElectrico];
        newCampo[index] = parseFloat(value);
        setCampoElectrico(newCampo);
    };

    const handleChargeChange = (index, value) => {
        const newCharges = [...charges];
        newCharges[index].value = parseFloat(value);
        setCharges(newCharges);
    };

    const handlePositionChange = (index, coordIndex, value) => {
        const newCharges = [...charges];
        newCharges[index].position[coordIndex] = parseFloat(value);
        setCharges(newCharges);
    };

    const calculateElectricField = () => {
        let ET = [0, 0, 0]; // Vector del campo eléctrico total
        const newSteps = []; // Array para almacenar los pasos

        // Sumar el campo eléctrico ingresado por el usuario
        newSteps.push(`Campo Eléctrico Inicial proporcionado por el usuario: E = (${campoElectrico.join(", ")}) N/C`);
        ET = ET.map((component, index) => component + campoElectrico[index]);

        charges.forEach((charge, index) => {
            const { value, position } = charge;
            const r = Math.sqrt(position.reduce((acc, curr) => acc + Math.pow(curr, 2), 0));

            if (r === 0 || value === 0) {
                newSteps.push(`Carga ${index + 1} omitida debido a valor o posición inválida.`);
                return;
            }

            const unitVector = position.map(coord => coord / r); // Vector unitario
            const E = k_e * (value * Math.pow(10, -6)) / Math.pow(r, 2); // Campo eléctrico en N/C

            // Detallar el procedimiento
            newSteps.push(`Carga ${index + 1}:`);
            newSteps.push(`- Valor de la carga: Q = ${value} μC`);
            newSteps.push(`- Posición de la carga: (${position.join(", ")}) m`);
            newSteps.push(`- Distancia r desde el origen: ${r.toFixed(2)} m`);
            newSteps.push(`- Magnitud del campo eléctrico generado por la carga ${index + 1}: E = ${E.toFixed(2)} N/C`);

            // Agregar la suma vectorial de los campos eléctricos
            ET = ET.map((component, i) => component + E * unitVector[i]);
            newSteps.push(`- Campo eléctrico en dirección de los ejes: E = (${(E * unitVector[0]).toFixed(2)}, ${(E * unitVector[1]).toFixed(2)}, ${(E * unitVector[2]).toFixed(2)}) N/C`);
        });

        setResult(ET);
        setSteps(newSteps); // Guardar los pasos en el estado
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        calculateElectricField();
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Cálculo del Campo Eléctrico</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <h5>Campo Eléctrico Inicial (en N/C):</h5>
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="E_x"
                            value={campoElectrico[0]}
                            onChange={(e) => handleCampoChange(0, e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="E_y"
                            value={campoElectrico[1]}
                            onChange={(e) => handleCampoChange(1, e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="E_z"
                            value={campoElectrico[2]}
                            onChange={(e) => handleCampoChange(2, e.target.value)}
                        />
                    </div>
                </div>

                {charges.map((charge, index) => (
                    <div key={index} className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Carga {index + 1} (en μC):</h5>
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder={`Ingrese carga ${index + 1}`}
                                        value={charge.value}
                                        onChange={(e) => handleChargeChange(index, e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                {['x', 'y', 'z'].map((axis, coordIndex) => (
                                    <div key={coordIndex} className="col-md-4">
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder={axis}
                                            value={charge.position[coordIndex]}
                                            onChange={(e) => handlePositionChange(index, coordIndex, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="text-center">
                    <Button texto={"Calcular"} />
                </div>
            </form>

            {result && (
                <div className="mt-5">
                    <h2 className="text-center">Campo Eléctrico Total</h2>
                    <p className="text-center">({result[0].toFixed(2)} , {result[1].toFixed(2)} , {result[2].toFixed(2)}) N/C</p>
                </div>
            )}

            {steps.length > 0 && (
                <div className="mt-5">
                    <h2>Procedimiento:</h2>
                    <ul className="list-group">
                        {steps.map((step, index) => (
                            <li key={index} className="list-group-item">{step}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Form;
