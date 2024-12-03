import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    await prisma.review.deleteMany();
    await prisma.ride.deleteMany();
    await prisma.driver.deleteMany();

  await prisma.driver.createMany({
    data: [
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
    ],
  });

  await prisma.review.createMany({
    data: [
        {
            comment: 'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
            rating: 2 / 5,
            driverId: 1,
          },
          {
            comment:"Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
            rating:4/5,
            driverId:2
          },
          {
            comment:"Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
            rating:5/5,
            driverId:3
          }
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });