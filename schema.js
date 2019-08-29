// this is the place where all owr GraphQL stuff
// is going to go
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLID
} = require("graphql");

// import axios
const axios = require("axios");

// we are going to have two types (object types) >> launches and rockets

// Launch Type
const LaunchType = new GraphQLObjectType({
  // this is the name of our type
  name: "Launch",
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: {
      type: RocketType
    }
  })
});

const RocketType = new GraphQLObjectType({
  name: "Rocket",
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString }
  })
});

// Root Query : it is kind of endpoints that have resolvers that
// will resolve our data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    launches: {
      // this is going to be a GraphQLList of type LaunchType
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/launches")
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
          .then(res => res.data);
      }
    },
    rockets: {
      // this is going to be a GraphQLList of type LaunchType
      type: new GraphQLList(RocketType),
      async resolve(parent, args) {
        return axios
          .get("https://api.spacexdata.com/v3/rockets")
          .then(res => res.data);
      }
    },
    rocket: {
      type: RocketType,
      args: {
        rocket_id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.spacexdata.com/v3/rockets/${args.rocket_id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
//https://github.com/r-spacex/SpaceX-API
//https://docs.spacexdata.com/?version=latest
