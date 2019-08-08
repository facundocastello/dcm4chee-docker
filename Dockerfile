#
# DCM4CHEE - Open source picture archive and communications server (PACS)
#
FROM ubuntu:12.04

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y curl zip mysql-server openjdk-6-jdk

ADD dcm4chee-2.18.3-mysql /var/local/dcm4chee/dcm4chee-2.18.3-mysql
ENV DCM4CHEE_HOME=/var/local/dcm4chee
ENV DCM_DIR=$DCM4CHEE_HOME/dcm4chee-2.18.3-mysql

#solve WADO problem
RUN curl https://raw.githubusercontent.com/nroduit/mvn-repo/master/org/weasis/thirdparty/com/sun/media/libclib_jiio/1.2-b04/libclib_jiio-1.2-b04-linux-x86-64.so > /var/local/dcm4chee/dcm4chee-2.18.3-mysql/bin/native/libclib_jiio.so

# Create databases and import
ADD stage stage
RUN chmod 755 stage/*.bash
# RUN cd stage; ./create-database.bash

# Update environment variables
RUN echo "\
    JAVA_HOME=/usr/lib/jvm/java-6-openjdk-amd64\n\
    PATH=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"\n\
    " > /etc/environment

CMD ["stage/start.bash"]
