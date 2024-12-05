import axios from "axios";
import React, { useState } from "react";

interface Ride {
  id: number;
  date: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

const TravelHistory: React.FC = () => {
  const [customerId, setCustomerId] = useState("");
  const [driverId, setDriverId] = useState("all");
  const [rides, setRides] = useState<Ride[] | null>(null);
  const [loading, setLoading] = useState(false);
  const drivers = ["Homer Simpson","Dominic Toretto","James Bond"];
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const customStyle = {
    borderRadius: '8px',
    border: '1px solid transparent',
    padding: '0.2em 1.2em',
    margin: '15px',
    fontSize: '1em',
    fontWeight: 500,
    fontFamily: 'inherit',
    backgroundColor: 'grey',
    color: '#fff', 
    
  };

  const handleFilter = async () => {
    if (!customerId) {
      alert("Por favor, informe o ID do usuário.");
      return;
    }

    setLoading(true);
    setRides(null);
    setErrorMessage(null);

    try {
      const url =
        driverId === "all"
          ? `http://localhost:8080/ride/${customerId}`
          : `http://localhost:8080/ride/${customerId}?driver_id=${driverId}`;

      const response = await axios.get(url);

      setRides(response.data.rides);
    } catch (error:any) {
      if (error.response.data.error_description) {
        setErrorMessage(error.response.data.error_description);
        alert(error.response.data.error_description)
      } else {
        setErrorMessage("Erro ao carregar o histórico de viagens. Tente novamente.");
        alert("Erro ao carregar o histórico de viagens. Tente novamente.")
      }

    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1>Histórico de Viagens</h1>
      <form onSubmit={(e) => e.preventDefault()}>
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
          <label htmlFor="driverId">Selecione o Motorista:</label>
          <select
            id="driverId"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
          >
            <option key={0} value="all">Mostrar Todos</option>
            {
              drivers.map((driver,id)=>{return <option key={id+1}value={id+1}>{driver}</option>})
            }
            
          </select>
        </div>
        {errorMessage && <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>} 
        <button type="button" onClick={handleFilter}>
          Aplicar Filtro
        </button>
      </form>

      {loading && <p>Carregando histórico de viagens...</p>}

      {rides && rides.length > 0 ? (
        <div>
          <h2>Lista de Viagens</h2>
          <ul>
            {rides.map((ride) => (
              <li key={ride.id} style={customStyle}>
                <h3>Viagem </h3>
                <p><strong>Data e Hora:</strong> {new Date(ride.date).toLocaleString()}</p>
                <p><strong>Motorista:</strong> {ride.driver.name}</p>
                <p><strong>Origem:</strong> {ride.origin}</p>
                <p><strong>Destino:</strong> {ride.destination}</p>
                <p><strong>Distância:</strong> {(ride.distance / 1000).toFixed(2)} km</p>
                <p><strong>Tempo:</strong> {ride.duration}</p>
                <p><strong>Valor:</strong> R$ {ride.value.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        !loading && <p>Nenhuma viagem encontrada.</p>
      )}
    </div>
  );
};

export default TravelHistory;
