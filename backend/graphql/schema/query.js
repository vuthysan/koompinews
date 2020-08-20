const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const User = require('../../model/User');
const News = require('../../model/News');
const Categories = require('../../model/Categories');
const JobCategories = require('../../model/JobCategories');

// =====================Type=================
const UserType = require('./Types/user');
const NewsType = require('./Types/news');
const CategoriesType = require('./Types/categories');
const JobCategoriesType = require('./Types/jobCategories');
const _ = require('lodash');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //======Get User==========
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findOne({ _id: args.id });
      },
    },
    //======Get All User ======
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },

    //==========Get a News==========
    aNews: {
      type: NewsType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return News.findOne({ _id: args.id });
      },
    },
    //=========Get all News=========
    allNews: {
      type: new GraphQLList(NewsType),
      resolve(parent, args) {
        return News.find();
      },
    },
    //======Get all Categories=========
    allCategories: {
      type: new GraphQLList(CategoriesType),
      resolve(parent, args) {
        return Categories.find();
      },
    },

    //=======Get a Categories=========
    aCategory: {
      type: CategoriesType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Categories.findOne({ _id: args.id });
      },
    },
    //=====Get a JobCategory=========
    aJobCategory: {
      type: JobCategoriesType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return JobCategories.findOne({ _id: args.id });
      },
    },
    //=====Get all JobCategories=========
    allJobCategories: {
      type: new GraphQLList(JobCategoriesType),
      resolve(parent, args) {
        return JobCategories.find();
      },
    },
  },
});

module.exports = RootQuery;
