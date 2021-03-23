# ec-elasticsearch-sample-1-api

This is the `ec-elasticsearch-sample-1` project's backend.

`ec-elasticsearch-sample-1`: https://github.com/komiyak/ec-elasticsearch-sample-1

# How to run in local

```shell
$ docker-compose -f docker-compose.local-services.yml up   # Ready required services in local.
$ npm start  # Started at localhost:3000
```

You can see the Swagger UI of this api.  
http://localhost:3000/api-docs

# Environment variables

| Name | Default | Summary | Required |
| --- | --- | --- | --- |
| `PORT` | `3000` | The port number of this api | NO |
| `ELASTICSEARCH_HOST` | `http://localhost:9200` | The Elasticsearch's host to search | NO |

# Summary of scripts

```shell
# Generate and export the api document to './out' from the source code by JSDoc.
$ npm run jsdoc
```

# Scripts (in Python)

`<project_root>/script_*.py` are useful scripts for development.

### Supported Python Versions

Python >= 3.8

### Install dependencies

```shell
$ pip install -r requirements.txt  # We recommend to use virtualenv.
```

### How to use

See the document's help of the script.

```shell
$ script_<your_choice>.py -h
```

# About the staging server

Hosting on App Engine.
This api project is deployed by GitHub Actions automatically.

URL is: https://ec-elasticsearch-1-api.an.r.appspot.com/

Hosting the Elasticearch for the staging on app.bonsai.io using sandbox cluster.
