// import prisma from "..";
// import faker from "@faker-js/faker";

// export default async function category(
//   restaurantIds: string[]
// ): Promise<string[]> {
//   const outerTypes = [];
//   for (const restaurantId of restaurantIds) {
//     {
//       const outerType = await prisma.outerType.create({
//         data: {
//           name: faker.name.firstName(),
//           name_ar: faker.name.lastName(),
//           restaurantId,
//         },
//       });

//       outerTypes.push(outerType.id);
//     }
//   }

//   return outerTypes;
// }
