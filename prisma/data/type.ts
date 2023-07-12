// import prisma from "..";
// import faker from "@faker-js/faker";

// export default async function type(
//   restaurantIds: string[],
//   outerTypesId: string[]
// ): Promise<void> {
//   for (const restaurantId of restaurantIds) {
//     for (const outerTypeId of outerTypesId) {
//       for (let index = 0; index < 2; index++) {
//         await prisma.type.create({
//           data: {
//             value: `${faker.datatype.number()}kg`,
//             value_ar: `${faker.datatype.number()}كغم`,
//             price: faker.datatype.number(),
//             restaurantId,
//             outerTypeId,
//           },
//         });
//       }
//     }
//   }
// }
