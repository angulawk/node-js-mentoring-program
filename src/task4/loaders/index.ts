import dbLoader from "./db";
import expressLoader from "./express";

export default async function({ expressApp }) {
  await dbLoader();
  await expressLoader({ app: expressApp });
}
