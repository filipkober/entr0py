git pull origin master
pm2 stop entr0py
yarn build
pm2 start entr0py