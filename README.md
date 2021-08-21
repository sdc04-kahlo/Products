# Atelier Products API

Scalable service that provides product information interfacing with the [front end](https://github.com/RFP54-Helios/FEC) of a growing online retail portal.

## Contents

- [Contributing](CONTRIBUTING.md)
- [Using the API](docs/API-usage.md)
- [Deploying to AWS](docs/Deployment.md)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)

## Tech Stack

![node](https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg)

### Node.js

- Non-blocking, event-driven server

![express](https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg)

### Express

- Route HTTP requests to respond with database query results

![postgres](https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg)

### PostgreSQL

- Fast database reads at web-scale

![nginx](https://www.vectorlogo.zone/logos/nginx/nginx-ar21.svg)

### NGINX

- Load balance between many routers

![aws](https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg)

### AWS Elastic Cloud Compute

- Quickly deploy many instances from an image to manage high volumes of traffic

![new relic](https://www.vectorlogo.zone/logos/newrelic/newrelic-ar21.svg)

### New Relic APM

- Monitor performance while stress testing to identify optimization opportunities

---

## System Architecture

![System Architecture](docs/img/architecture.png)
