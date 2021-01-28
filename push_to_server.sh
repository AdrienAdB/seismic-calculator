#!/bin/bash
server='abaltardive@cms2.acte.solutions'
dest_folder='/var/www/react/'

npm install &&
npm run build &&
rsync --delete -a --progress ./build $server:$dest_folder/
