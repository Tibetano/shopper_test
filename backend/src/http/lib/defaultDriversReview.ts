import { prisma } from "./prisma"

type ReviewCreateInput = {
  comment: string;
  rating: number;
  driverId: number;
}

export async function insertDevaultDriversReviews() {
    try {
      const reviewDriverCount:number = await prisma.review.count();
      const driverCount:number = await prisma.driver.count();

      if (reviewDriverCount === 0 && driverCount == 3) {
        const reviews: ReviewCreateInput[] = [
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
        ];

        await prisma.review.createMany({
          data: reviews,
        });
        
        console.log('Avaliações iniciais inseridas com sucesso.');
      } else {
        console.log('A tabela já contém dados.');
      }
    } catch (err) {
      console.error('Erro ao inserir avaliações iniciais:', err);
    }
    

}