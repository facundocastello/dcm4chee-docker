#!/bin/bash
set -v

/usr/bin/mysqld_safe &
sleep 5s &
/var/local/dcm4chee/dcm4chee-2.18.3-mysql/bin/run.sh
