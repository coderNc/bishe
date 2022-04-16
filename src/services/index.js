import api from "./api";

export const test = (petId) => {
  return api.get({
    url: `mock/863311/pet/${petId}`,
  });
};
