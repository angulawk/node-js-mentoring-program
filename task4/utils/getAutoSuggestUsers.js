import { getUsers } from "../users";

const getAutoSuggestUsers = (loginSubstring, limit) => {
  const filteredArray = getUsers().filter(item => item.login.includes(loginSubstring));
  filteredArray
    .sort(( a, b ) => (a.login > b.login) ? 1 : ((b.login > a.login) ? -1 : 0))
    .splice(limit, filteredArray.length - 1);
  return filteredArray;
}

export default getAutoSuggestUsers;