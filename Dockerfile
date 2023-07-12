FROM node:latest

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 3000

CMD npx prisma migrate dev --name init;npm run dev 