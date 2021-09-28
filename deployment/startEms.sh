./phl-controller.sh down
cd docker/ems_compose/
vi .env
docker-compose -f docker-compose-emsdb.yaml up -d
docker logs -f emsdb
docker-compose -f docker-compose-ems.yaml up -d
docker logs -f ems
docker exec ems bash -c "sed -i 's/verify-client=\"true\"/verify-client=\"false\"/' /opt/jboss/jboss/standalone/configuration/standalone-full.xml"
docker stop ems
docker start ems
docker logs -f ems
