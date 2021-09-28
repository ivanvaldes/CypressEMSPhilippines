#!/bin/bash
echo "Disable verify-client"
docker exec ems bash -c "sed -i 's/verify-client=\"true\"/verify-client=\"false\"/' /opt/jboss/jboss/standalone/configuration/standalone-full.xml"
echo "Stop EMS container"
docker stop ems
echo "Start EMS container"
docker start ems
echo "EMS logs"
docker logs -f ems