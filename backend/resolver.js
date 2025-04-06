const Employee = require('./models/Employee');
const User = require('./models/User');

const resolvers = {
  Query: {
    employees: async () => await Employee.find(), 
    employee: async (_, { id }) => await Employee.findById(id),
  },
  Mutation: {
    createEmployee: async (_, args) => await new Employee(args).save(),
    updateEmployee: async (_, { id, ...args }) => await Employee.findByIdAndUpdate(id, args, { new: true }),
    deleteEmployee: async (_, { id }) => await Employee.findByIdAndDelete(id),
    
    signup: async (_, { email, password }) => {
      const existing = await User.findOne({ email });
      if (existing) {
        return { message: 'User already exists', user: null };
      }

      const user = new User({ email, password });
      await user.save();

      return { message: 'Signup successful', user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return { message: 'User not found', user: null };
      }
    
      if (user.password !== password) {
        return { message: 'Invalid password', user: null };
      }
    
      return { message: 'Login successful', user };
    }
  },
};

module.exports = resolvers;
