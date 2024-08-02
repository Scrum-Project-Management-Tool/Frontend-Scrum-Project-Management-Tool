// utils.js

// Regular expression to validate MongoDB ObjectId format
export const isValidObjectId = (id) => {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
  };
  