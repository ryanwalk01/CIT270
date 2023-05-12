echo "logging in"
curl -k -v -d "@login.json" POST -H "Content-Type:application/json" http://localhost:3000/login
@REM curl -v https://dev.stedi.me/validate/f1018dff-7015-493e-823e-04d8dabf0094