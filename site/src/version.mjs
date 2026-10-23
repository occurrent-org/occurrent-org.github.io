// The Occurrent version the docs describe. It is read from Jekyll's _config.yml, so there is one place to bump it
// while both sites exist. When the Jekyll site is removed, the version moves into this file.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// The build runs from site/, and a path relative to this file would break once Astro bundles it.
const config = readFileSync(resolve(process.cwd(), "../_config.yml"), "utf8");
const match = config.match(/^occurrentversion:\s*(\S+)\s*$/m);
if (!match) throw new Error("No occurrentversion in _config.yml");

export const OCCURRENT_VERSION = match[1];
