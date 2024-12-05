import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

const TravelRequest: React.FC = () => {
  const [customerId, setCustomerId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);

    try {
      const response = await axios.post("http://localhost:8080/ride/estimate", {
        customer_id: customerId,
        origin,
        destination,
      });

      navigate("/ride/confirmacao", { state: {customerId, origin, destination, data: response.data} });
    } catch (error: any) {
      if (error.response.data.error_description) {
        setErrorMessage(error.response.data.error_description);
        alert(error.response.data.error_description)
      } else {
        setErrorMessage("Erro ao estimar a viagem. Tente novamente.");
        alert("Erro ao estimar a viagem. Tente novamente.")
      }
      
    }
  };

  return (
    <div>
      <h1>Solicitação de Viagem</h1>
      {errorMessage && <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>} 
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerId">ID do Usuário:</label>
          <input
            id="customerId"
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="origin">Endereço de Origem:</label>
          <input
            id="origin"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="destination">Endereço de Destino:</label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <button type="submit">Estimar Viagem</button>
      </form>
    </div>
  );
};

export default TravelRequest;
