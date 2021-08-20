# Atelier Products API

This project is a scalable API server of product information to interface with the [front end](https://github.com/RFP54-Helios/FEC) of a growing online retail portal.

## Contributing

Please read the [contributing docs](CONTRIBUTING.md) before starting any work.

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

## Deployment Instructions

### Database Server

1. Launch an Ubuntu 20.04 LTS [EC2 instance](https://docs.aws.amazon.com/quickstarts/latest/vmlaunch/step-1-launch-instance.html)
1. Add an inbound security rule to allow traffic on TCP port 5432 from anywhere
1. Connect via ssh in bash (replace 0.0.0.0 with the IP address of your instance)

    ```bash
    chmod 400 secret_key.pem
    ssh -i secret_key.pem ubuntu@0.0.0.0
    ```

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

### Node Express Server

1. Launch an Ubuntu 20.04 LTS [EC2 instance](https://docs.aws.amazon.com/quickstarts/latest/vmlaunch/step-1-launch-instance.html)
1. Add an inbound security rule to allow traffic on TCP port 80 (HTTP) from anywhere
1. Connect via ssh in bash (replace 0.0.0.0 with the IP address of your instance)

    ```bash
    chmod 400 secret_key.pem
    ssh -i secret_key.pem ubuntu@0.0.0.0
    ```

1. Install [Node](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)

    ```bash
    sudo apt-get update && sudo apt-get -y upgrade
    sudo apt-get install postgresql postgresql-contrib​
    ```

1. Configure port forwarding so HTTP requests are handled by your Express server running on port 3000

    ```bash
    sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
    ```

1. Clone this repository

    ```bash
    git clone https://github.com/sdc04-kahlo/Products.git
    ```

1. Install dependencies

    ```bash
    cd Products
    npm install
    ```

1. Make a copy of the `.env` config file and update the values with API keys and the IP address of your Postgres server

    ```bash
    cp .env-sample .env
    vim .env
    ```

1. Start the server

    ```bash
    npm run start:prod
    ```
