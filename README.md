# angular2-newpriceupdate
priceupdate ui for internal usage

to start:

    git clone https://github.com/modimod/angular2-newpriceupdate.git
    npm install


deploy:

    npm install -g browserify
    npm install -g uglify-js
    npm run build_prod


start development server:

    php -S localhost:8000


I don't use a build-tool yet, so copy this to terminal:

cd /Users/pmoertenboeck/github/angular2-newpriceupdate
rm -rf depl
mkdir depl
mkdir depl/api
mkdir depl/app
mkdir depl/dist
mkdir depl/node_modules
mkdir -p depl/node_modules/bootstrap/dist/css/

cp index.html depl/
cp api/* depl/api/
cp app/article-list.component.html depl/app/
cp dist/bundle.min.js depl/dist/
cp -r node_modules/zone.js depl/node_modules/
cp -r node_modules/reflect-metadata depl/node_modules/
cp node_modules/bootstrap/dist/css/bootstrap.min.css depl/node_modules/bootstrap/dist/css/bootstrap.min.css

tar -zcvf pricetool.tar.gz depl
rm -rf depl

ssh root@as-bms-slave.hf.aberger.at rm -rf /var/www/html/pricetool/*
scp pricetool.tar.gz root@as-bms-slave.hf.aberger.at:/var/www/html/pricetool/
ssh root@as-bms-slave.hf.aberger.at /bin/bash << EOF
 tar -zxvf /var/www/html/pricetool/pricetool.tar.gz -C /var/www/html/pricetool/
 mv /var/www/html/pricetool/depl/* /var/www/html/pricetool/
 rm -rf /var/www/html/pricetool/depl
 rm -f /var/www/html/pricetool/pricetool.tar.gz
EOF

