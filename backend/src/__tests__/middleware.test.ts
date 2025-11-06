import { getAllUsers } from "../controllers/userController";

test("should return an array",()=>{
    expect(getAllUsers({test:"test"} as any, {} as any)).toBe({})
})