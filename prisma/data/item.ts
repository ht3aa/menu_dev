// import prisma from "..";
// import faker from "@faker-js/faker";

// export default async function category(
//   restaurantIds: string[],
//   categoriesIds: string[]
// ): Promise<void> {
//   for (const restaurantId of restaurantIds) {
//     {
//       for (const categoryId of categoriesIds) {
//         await prisma.item.create({
//           data: {
//             name: { en: faker.name.firstName(), ar: faker.name.firstName() },
//             categoryId,
//             description: {
//               en: faker.lorem.words(30),
//               ar: faker.lorem.words(30),
//             },
//             image: faker.image.food(),
//             price: faker.datatype.number(),
//             restaurantId,
//             outerType: [
//               {
//                 name: faker.name.lastName(),
//                 name_ar: faker.name.firstName(),
//                 types: [
//                   {
//                     value: faker.name.firstName(),
//                     value_ar: faker.name.firstName(),
//                     price: `${faker.datatype.number()}+`,
//                   },
//                   {
//                     value: faker.name.firstName(),
//                     value_ar: faker.name.firstName(),
//                     price: `${faker.datatype.number()}+`,
//                   },
//                   {
//                     value: faker.name.firstName(),
//                     value_ar: faker.name.firstName(),
//                     price: `${faker.datatype.number()}+`,
//                   },
//                 ],
//               },
//             ],
//           },
//         });
//       }
//     }
//   }
// }
