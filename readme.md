# RDF transfomer and query for ArangoDB NoSQL benchmark
This repo contains a mapping and transformation of the csv representation of the Pokec social network dump used in the ArangoDB NoSQL benchmark test.
 It also includes the file containing the queries used for the benchmark.

 ## How to
 First download the dump files from stanford: https://snap.stanford.edu/data/soc-pokec.html

Put them in the corresponding folders (relations / profiles).
you'll also need to make two folders within the relations and profiles folders, they should be named `nt` and `source`.
Since the files are in `.txt` format and the files are separated with tab we need to convert them to the csv format. This can be done by running a command inside each folder. 

For the profiles run this command: `tr '\t' , < soc-pokec-profiles.txt > soc-pokec-profiles.csv`

For relations run this command: `tr '\t' , < soc-pokec-relationships.txt > soc-pokec-relationships.csv`
`

Then inside each folder there's a script `for.sh` run this with the command `sh for.sh` it will split the csv file into smaller files, then for each of the smaller files it will create a RDF mapping and store it as `.nt` files inside the folder `nt`.

## URIs and prefixes
The mapping is as follows for the two different files:

 ### Relationships
 Uses the following URIs:

`http://www.example.com/users/` - adding the id number of a user at the end of the URI

`http://http://xmlns.com/foaf/0.1/` - using the `foaf:knows` relation to relate two users.

### Profiles
Uses the following URIs:

`http://www.example.com/users/` - adding the id number of a user at the end of the URI

`http://http://xmlns.com/foaf/0.1/` - using the `foaf:age` for the age column and  `foaf:gender` for the gender column.

`http://www.example.com/soc-pokec/` - is used for all other values from the data set using the column names described here: https://snap.stanford.edu/data/soc-pokec-readme.txt as the value for the relation. EG: `http://www.example.com/soc-pokec/public/`

## description.js
Before using this description with the NoSQL benchmark, you would need to install the node package `sparql-client-2`.

The file description.js contains the setup to connect to a SPARQL endpoint. In this file the endpoint is set up to correspond to the apache fuseki portnumber and endpoints.
Notice that to make the queries on the inputed ID the first characther of each id is removed since the benchmark on setup applise an additional `P` in front of each user ID.
