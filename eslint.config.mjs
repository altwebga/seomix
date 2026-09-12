import { defineConfig, globalIgnores } from "eslint/config";
import { fixupPluginRules } from "@eslint/compat";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-plugin-react (pulled in by eslint-config-next) still relies on the
// legacy `context.getFilename()`-style API that ESLint 10 removed. Patch it
// with @eslint/compat until upstream ships an ESLint 10-compatible release:
// https://github.com/jsx-eslint/eslint-plugin-react/issues (peerDeps cap at ^9.7)
function withFixedUpReactPlugin(configs) {
  return configs.map((config) =>
    config.plugins?.react
      ? {
          ...config,
          plugins: { ...config.plugins, react: fixupPluginRules(config.plugins.react) },
        }
      : config,
  );
}

const eslintConfig = defineConfig([
  ...withFixedUpReactPlugin(nextVitals),
  ...withFixedUpReactPlugin(nextTs),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Claude Code tooling (gitignored, not part of the app):
    ".claude/**",
  ]),
]);

export default eslintConfig;
