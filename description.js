'use strict';

const SparqlClient = require('sparql-client-2');
const SPARQL = SparqlClient.SPARQL;

module.exports = {
    name: 'RDF',
    CONCURRENCY: 25,

    startup: function (host, cb) {
        var db = new SparqlClient('http://'+host+':3030/soc-pokec/query', {
            updateEndpoint: 'http://'+host+':3030/soc-pokec_temp/update'
          });
        cb(db)
    },

    warmup: function (db, cb) {
        db.query("select distinct ?s where {?s ?p ?o}").execute().then(
            (res) => {
                console.log('INFO step 1/2 done');

                module.exports.getCollection(db, 'profiles', function (err, coll) {
                    if(err) return cb(err);

                    var warmupIds = require('../data/warmup1000');
                    var goal = 1000;
                    var total = 0;
                    for (var i = 0; i < goal; i++) {
                        module.exports.getDocument(db, coll, warmupIds[i], function (err, res) {
                            if (err) return cb(err);
                            ++total;
                            if (total === goal) {
                                console.log('INFO step 2/2 done');
                                console.log('INFO warmup done');
                                cb(null);
                            }
                        });
                    }
                });
            }
        )
        cb(null);
    },

    getCollection(db, name, cb){
        cb(undefined, name.toUpperCase());
    },

    dropCollection: function (db, name, cb) {
        cb(null);
    },
    
    createCollectionSync: function (db, name, cb) {
        cb(null);
    },
    
    getDocument: function (db, coll, id, cb) {
        var query = "PREFIX user: <http://www.example.com/user/> PREFIX soc: <http://www.example.com/sock-pokec/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> SELECT ?p ?o WHERE { user:"+id.slice(1)+" ?p ?o }";
        db.query(query).execute().then(res => cb(null, res.results.bindings)).catch(err => cb(err));
    },
    
    saveDocumentSync: function (db, coll, doc, cb) {
        var uniqueId = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);

        var query = "PREFIX user: <http://www.example.com/user/> PREFIX soc: <http://www.example.com/sock-pokec/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> INSERT DATA { user:"+ uniqueId +" soc:public " + doc.public +" . user:"+ uniqueId +" soc:completion_percentage " + doc.completion_percentage +" . user:"+ uniqueId +" foaf:gender '" + escape( doc.gender )+"' . user:"+ uniqueId +" soc:region '" + escape( doc.region )+"' . user:"+ uniqueId +" soc:last_login '" + escape( doc.last_login )+"' . user:"+ uniqueId +" soc:registration '" + escape( doc.registration )+"' . user:"+ uniqueId +" foaf:age '" + escape( doc.AGE )+"' . user:"+ uniqueId +" soc:body '" + escape( doc.body )+"' . user:"+ uniqueId +" soc:I_am_working_in_field '" + escape( doc.I_am_working_in_field )+"' . user:"+ uniqueId +" soc:spoken_languages '" + escape( doc.spoken_languages )+"' . user:"+ uniqueId +" soc:hobbies '" + escape( doc.hobbies )+"' . user:"+ uniqueId +" soc:I_most_enjoy_good_food '" + escape( doc.I_most_enjoy_good_food )+"' . user:"+ uniqueId +" soc:pets '" + escape( doc.object )+"' . user:"+ uniqueId +" soc:body_type '" + escape( doc.body_type )+"' . user:"+ uniqueId +" soc:my_eyesight '" + escape( doc.my_eyesight )+"' . user:"+ uniqueId +" soc:eye_color '" + escape( doc.eye_color )+"' . user:"+ uniqueId +" soc:hair_color '" + escape( doc.hair_color )+"' . user:"+ uniqueId +" soc:hair_type '" + escape( doc.hair_type )+"' . user:"+ uniqueId +" soc:completed_level_of_education '" + escape( doc.completed_level_of_education )+"' . user:"+ uniqueId +" soc:favourite_color '" + escape( doc.favourite_color )+"' . user:"+ uniqueId +" soc:relation_to_smoking '" + escape( doc.relation_to_smoking )+"' . user:"+ uniqueId +" soc:relation_to_alcohol '" + escape( doc.relation_to_alcohol )+"' . user:"+ uniqueId +" soc:sign_in_zodia '" + escape( doc.sign_in_zodiac )+"' . user:"+ uniqueId +" soc:on_pokec_i_am_looking_for '" + escape( doc.on_pokec_i_am_looking_for )+"' . user:"+ uniqueId +" soc:love_is_for_m '" + escape( doc.love_is_for_me )+"' . user:"+ uniqueId +" soc:relation_to_casual_se '" + escape( doc.relation_to_casual_sex )+"' . user:"+ uniqueId +" soc:my_partner_should_be '" + escape( doc.my_partner_should_be )+"' . user:"+ uniqueId +" soc:marital_status '" + escape( doc.marital_status )+"' . user:"+ uniqueId +" soc:children '" + escape( doc.children )+"' . user:"+ uniqueId +" soc:relation_to_children '" + escape( doc.relation_to_children )+"' . user:"+ uniqueId +" soc:I_like_movies '" + escape( doc.I_like_movies )+"' . user:"+ uniqueId +" soc:I_like_watching_movie '" + escape( doc.I_like_watching_movie )+"' . user:"+ uniqueId +" soc:I_like_music '" + escape( doc.I_like_music )+"' . user:"+ uniqueId +" soc:I_mostly_like_listening_to_music '" + escape( doc.I_mostly_like_listening_to_music )+"' . user:"+ uniqueId +" soc:the_idea_of_good_evening '" + escape( doc.the_idea_of_good_evening )+"' . user:"+ uniqueId +" soc:I_like_specialties_from_kitchen '" + escape( doc.I_like_specialties_from_kitchen )+"' . user:"+ uniqueId +" soc:fun '" + escape( doc.fun )+"' . user:"+ uniqueId +" soc:I_am_going_to_concert '" + escape( doc.I_am_going_to_concerts )+"' . user:"+ uniqueId +" soc:my_active_sport '" + escape( doc.my_active_sports )+"' . user:"+ uniqueId +" soc:my_passive_sports '" + escape( doc.my_passive_sports )+"' . user:"+ uniqueId +" soc:profession '" + escape( doc.profession )+"' . user:"+ uniqueId +" soc:I_like_book '" + escape( doc.I_like_books )+"' . user:"+ uniqueId +" soc:life_style '" + escape( doc.life_style )+"' . user:"+ uniqueId +" soc:music '" + escape( doc.music )+"' . user:"+ uniqueId +" soc:car '" + escape( doc.cars )+"' . user:"+ uniqueId +" soc:politic '" + escape( doc.politics )+"' . user:"+ uniqueId +" soc:relationships '" + escape( doc.relationships )+"' . user:"+ uniqueId +" soc:art_culture '" + escape( doc.art_culture )+"' . user:"+ uniqueId +" soc:hobbies_interests '" + escape( doc.hobbies_interests )+"' . user:"+ uniqueId +" soc:science_technologies '" + escape( doc.science_technologies )+"' . user:"+ uniqueId +" soc:computers_internet '" + escape( doc.computers_internet )+"' . user:"+ uniqueId +" soc:education '" + escape( doc.education )+"' . user:"+ uniqueId +" soc:sport '" + escape( doc.sport )+"' . user:"+ uniqueId +" soc:movie '" + escape( doc.movies )+"' . user:"+ uniqueId +" soc:travelling '" + escape( doc.travelling )+"' . user:"+ uniqueId +" soc:health '" + escape( doc.health )+"' . user:"+ uniqueId +" soc:companies_brand '" + escape( doc.companies_brands )+"' . user:"+ uniqueId +" soc:more '" + escape( doc.more )+"' }";
        db.query(query).execute().then(res => cb(null, true)).catch(err => cb(err));
    },
    
    aggregate: function (db, coll, cb) {
        var query = "PREFIX soc: <http://www.example.com/sock-pokec/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX user: <http://www.example.com/user/> SELECT ?object (COUNT(?object) as ?ageEntries) WHERE { ?subject foaf:age ?object } GROUPBY ?object ";
        db.query(query).execute().then(res => cb(null, res.results.bindings)).catch(err => cb(err));
    },
    
    neighbors: function (db, collP, collR, id, i, cb) {
          var query = "PREFIX soc: <http://www.example.com/sock-pokec/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX user: <http://www.example.com/user/> SELECT DISTINCT ?object WHERE {user:"+id.slice(1)+" foaf:knows ?object}"
          db.query(query).execute().then(res => cb(null, res.results.bindings.length)).catch(err => cb(err));
      },
    
    neighbors2: function (db, collP, collR, id, i, cb) {
        var query = "PREFIX soc: <http://www.example.com/sock-pokec/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX user: <http://www.example.com/user/> SELECT DISTINCT ?object WHERE {user:"+id.slice(1)+" foaf:knows ?object}"
        db.query(query).execute().then(res => cb(null, res.results.bindings.length)).catch(err => cb(err));
    },
    
    neighbors2data: function (db, collP, collR, id, i, cb) {
        var query = "PREFIX soc: <http://www.example.com/sock-pokec/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> PREFIX user: <http://www.example.com/user/> select distinct ?union ?pred ?value where { { { select ?union { ?x foaf:knows ?union . values ?x { user:"+id.slice(1)+" } . FILTER (?union != ?x) } } UNION { select ?union { ?x foaf:knows ?y . ?y foaf:knows ?union . values ?x { user:"+id.slice(1)+" } . FILTER (?union != ?x) } } . ?union ?pred ?value . FILTER (?pred != foaf:knows ) . } }";
        db.query(query).execute().then(res => cb(null, res.results.bindings.length)).catch(err => cb(err));
    },

    shortestPath: function (db, collP, collR, path, i, cb) {
        cb(null);
    }
}