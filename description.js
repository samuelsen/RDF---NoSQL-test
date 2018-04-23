'use strict';

const SparqlClient = require('sparql-client-2');
const SPARQL = SparqlClient.SPARQL;

module.exports = {
    name: 'RDF',

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
        var uniqueId = Math.random().toString(36).substring(2) 
               + (new Date()).getTime().toString(36);

        var query = "PREFIX user: <http://www.example.com/user/> PREFIX soc: <http://www.example.com/sock-pokec/> PREFIX foaf: <http://xmlns.com/foaf/0.1/> INSERT DATA { user:"+ uniqueId +" soc:public" + doc.public +" . user:"+ uniqueId +" soc:completion_percentage" + doc.completion_percentage +" . user:"+ uniqueId +" foaf:gender" + doc.gender +" . user:"+ uniqueId +" soc:region" + doc.region +" . user:"+ uniqueId +" soc:last_login" + doc.last_login +" . user:"+ uniqueId +" soc:registration" + doc.registration +" . user:"+ uniqueId +" foaf:age" + doc.AGE +" . user:"+ uniqueId +" soc:body" + doc.body +" . user:"+ uniqueId +" soc:I_am_working_in_field" + doc.I_am_working_in_field +" . user:"+ uniqueId +" soc:spoken_languages" + doc.spoken_languages +" . user:"+ uniqueId +" soc:hobbies" + doc.hobbies +" . user:"+ uniqueId +" soc:I_most_enjoy_good_food" + doc.I_most_enjoy_good_food +" . user:"+ uniqueId +" soc:pets" + doc.object +" . user:"+ uniqueId +" soc:body_type" + doc.body_type +" . user:"+ uniqueId +" soc:my_eyesight" + doc.my_eyesight +" . user:"+ uniqueId +" soc:eye_color" + doc.eye_color +" . user:"+ uniqueId +" soc:hair_color" + doc.hair_color +" . user:"+ uniqueId +" soc:hair_type" + doc.hair_type +" . user:"+ uniqueId +" soc:completed_level_of_education" + doc.completed_level_of_education +" . user:"+ uniqueId +" soc:favourite_color" + doc.favourite_color +" . user:"+ uniqueId +" soc:relation_to_smoking" + doc.relation_to_smoking +" . user:"+ uniqueId +" soc:relation_to_alcohol" + doc.relation_to_alcohol +" . user:"+ uniqueId +" soc:sign_in_zodia" + doc.sign_in_zodiac +" . user:"+ uniqueId +" soc:on_pokec_i_am_looking_for" + doc.on_pokec_i_am_looking_for +" . user:"+ uniqueId +" soc:love_is_for_m" + doc.love_is_for_me +" . user:"+ uniqueId +" soc:relation_to_casual_se" + doc.relation_to_casual_sex +" . user:"+ uniqueId +" soc:my_partner_should_b" + doc.my_partner_should_be +" . user:"+ uniqueId +" soc:marital_statu" + doc.marital_status +" . user:"+ uniqueId +" soc:childre" + doc.children +" . user:"+ uniqueId +" soc:relation_to_childre" + doc.relation_to_children +" . user:"+ uniqueId +" soc:I_like_movies" + doc.I_like_movies +" . user:"+ uniqueId +" soc:I_like_watching_movie" + doc.I_like_watching_movie +" . user:"+ uniqueId +" soc:I_like_musi" + doc.I_like_music +" . user:"+ uniqueId +" soc:I_mostly_like_listening_to_musi" + doc.I_mostly_like_listening_to_music +" . user:"+ uniqueId +" soc:the_idea_of_good_evenin" + doc.the_idea_of_good_evening +" . user:"+ uniqueId +" soc:I_like_specialties_from_kitchen" + doc.I_like_specialties_from_kitchen +" . user:"+ uniqueId +" soc:fun" + doc.fun +" . user:"+ uniqueId +" soc:I_am_going_to_concert" + doc.I_am_going_to_concerts +" . user:"+ uniqueId +" soc:my_active_sport" + doc.my_active_sports +" . user:"+ uniqueId +" soc:my_passive_sports" + doc.my_passive_sports +" . user:"+ uniqueId +" soc:professio" + doc.profession +" . user:"+ uniqueId +" soc:I_like_book" + doc.I_like_books +" . user:"+ uniqueId +" soc:life_styl" + doc.life_style +" . user:"+ uniqueId +" soc:music" + doc.music +" . user:"+ uniqueId +" soc:car" + doc.cars +" . user:"+ uniqueId +" soc:politic" + doc.politics +" . user:"+ uniqueId +" soc:relationships" + doc.relationships +" . user:"+ uniqueId +" soc:art_culture" + doc.art_culture +" . user:"+ uniqueId +" soc:hobbies_interests" + doc.hobbies_interests +" . user:"+ uniqueId +" soc:science_technologie" + doc.science_technologies +" . user:"+ uniqueId +" soc:computers_interne" + doc.computers_internet +" . user:"+ uniqueId +" soc:education" + doc.education +" . user:"+ uniqueId +" soc:sport" + doc.sport +" . user:"+ uniqueId +" soc:movie" + doc.movies +" . user:"+ uniqueId +" soc:travellin" + doc.travelling +" . user:"+ uniqueId +" soc:healt" + doc.health +" . user:"+ uniqueId +" soc:companies_brand" + doc.companies_brands +" . user:"+ uniqueId +" soc:mor" + doc.more +" .";
        db.query(query).execute().then(res => cb(null, res.results.bindings)).catch(err => cb(err));
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
            //not implemented
      }
}