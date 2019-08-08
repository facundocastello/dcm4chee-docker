#
# DCM4CHEE - Open source picture archive and communications server (PACS)
#
FROM ubuntu:12.04

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y curl zip mysql-server openjdk-6-jdk
# Install dependencies
RUN mkdir /stage

ENV DCM4CHEE_HOME=/var/local/dcm4chee

# Download the binary package for DCM4CHEE
RUN curl -G https://ufpr.dl.sourceforge.net/project/dcm4che/dcm4chee/2.18.3/dcm4chee-2.18.3-mysql.zip > /stage/dcm4chee-2.18.3-mysql.zip && \
    unzip -q /stage/dcm4chee-2.18.3-mysql.zip -d $DCM4CHEE_HOME

# Download the binary package for DCM4CHEE
RUN curl -G https://ufpr.dl.sourceforge.net/project/dcm4che/dcm4chee/2.18.1/dcm4chee-2.18.1-mysql.zip > /stage/dcm4chee-2.18.1-mysql.zip && \
    unzip -q /stage/dcm4chee-2.18.1-mysql.zip -d $DCM4CHEE_HOME

# Download the binary package for JBoss
RUN curl -G https://ufpr.dl.sourceforge.net/project/jboss/JBoss/JBoss-4.2.3.GA/jboss-4.2.3.GA-jdk6.zip > /stage/jboss-4.2.3.GA-jdk6.zip && \
    unzip -q /stage/jboss-4.2.3.GA-jdk6.zip -d $DCM4CHEE_HOME

# Download the Audit Record Repository (ARR) package
RUN curl -G https://ufpr.dl.sourceforge.net/project/dcm4che/dcm4chee-arr/3.0.11/dcm4chee-arr-3.0.11-mysql.zip > /stage/dcm4chee-arr-3.0.11-mysql.zip && \
    unzip -q /stage/dcm4chee-arr-3.0.11-mysql.zip -d $DCM4CHEE_HOME

#Set envs
ENV DCM_DIR=$DCM4CHEE_HOME/dcm4chee-2.18.3-mysql
ENV JBOSS_DIR=$DCM4CHEE_HOME/jboss-4.2.3.GA
ENV ARR_DIR=$DCM4CHEE_HOME/dcm4chee-arr-3.0.11-mysql

RUN mkdir -p $DCM4CHEE_HOME

RUN cp $DCM4CHEE_HOME/dcm4chee-2.18.1-mysql/bin/install_arr.sh $DCM4CHEE_HOME/dcm4chee-2.18.3-mysql/bin/install_arr.sh && \
    cp $DCM4CHEE_HOME/dcm4chee-2.18.1-mysql/bin/install_jboss.sh $DCM4CHEE_HOME/dcm4chee-2.18.3-mysql/bin/install_jboss.sh

# Copy files from JBoss to dcm4chee
RUN $DCM_DIR/bin/install_jboss.sh $DCM4CHEE_HOME/jboss-4.2.3.GA > /dev/null

# Copy files from the Audit Record Repository (ARR) to dcm4chee
RUN $DCM_DIR/bin/install_arr.sh $DCM4CHEE_HOME/dcm4chee-arr-3.0.11-mysql > /dev/null

RUN curl https://raw.githubusercontent.com/nroduit/mvn-repo/master/org/weasis/thirdparty/com/sun/media/libclib_jiio/1.2-b04/libclib_jiio-1.2-b04-linux-x86-64.so > /var/local/dcm4chee/dcm4chee-2.18.3-mysql/bin/native/libclib_jiio.so

# Create databases and import
ADD stage stage
RUN chmod 755 stage/*.bash
RUN cd stage; ./create-database.bash


# Update environment variables
RUN echo "\
    JAVA_HOME=/usr/lib/jvm/java-6-openjdk-amd64\n\
    PATH=\"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\"\n\
    " > /etc/environment

CMD ["stage/start.bash"]
