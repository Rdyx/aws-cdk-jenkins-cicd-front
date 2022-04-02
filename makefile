SHELL = /bin/sh

init:
	pip3 install --upgrade awscli --user
	npm cache clean --force
	npm install

beforedeploy:
	echo ""

unittests:
	npm run test

buildapp:
	npm run build

deploy:
	aws s3 cp build s3://front-$BUCKET_NAME/ --recursive

afterdeploy:
	echo ""

cleanworkspace:
	echo ""
