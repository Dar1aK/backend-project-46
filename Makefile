install: 
	npm ci

publish:
	npm publish --dry-run

lint: 
	npx eslint

test: 
	npx jest

test-coverage:
	npx jest --coverage --coverageProvider=v8

format:
	npx prettier --write "**/*.js"