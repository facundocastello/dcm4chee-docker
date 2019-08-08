#!/bin/sh
set -v

# Install and set up MySQL
mysql_install_db
/usr/bin/mysqld_safe &
sleep 5s
# Create the 'pacsdb' and 'arrdb' databases, and 'pacs' and 'arr' DB users.
mysql -uroot < /stage/create_dcm4chee_databases.sql
# Load the 'pacsdb' database schema
mysql -upacs -ppacs pacsdb < $DCM_DIR/sql/create.mysql

sed "s/type=/engine=/g" $DCM_DIR/sql/dcm4chee-arr-mysql.ddl > fixed.ddl
mv fixed.ddl $DCM_DIR/sql/dcm4chee-arr-mysql.ddl
# Load the 'arrdb' database schema
mysql -uarr -parr arrdb < $DCM_DIR/sql/dcm4chee-arr-mysql.ddl