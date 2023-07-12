rm package-lock.json

rm yarn.lock

git pull https://thefirst1hunter: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@github.com/thefirst1hunter/menu.git dev

npm i

npx prisma migrate dev

npm run build

pm2 reload menuDev