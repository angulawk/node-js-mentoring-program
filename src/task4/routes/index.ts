import * as groups from "./groups";
import * as users from "./users";
import * as userGroup from "./userGroup";

export async function init({ app }) {
  await users.init({ app });
  await groups.init({ app });
  await userGroup.init({ app });
}