import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// Create User
const createUserToDB = async (user: TUser) => {
  if (await User.isUserExist(user?.userId)) {
    throw new Error('User already exist');
  }

  const result = await User.create(user);
  return {
    userId: result.userId,
    username: result.username,
    fullName: {
      firstName: result.fullName.firstName,
      lastName: result.fullName.lastName,
    },
    age: result.age,
    email: result.email,
    isActive: result.isActive,
    hobbies: result.hobbies,
    address: {
      street: result.address.street,
      city: result.address.city,
      country: result.address.country,
    },
  };
};

// Get Users
const getAllUser = async () => {
  const users = await User.aggregate([
    {
      $project: {
        _id: 0,
        password: 0,
        isActive: 0,
        hobbies: 0,
        orders: 0,
        fullName: {
          _id: 0,
        },
        address: {
          _id: 0,
        },
        isDeleted: 0,
        __v: 0,
      },
    },
  ]);
  return users;
};

// Retrive Specific User
const getSpecificUser = async (userId: number) => {
  if (await User.isUserExist(userId)) {
    const user = await User.findOne({ userId }).select(
      '-_id -orders -__v -fullName._id -address._id -isDeleted',
    );
    return user;
  } else {
    throw new Error('User not found');
  }
};

const updateSpecificUser = async (userId: number, userData: TUser) => {
  if (await User.isUserExist(userId)) {
    const updatedUserInfo = await User.findOneAndUpdate(
      { userId },
      { $set: userData },
      { new: true },
    ).select('-_id -orders -__v -fullName._id -address._id -isDeleted');
    return updatedUserInfo;
  } else {
    throw new Error('User not found');
  }
};

const deleteSpecificUser = async (userId: number) => {
  if (await User.isUserExist(userId)) {
    const result = await User.findOneAndUpdate(
      { userId },
      { isDeleted: true },
    ).select('isDeleted');
    if (result?.isDeleted) return null;
  } else {
    throw new Error('User not found');
  }
};

const createOrderToDB = async (userId: number, orderData: TOrder) => {
  if (await User.isUserExist(userId)) {
    const result = await User.findOneAndUpdate(
      { userId: userId },
      { $push: { orders: orderData } },
      { new: true },
    );
    return null;
  } else {
    throw new Error('User not found');
  }
};

const getOrderFromDB = async (userId: number) => {
  if (await User.isUserExist(userId)) {
    const result = await User.findOne({ userId }).select(
      '-orders._id -_id -userName -age -address -isDeleted -isActive -fullName -username -userId -password -email -hobbies -__v',
    );
    return result;
  }

  return null;
};

const getTotalPriceOfOrders = async (userId: number) => {
  if (await User.isUserExist(userId)) {
    const getUserId: any = await User.findOne({
      userId,
    }).select('_id');
    const userData = await User.aggregate([
      // Stage -1
      {
        $match: {
          _id: {
            $in: [getUserId._id],
          },
        },
      },
      // Stage - 2
      {
        $unwind: '$orders',
      },

      // Stage - 3
      // Multiply product price and quantity
      {
        $project: {
          orders: 1,
          total: {
            $multiply: ['$orders.quantity', '$orders.price'],
          },
        },
      },
      // Stage - 4
      // Sum total
      {
        $group: {
          _id: 'orders.price',
          totalPrice: {
            $sum: { $sum: '$total' },
          },
        },
      },
      //stage -5
      //  Sum Total Price
      {
        $group: {
          _id: '$_id._id',
          totalPrice: {
            $sum: { $sum: '$totalPrice' },
          },
        },
      },
      //stage -6
      //  remove _id using project
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return userData;
  } else {
    throw new Error('User not found');
  }
};

export const UserServices = {
  createUserToDB,
  getAllUser,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser,
  createOrderToDB,
  getOrderFromDB,
  getTotalPriceOfOrders,
};
