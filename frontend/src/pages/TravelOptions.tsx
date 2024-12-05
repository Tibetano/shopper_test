import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import decimalToFraction from "../util/DecimalToFraction";
    
const TravelOptions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const rideData = location.state;
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

  if (!rideData) {
    return (
      <div>
        <h1>Nenhuma informação de viagem encontrada</h1>
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>
    );
  }

  const confirmRide = async (body: { 
    customer_id: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver: {
      id: number,
      name: string,
    },
    value: number,
  }) => {
    
    setErrorMessage(null);

    try {
      const response = await axios.patch("http://localhost:8080/ride/confirm", body);

      if (response.status === 200 && response.data.success === true) {
        navigate("/ride/historico");
      } else {
        alert("Erro ao confirmar a viagem. Tente novamente.");
      }
    } catch (error:any) {
      if (error.response.data.error_description) {
        setErrorMessage(error.response.data.error_description);
        alert(error.response.data.error_description)
      } else {
        setErrorMessage("Erro ao confirmar a viagem. Tente novamente.");
        alert("Erro ao confirmar a viagem. Tente novamente.")
      }
    }
  };

  const steps = rideData.data.routeResponse.routes[0].legs[0].steps.map((step:any,i:number,array:any)=>{return `${step.startLocation.latLng.latitude},${step.startLocation.latLng.longitude}|${step.endLocation.latLng.latitude},${step.endLocation.latLng.longitude}${i=== array.length - 1? "":"|"}`})
  .reduce((acc:string,valor:string)=> acc + '' + valor, '')

  const url = `https://maps.googleapis.com/maps/api/staticmap?&size=600x600&path=color:0xff0000ff|weight:5|${steps}&markers=color:blue|label:A|${rideData.data.origin.latitude},${rideData.data.origin.longitude}&markers=color:blue|label:B|${rideData.data.destination.latitude},${rideData.data.destination.longitude}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
  
  return (
    <div>
      <h1>Opções de Viagem</h1>
      <img src={url} alt="" />

      {errorMessage && <div style={{ color: "red", marginBottom: "1rem" }}>{errorMessage}</div>} 

      <ul>
        {rideData.data.options.map((driver: { 
          id: number; 
          name: string; 
          description: string; 
          vehicle: string, 
          review: {
            rating:number, 
            comment:string
          }, 
          value: number
        }) => (
          <li key={driver.id} style={customStyle}>
            <h2>{driver.name}</h2>
            <p>{driver.description}</p>
            <p>Veículo: {driver.vehicle}</p>
            <p>Avaliação: {` ${decimalToFraction(Number(driver.review.rating))}   ${driver.review.comment}`} </p>
            <p>Valor da viagem: {driver.value.toFixed(2)} R$</p>

            <button onClick={() => confirmRide({ 
              customer_id: rideData.customerId,
              origin: rideData.origin,
              destination: rideData.destination,
              distance: rideData.data.distance,
              duration: rideData.data.duration,
              driver: {
                id: driver.id,
                name: driver.name,
              },
              value: driver.value,
            })}>Escolher</button>
          </li>
        ))}
      </ul>
      
      <button onClick={() => navigate("/")}>Solicitar nova viagem</button>
    </div>
  );
};
    
export default TravelOptions;
