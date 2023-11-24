import { z } from 'zod';

const AddressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: 'First name must be at most 20 characters long' }),
  lastName: z
    .string()
    .max(20, { message: 'Last name must be at most 20 characters long' }),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  fullName: FullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
});

export default UserValidationSchema;
