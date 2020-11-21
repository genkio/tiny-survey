import { addAliases } from "module-alias";

/**
 * Workaround for firebase deploy unable to resolve custom module path
 * https://github.com/firebase/firebase-tools/issues/986
 */
addAliases({
  common: "../../../../common",
});
