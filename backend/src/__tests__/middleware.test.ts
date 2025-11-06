import mongoose from "mongoose";

describe("ID Validation Logic", () => {
  it('should reject invalid ID format "123"', () => {
    expect(mongoose.isValidObjectId("123")).toBe(false);
  });

  it('should reject invalid ID "invalid-id"', () => {
    expect(mongoose.isValidObjectId("invalid-id")).toBe(false);
  });

  it("should reject empty string", () => {
    expect(mongoose.isValidObjectId("")).toBe(false);
  });

  it("should accept valid ObjectId", () => {
    const validId = new mongoose.Types.ObjectId().toString();
    expect(mongoose.isValidObjectId(validId)).toBe(true);
  });

  it("should accept valid 24-char hex string", () => {
    expect(mongoose.isValidObjectId("507f1f77bcf86cd799439011")).toBe(true);
  });
});
