import compare from "../lib/compare.js";
import {
	formatDiffTable,
	formatResultTable,
	parseDependencies,
} from "../lib/utils.js";
import { mkdir, writeFile } from "fs/promises";
import { resolve } from "path";
import { fileURLToPath } from "url";

const [
	,
	,
	caseName = "minimal",
	scenarioName = "development-build",
	baseline = "",
	current = "",
] = process.argv;

const rootDir = resolve(fileURLToPath(import.meta.url), "../..");

const isDate = (str) => str.startsWith("20");

(async () => {
	const { diff, result, baseResult } = await compare(caseName, scenarioName, {
		runs: 3,
		verboseSetup: true,
		baselineDependencies: isDate(baseline)
			? undefined
			: parseDependencies(baseline),
		baselineDate: isDate(baseline) ? baseline : undefined,
		dependencies: isDate(current) ? undefined : parseDependencies(current),
		date: isDate(current) ? current : undefined,
	});
	console.log(formatResultTable(baseResult, { colors: true, verbose: true }));
	console.log(formatResultTable(result, { colors: true, verbose: true }));
	console.log();
	console.log(formatDiffTable(diff, { colors: true, verbose: true }));
	await mkdir(resolve(rootDir, "output"), { recursive: true });
	await writeFile(
		resolve(rootDir, `output/${caseName}_${scenarioName}.json`),
		JSON.stringify(diff, null, 2)
	);
	process.exitCode = diff.stats.lowHigh < 1 || diff.stats.highLow > 1 ? 1 : 0;
})().catch((err) => {
	process.exitCode = 1;
	console.error(err.stack);
});
