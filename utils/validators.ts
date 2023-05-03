import { ValidationChain, check } from "express-validator";

const isRequired = "This field is required";

export const checkEmail = (chain: ValidationChain): ValidationChain => {
  return chain
    .exists()
    .withMessage(isRequired)
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .normalizeEmail();
};

export const checkPassword = (chain: ValidationChain): ValidationChain => {
  return chain
    .exists()
    .withMessage(isRequired)
    .bail()
    .isLength({ min: 8 })
    .withMessage("Name must be at least 8 characters");
};

export const checkName = (chain: ValidationChain): ValidationChain => {
  return checkValidName(chain)
    .bail()
    .custom((value) => {
      if (value.split(" ").length !== 1) {
        throw new Error("Single name is required");
      }
      return true;
    });
};

export const checkNumber = (
  chain: ValidationChain,
  fallback?: number
): ValidationChain => {
  return chain.customSanitizer((value) => {
    value = parseInt(value);
    if (isNaN(value)) {
      if (fallback === undefined) {
        throw new Error("Invalid number");
      }
      return fallback;
    }
    return value;
  });
};

export const checkRequiredNumber = (
  chain: ValidationChain
): ValidationChain => {
  return checkNumber(
    chain
      .exists()
      .withMessage(isRequired)
      .bail()
      .isNumeric()
      .withMessage("This field must be a number")
      .bail()
  );
};

export const checkValidName = (chain: ValidationChain): ValidationChain => {
  return chain
    .exists()
    .withMessage(isRequired)
    .bail()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters")
    .bail()
    .customSanitizer((value) => {
      const name = value.trim();
      return name.replace(/\w\S*/g, function (txt: string) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      });
    });
};
