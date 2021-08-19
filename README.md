# Atelier Products API

This project is a scalable API server of product information to interface with the [front end](https://github.com/RFP54-Helios/FEC/blob/main/README.md) of a growing online retail portal.

## Contributing

Please read the [contributing docs](CONTRIBUTING.md) before starting any work.

## Tech Stack

<code><img width="15%" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg"></code>

### Node.js

- Non-blocking, event-driven server

<code><img width="15%" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-ar21.svg"></code>

### Express

- Route HTTP requests to respond with database query results

<code><img width="15%" src="https://www.vectorlogo.zone/logos/postgresql/postgresql-ar21.svg"></code>

### PostgreSQL

- Fast database reads at web-scale

<code><img width="15%" src="https://www.vectorlogo.zone/logos/nginx/nginx-ar21.svg"></code>

### NGINX

- Load balance between many routers

<code><img width="15%" src="https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg"></code>

### AWS Elastic Cloud Compute

- Quickly deploy many instances from an image to manage high volumes of traffic

<code><img width="15%" src="https://www.vectorlogo.zone/logos/newrelic/newrelic-ar21.svg"></code>

### New Relic APM

- Monitor performance while stress testing to identify optimization opportunities

---

## Deployment Instructions

### Database

1. Launch an Ubuntu 20.04 LTS [EC2 instance](https://docs.aws.amazon.com/quickstarts/latest/vmlaunch/step-1-launch-instance.html)
1. Add an inbound security rule to allow traffic on TCP port 5432 from anywhere
1. Install [Postgres](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)

    ```bash
    sudo apt-get update && sudo apt-get -y upgrade
    sudo apt-get install postgresql postgresql-contrib​
    ```

1. Transfer the `csv-full` folder to that instance

    ```bash
    scp -i secret_key.pem -r csv-full ubuntu@0.0.0.0:~/
    ```

1. Seed the database by running the [seed script](scripts/seed.sql)

    ```bash
    sudo -u postgres psql < csv-full/seed.sql
    ```

1. Modify the config file `pg_hba.conf`

    ```bash
    sudo vim /etc/postgresql/12/main/pg_hba.conf

    # add this line near bottom (allows remote access)
    host    all             all             0.0.0.0/0               md5
    ```

1. Modify the config file `postgresql.conf`

    ```bash
    sudo vim /etc/postgresql/12/main/postgresql.conf

    # Change line 59 to listen to external requests:
    listen_address='*'
    ```

1. Restart Postgres

    ```bash
    sudo service postgresql restart
    ```
