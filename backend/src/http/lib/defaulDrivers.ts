import { close } from "fs";
import { prisma } from "./prisma"

type DriverData = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rate: number;
  minKm: number;
}

export async function insertDevaultDrivers() {
    try {
      const driverCount:number = await prisma.driver.count();
  
      if (driverCount === 0) {
        const driversData: DriverData[] = [
          {
            id:1,
            name:"Homer Simpson",
            description:"Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
            vehicle:"Plymouth Valiant 1973 rosa e enferrujado",
            rate:2.5,
            minKm:1
          },
          {
            id:2,
            name:"Dominic Toretto",
            description:"Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
            vehicle:"Dodge Charger R/T 1970 modificado",
            rate:5.0,
            minKm:5
          },
          {
            id:3,
            name:"James Bond",
            description:"Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
            vehicle:"Aston Martin DB5 clássico",
            rate:10.0,
            minKm:10
          }
        ]

        await prisma.driver.createMany({
          data: driversData,
        });
        
        console.log('Dados iniciais inseridos com sucesso.');
      } else {
        console.log('A tabela já contém dados.');
      }
    } catch (err) {
      console.error('Erro ao inserir dados iniciais:', err);
    }
}
