// import prisma from "..";
// import faker from "@faker-js/faker";

// export default async function category(
//   restaurantIds: string[]
// ): Promise<string[]> {
//   const ids: string[] = [];

//   for (const restaurantId of restaurantIds) {
//     for (let index = 0; index < 10; index++) {
//       const category = await prisma.category.create({
//         data: {
//           name: { en: faker.name.firstName(), ar: faker.name.firstName() },
//           icon: "😢",
//           restaurantId: restaurantId,
//         },
//       });

//       ids.push(category.id);
//     }
//   }

//   return ids;
// }
