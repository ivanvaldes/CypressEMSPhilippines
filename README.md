# Cypress EMS Philippines
E2E for the EMS Philippines

#### Pre set-up project
1) **Start EMS**
```
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
```

2) **Reset setup user password - QUERY**
```
UPDATE CORE_SECURITY_USER 
SET DEFAULT_PSWD_CHANGED = 0, 
password='d9af8eeced7fe7c34312a19ca52392734478a25bbceea6999aea89a9211478bebe89487a843a87fdb97a04ff4eab0dd6a8387d71fd2d64e343a80ab961390214';
commit;
```

3) Set your username and password in the cypress json file