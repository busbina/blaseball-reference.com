import deburr from "lodash.deburr";

export function generateSlugFromString(name) {
  return deburr(name).toLowerCase().replace(/\s/g, "-");
}
