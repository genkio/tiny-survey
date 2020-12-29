import { addAliases } from "module-alias";
import * as path from "path";

/**
 * Workaround for firebase deploy unable to resolve custom module path
 * https://github.com/firebase/firebase-tools/issues/986
 */
addAliases({
  "@libs/common": path.resolve(__dirname, "../../", "libs/common/dist"),
});
