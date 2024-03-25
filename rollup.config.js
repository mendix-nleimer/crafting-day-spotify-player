import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import replace from "@rollup/plugin-replace";
import nodePolyfills from "rollup-plugin-node-polyfills";
import resolve from "@rollup/plugin-node-resolve";
import alias from " rollup-plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import { resolve as pathResolve } from "path";
import { nodeResolve } from '@rollup/plugin-node-resolve';

const removeUseClientPlugin = () => {
    return {
        name: "remove-use-client-plugin",
        transform(code, id) {
            if (id.endsWith(".js")) {
                // Remove 'use client' directive
                code = code.replace(/\/\/\s*use\s+client/g, "");
                code = code.replace("'use client';", "");
            }
            return { 
                code,
            map: {
                mappings: "removeUseClientPluginMappings"
            } };
        }
    };
};

// const fixESModuleIssue = () => {
//   // const filter = createFilter('node_modules/ketcher-core/**'); // Adjust the path accordingly

//   return {
//     name: 'fix-esmodule-issue',
//     transform(code, id) {
//       code = code.replace("Object.keys(n).forEach(function(k) {", "Object.keys(n).filter(k => k != '__esModule').forEach(function(k) {")
//       return { code };
//     },
//   };
// }

export default args => {
    const result = args.configDefaultConfig;
    console.warn("Custom roll up");

    return result.map((config, index) => {
        config.output.sourcemap = true;
        config.output.inlineDynamicImports = true;

        config.plugins = [
            resolve(),
            commonjs({
                esmExternals: true
            }),
            // babel({
            //   babelHelpers: 'bundled',
            //   exclude: 'node_modules/**',
            //   presets: [
            //     [
            //       '@babel/preset-env',
            //     ],
            //   ],
            //   plugins: ['@babel/plugin-transform-runtime'],
            // }),
            removeUseClientPlugin(),
            // fixESModuleIssue(),
            alias({
                entries: [
                    { find: "lodash", replacement: pathResolve("node_modules/lodash") },
                    { find: "file-saver", replacement: pathResolve("node_modules/file-saver/src/FileSaver.js") }
                ]
            }),
            replace({
                "process.env.NODE_ENV": JSON.stringify("development"),
                "process.env.NODE_DEBUG": JSON.stringify("http, https"),
                preventAssignment: true
            }),
            nodePolyfills(),
            ...config.plugins.filter(
                plugin => plugin !== null && plugin.name !== "babel"
            ),
            typescript({
                ...config.plugins.typescript,
                noEmitOnError: !args.watch,
                sourceMap: false,
                inlineSources: false,
                // target: "esnext",
                exclude: ["**/__tests__/**/*"]
            }),
            json(),
            nodeResolve({
                preferBuiltins: true // or false based on your preference
            })
        ];

        return config;
    });
};
