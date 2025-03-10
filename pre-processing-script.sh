#!/bin/bash

echo "Waiting for Kibana to start..."
until [ $(curl -s -o /dev/null -w "%{http_code}" http://kibana:5601/api/status) -eq 200 ]; do
    response=$(curl -s http://kibana:5601/api/status)
    echo "Current response: $response"
    sleep 10
done

echo "Calling Task Dump API..."
response=$(curl --location 'backendserver:5010/task' \
     --header 'Content-Type: application/json' \
     --data-raw '[
         {
             "priority": "High",
             "assignee": "demo@acko.tech",
             "type": "proposal",
             "status": "pending",
             "calculated_priority": 0,
             "business_entity_impl": {
                 "proposal_id": "22ed4c47-we5c-45ae-1ced-11a9936845b0",
                 "proposal_status": "pending",
                 "member_ids": ["1","2", "3"]
             }
         }
     ]')

echo "Data Insertion API done! Response:"
echo "$response"

echo "Kibana is up! Importing dashboard..."
response=$(curl -X POST "http://kibana:5601/api/saved_objects/_import?overwrite=true" \
     -H "kbn-xsrf: true" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/tmp/dashboard.ndjson")

echo "Dashboard import completed! Response:"
echo "$response"
