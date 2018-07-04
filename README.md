# express-stub
> A template for a Typescript Express.js API.

## Download
Download the stub from GitHub.
```bash
git clone https://github.com/danjwelsh/express-stub.git
```

## Setup as Blank Project
Run the command below to remove the `.git` folder, and reinitialise as a new repository.
```bash
./setup.sh
```

## Build
Install typescript and compile to JavaScript:
```bash
npm i -g typescript && tsc && cp .env.example .env
```
This will initialise the project with dummy environment variables, the project requires:
```
DEBUG=false
TEST=false
SECRET=changetoasecret
MONGO_URI=mongodb://mongo/stub
```

## Run
```bash
npm run
```

## Test
```bash
npm test
```