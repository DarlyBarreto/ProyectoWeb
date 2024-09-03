#!/bin/bash
#https://www.odoo.com/documentation/16.0/administration/install/source.html
#Ruta donde se instalara Odoo
ruta_odoo='/home/jorge/odoo'
#Ruta donde se almacenaran los logs
ruta_logs='/var/log/odoo/'
#Usuario del sistema operativo con permisos para gestionar Odoo.
usuario_1='jorge'
#Contrasena para el usuario postgres propio del SGBD postgres
pass_postgres='jorge123'
#Usuario de la base de datos que configuramos en Odoo
usuario_2='openpg'
#contrase;a para el usuaroi_2
pass_usuario_2='openpgpwd'
#Nombre de la base de datos que configuramos en Odoo
nombre_bd='db01'

echo "--------- UPDATE LINUX   ---------------"
sudo apt update
sudo apt --fix-broken install -y
sudo apt -y upgrade

echo "--------- INSTALL LIB  ---------------"
sudo apt install python3-pip libldap2-dev libpq-dev libsasl2-dev xfonts-75dpi python3-pypdf2 nodejs npm -y
#sudo apt install fontconfig xfonts-base git python3-dev python3-pypdf2 python3-setuptools   -y
sudo apt --fix-broken install python3-cffi -y
sudo apt install xfonts-75dpi python3-pypdf2 libjpeg-dev curl nodejs npm -y
sudo apt install postgresql postgresql-client -y
#sudo apt install postgresql postgresql-server-dev-14 postgresql-client -y

#odoo:

#clear
#sudo adduser --system --quiet --shell=/bin/bash --home=${home_odoo} --gecos ${usuario_1} --group ${usuario_1}
#echo "Introduzca contrasena para usuario ${usuario_1} ..."
#sudo passwd ${usuario_1}

#clear 
echo "--------- DESCARGA ODOO   ---------------"
#sudo git clone --depth 1 --branch 16.0 https://github.com/odoo/odoo ${ruta_odoo}
sudo git clone --depth 1 --branch saas-16.4 https://github.com/odoo/odoo ${ruta_odoo}

sudo chown ${usuario_1}:${usuario_1} ${ruta_odoo} -R
sudo mkdir ${ruta_logs}
sudo chown ${usuario_1}:${usuario_1} ${ruta_logs} -R

echo "--------- INSTALL ODOO   ---------------"
#clear
#sudo rm /usr/lib/python3/dist-packages/_cffi_backend.cpython-310-x86_64-linux-gnu.so

#sudo pip3 install cffi
sudo pip3 install -r ${ruta_odoo}/requirements.txt
#sudo pip3 install -r /home/jorge/odoo/requirements.txt
echo "--------- PDF INSTALL   ---------------"
#clear
cd /tmp
wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.jammy_amd64.deb
sudo dpkg -i wkhtmltox_0.12.6.1-2.jammy_amd64.deb
sudo ln -s /usr/local/bin/wkhtmltopdf /usr/bin/
sudo ln -s /usr/local/bin/wkhtmltoimage /usr/bin/

echo "--------- DATABASE INSTALL   ---------------"
#clear
sudo curl https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo apt-key add
sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/jammy pgadmin4 main" > /etc/apt/sources.list.d/pgadmin4.list'
sudo apt update
sudo apt install pgadmin4-desktop -y


echo "--------- DATABASE PERMISOS  ---------------"
#clear
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '${pass_postgres}';"
sudo -u postgres psql -c "CREATE USER ${usuario_2} WITH PASSWORD '${pass_usuario_2}';"
sudo -u postgres psql -c "CREATE DATABASE ${nombre_bd};"
sudo -u postgres psql -c "GRANT ALL ON DATABASE ${nombre_bd} TO ${usuario_2};"
sudo -u postgres psql -c "ALTER DATABASE ${nombre_bd} OWNER TO ${usuario_2};"

echo "--------- VERIFICO  ---------------"

sudo -u $usuario_1 ${ruta_odoo}/odoo-bin -r ${usuario_2} -w ${pass_usuario_2} --db_host localhost -d ${nombre_bd} -i base --addons-path=${ruta_odoo}/addons --without-demo=all -s --stop-after-init
#sudo -u wzamora /home/wzamora/odoo/odoo-bin -r openpg -w openpgpwd --db_host localhost -d db01 -i base --addons-path=/home/wzamora/odoo/addons --without-demo=all -s --stop-after-init

echo "--------- PASO FINAL ---------------"

#clear
echo "Introduzca contrasena para el usuario postgreSQL del sistema operativo"
sudo passwd postgres

#clear
echo "Usuario de sistema ${usuario_1} .... CREADO"
echo "Odoo descargado en ${ruta_odoo}"
echo "La carpeta logs esta en ${ruta_logs}"
echo "Instalado cffi, wkhtmltopdf y pgadmin4"
echo "Contrasena del usuario postgres de la BD cambiada a: ${pass_postgres}"
echo "En el SGBD Postgres se ha creado el usuario: ${usuario_2} con contrasena: ${pass_usuario_2}"
echo "En el SGBD Postgres se ha creado la bd: ${nombre_bd} y se han asignado permisos y propiedad" 

