import bcrypt from "bcrypt";
import prisma from "./prisma";

const username = process.argv[2];
const phoneNumber = process.argv[3];
let password = process.argv[4];

bcrypt.hash(password, 12).then((hashedPassword) => {
  prisma.user
    .create({
      data: {
        password: hashedPassword,
        username,
        phoneNumber,
        role: "SUPER_ADMIN",
        restaurant: { create: { name: username } },
      },
    })
    .then((res) => console.log("created super admin"));
});
