import { User } from "../models";
import { CreateAdminUser } from "../services/user";
import log from "./log";

export const setupAdmin = async (): Promise<void> => {
  const regex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  const firstName = process.env.ADMIN_FNAME || "Zedi";
  const lastName = process.env.ADMIN_LNAME || "Admin";
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  log.debug("Setting up admin user");

  if (!(email && password)) {
    throw new Error("Missing admin credentials");
  } else if (!regex.test(email)) {
    throw new Error("Invalid admin email");
  } else if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  let admin = await User.findOne({ isAdmin: true });

  if (!admin) {
    admin = await CreateAdminUser(`${firstName} ${lastName}`, email, password);
  } else {
    let updated = false;
    const fields = [];
    if (admin.email !== email) {
      fields.push("email");
      admin.email = email;
      updated = true;
    }

    if (admin.fullName !== `${firstName} ${lastName}`) {
      fields.push("fullName");
      admin.fullName = `${firstName} ${lastName}`;
      updated = true;
    }

    if (!(await admin.checkPassword(password))) {
      fields.push("password");
      admin.setPassword(password);
      updated = true;
    }

    if (updated) {
      log.debug(`Updating admin user: ${fields.join(", ")}`);
      await admin.save();
    }
  }
};
