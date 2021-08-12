# Atelier Products API

This project is a scalable database server of product information to interface with the front end of a growing online retail portal.

## Contributing

PRs welcome! Please read the [contributing docs](CONTRIBUTING.md) before starting any work.

## Set up instructions

### Database set up

1. ensure [Postgres](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database#install-postgresql) is installed and running

    ```bash
    sudo service postgresql start
    ```

1. build and load the database from the files in `csv-extracts/` (ignored by git)

    ```bash
    # WARNING: this will erase an data stored in the database
    npm run seed
    ```

1. use the CLI view to confirm success

    ```
    $ sudo -u postgres psql

    postgres=# \c atelierproducts

    atelierproducts=# \dt+
                            List of relations
    Schema |   Name   | Type  |  Owner   |    Size    | Description
    --------+----------+-------+----------+------------+-------------
    public | features | table | postgres | 129 MB     |
    public | photos   | table | postgres | 8192 bytes |
    public | products | table | postgres | 8192 bytes |
    public | related  | table | postgres | 190 MB     |
    public | skus     | table | postgres | 8192 bytes |
    public | styles   | table | postgres | 104 MB     |
    (6 rows)

    atelierproducts=# select * from styles limit 5;
    id | product_id |         name         | sale_price | original_price | default_style
    ----+------------+----------------------+------------+----------------+---------------
      1 |          1 | Forest Green & Black | null       | 140            | t
      2 |          1 | Desert Brown & Tan   | null       | 140            | f
      3 |          1 | Ocean Blue & Grey    | 100        | 140            | f
      4 |          1 | Digital Red & Black  | null       | 140            | f
      5 |          1 | Sky Blue & White     | 100        | 140            | f
    (5 rows)
    ```

1. log out of the CLI

    ```
    atelierproducts=# \q
    ```
