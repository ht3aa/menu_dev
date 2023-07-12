const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

prisma.restaurant
  .create({
    data: {
      name: "tafa3ul",
      address: "",
      colors: "",
      image: "",
      groupName: "tafa3ul",
      addressLink: "",
      active: true,
      description: "",
    },
  })
  .then((res) => {
    bcrypt.hash("tafa3ul", 12).then((p) => {
      prisma.user
        .create({
          data: {
            phoneNumber: "07709077799",
            username: "mr.ahmed",
            restaurantId: res.id,
            role: "SUPER_ADMIN",
            password: p,
          },
        })
        .then(() => console.log("created super admin"));
    });
  });
