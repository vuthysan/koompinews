const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const graphql = require('graphql');
const config = require('config');
const jwtSecret = config.get('JwtSecret');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } = graphql;

// ===============Type Section===============
const UserType = require('../schema/Types/user');
const NewsType = require('../schema/Types/news');
const CategoriesType = require('../schema/Types/categories');
const Jobtype = require('../schema/Types/jobs');

// ================Model Section ==================

const User = require('../../model/User');
const News = require('../../model/News');
const Categories = require('../../model/Categories');
const Job = require('../../model/Job');

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    //========== Register ===========
    register: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const isEmail = await User.findOne({ email: args.email });
          if (isEmail) {
            throw new Error('Email already Exist');
          }

          //bcrypt password in database
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(args.password, salt);
          let NewUser = new User({
            name: args.name,
            email: args.email,
            password: hashPassword,
          });
          return NewUser.save();
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //==========Login=============
    login: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args, context) => {
        try {
          const user = await User.findOne({ email: args.email });
          if (!user) {
            throw new Error('Email do not Exist!');
          }
          const isMatch = await bcrypt.compare(args.password, user.password);
          if (!isMatch) {
            throw new Error('invalid credentail');
          } else {
            const token = jwt.sign(
              {
                email: user.email,
                name: user.name,
                id: user.id,
              },
              jwtSecret,
              {
                expiresIn: 36000,
              }
            );
            return {
              token,
              name: user.name,
              id: user.id,
              message: 'Login successful',
            };
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    //=================Add News==============

    addNews: {
      type: NewsType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        describtion: { type: new GraphQLNonNull(GraphQLString) },
        categoriesId: { type: new GraphQLNonNull(GraphQLID) },
        newsTypeId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        tag: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const news = new News({ ...args });
          await news.save();
          return { message: 'Create new news Successful' };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    //=============Update News ==============

    updateNews: {
      type: NewsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        describtion: { type: new GraphQLNonNull(GraphQLString) },
        categoriesId: { type: new GraphQLNonNull(GraphQLID) },
        newsTypeId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        tag: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          await News.updateOne({ _id: args.id }, { ...args });
          return { message: 'Update successful' };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    //===============Delete News==================
    deleteNews: {
      type: NewsType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          await News.deleteOne({ _id: args.id }, { ...args });
          return { message: 'Delete Successful' };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
    //============Add Categories===============
    addCategories: {
      type: CategoriesType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          const categ = new Categories({ ...args });
          await categ.save();
          return { message: 'Create new Categories', show: categ.name };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    //===========Delete Categories=================
    deleteCategoires: {
      type: CategoriesType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
    },

    //==========Update Categories=============
    updateCategoies: {
      type: CategoriesType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        try {
          await Categories.updateOne({ _id: args.id }, { ...args });
          return { message: ':Update Successfull', show: args.name };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },

    //==========Add Jobs==============
    addJob: {
      type: Jobtype,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        companyId: { type: new GraphQLNonNull(GraphQLID) },
        jobCategId: { type: new GraphQLNonNull(GraphQLID) },
        position: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        salary: { type: new GraphQLNonNull(GraphQLString) },
        worktime: { type: new GraphQLNonNull(GraphQLString) },
        des: { type: new GraphQLNonNull(GraphQLString) },
        requireSkill: { type: new GraphQLNonNull(GraphQLString) },
        image: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        try {
          const job = new Job({ ...args });
          await job.save();
          return {
            message: 'Create new job',
            show: job.userId,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  },
});

module.exports = RootMutation;
