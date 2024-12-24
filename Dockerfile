FROM alpine:latest AS base
ARG buildnno=1

WORKDIR /
WORKDIR app
WORKDIR build

RUN touch test.txt && echo "Hello world" >> test.txt
RUN apk add openjdk17
RUN cd .. \
    && wget https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.33/bin/apache-tomcat-10.1.33.tar.gz \
    && tar -xvzf apache-tomcat-10.1.33.tar.gz \
    && rm apache-tomcat-10.1.33.tar.gz

COPY .idea idea-new
COPY .idea/*xml idea-new-xml/
ADD https://dlcdn.apache.org/tomcat/tomcat-10/v10.1.33/bin/apache-tomcat-10.1.33.tar.gz tomcat-add.tar.gz

FROM alpine:latest
RUN apk add openjdk17
COPY --from=base /app/apache-tomcat-10.1.33 /app/apache-tomcat-10.1.33

EXPOSE 8080
ENTRYPOINT ["/app/apache-tomcat-10.1.33/bin/catalina.sh"]
CMD ["run"]
