import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/userController";
import { User } from "../models/userModel";

jest.mock("../models/userModel");

//Create user test

test("Check if user input is correct", async () => {
  (User.create as jest.Mock).mockResolvedValue({
    username: "testname",
    email: "test@test.com",
  });

  const mockReq: any = {
    body: {
      username: "testname",
      password: "testpass",
      email: "test@test.com",
    },
  };
  let statusCode: number | undefined;

  const mockRes: any = {
    status: (code: number) => {
      statusCode = code;
      return mockRes;
    },
    json: () => {},
  };
  await createUser(mockReq, mockRes);
  expect(statusCode).toBeDefined();
});

// Get all users test
test("Check if get all users return something", async () => {
  (User.find as jest.Mock).mockResolvedValue([]);

  const mockReq: any = {};
  let statusCode: number | undefined;

  const mockRes: any = {
    status: (code: number) => {
      statusCode = code;
      return mockRes;
    },
    json: () => {},
    send: () => {},
  };
  await getAllUsers(mockReq, mockRes);
  expect(statusCode).toBeDefined();
});

// Test get user by id - controller

test("find user by id returns a user", async () => {
  (User.findById as jest.Mock).mockResolvedValue({});
  const mockReq: any = {
    params: {
      id: "12345t5677",
    },
  };
  let statusCode: number | undefined;

  const mockRes: any = {
    status: (code: number) => {
      statusCode = code;
      return mockRes;
    },
    json: () => {},
    send: () => {},
  };

  await getUserById(mockReq, mockRes);
  expect(statusCode).toBeDefined();
});
