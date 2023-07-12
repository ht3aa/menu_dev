// import request, { Response } from "supertest";
// import { Category, Item } from "@prisma/client";
// import faker from "@faker-js/faker";
// import server from "../../server";
// import prisma from "../../../prisma";

// describe("items", () => {
//   const req = request(server);
//   let res: Response;
//   let category: Category;
//   let token: string;

//   beforeAll(async () => {
//     res = await req.post("/users/login").send({
//       phoneNumber: "0000",
//       password: "my dick is small",
//     });

//     token = await res.body.tokens.access;
//     bug(token);
//   });

//   beforeEach(() => {});

//   afterEach(async () => {
//     // await prisma.category.delete({ where: { id: category.id } });
//   });

//   afterAll(async () => {
//     server.close();
//     await prisma.$disconnect();
//   });

//   const post = async (data: Omit<Item, "id" | "active">) => {
//     return req
//       .post("/cum-shop/item")
//       .set("Authorization", "Bearer " + token)
//       .attach("image", `${__dirname}/../../../assets/images/tile_0000.png`)
//       .field("description", data.description)
//       .field("price", `${data.price}`)
//       .field("restaurantId", data.restaurantId)
//       .field("categoryId", data.categoryId)
//       .field("name", data.name);
//   };

//   test("create-item", async () => {
//     category = await prisma.category.create({
//       data: {
//         name: faker.name.suffix() + faker.name.lastName(),
//         icon: "#️⃣",
//         restaurant: {
//           create: { name: faker.name.suffix() + faker.name.lastName() },
//         },
//       },
//     });

//     res = await post({
//       description: faker.lorem.lines(),
//       price: faker.datatype.number(),
//       image: "../../../tile_0000.png",
//       restaurantId: category.restaurantId,
//       categoryId: category.id,
//       name: faker.music.genre(),
//     });

//     expect(res.status).toBe(201);
//     expect(res.body).toHaveProperty("data");
//     expect(res.body).toHaveProperty("success");
//     expect(res.body.success).toBe(true);
//   });

//   test("get-items", async () => {
//     res = await req.get("/cum-shop/item");

//     const body = res.body;

//     expect(body.success).toBe(true);
//     // expect(body.data).toMatchObject<Item>()
//   });
// });
