// import prisma from "..";
// import faker from "@faker-js/faker";

// const password = "$2b$12$Qy6PuT1V00bCDAgAx.6SK.xIOD49eBNvAQK6VYCEbJu/Q1FBVAUdi";

// export default async function category(): Promise<string[]> {
//   const ids = [];

//   for (let index = 0; index < 10; index++) {
//     const users = await prisma.user.create({
//       data: {
//         phoneNumber: faker.phone.phoneNumber(),
//         username: faker.helpers.slugify(
//           `${faker.name.prefix()} ${faker.name.firstName()} ${faker.name.lastName()}`
//         ),
//         password,
//         restaurant: {
//           create: {
//             name: `${faker.name.lastName()}-${index}`,
//             image: faker.image.business(),
//             colors: ["ff0000"],
//           },
//         },
//       },
//       include: { restaurant: true },
//     });

//     ids.push(users.restaurant.id);
//   }

//   return ids;
// }
