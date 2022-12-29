#!/bin/sh

./mvnw clean install

java -jar target/graphql-app-int*.jar