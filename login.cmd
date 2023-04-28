echo "logging in"
curl -v -d "@login.json" POST -H "Content-Type:application/json" https://dev.stedi.me/login
curl -v https://dev.stedi.me/validate/f1018dff-7015-493e-823e-04d8dabf0094