import { join } from "path";
// default AutoLoad export exists but not detected for some reason
//// eslint-disable-next-line import/default
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import fp from "fastify-plugin";
import { ISDEV, ENV } from "./lib/Consts";

export type AutoLoadPluginOptions = {
	autoload: Partial<AutoloadPluginOptions>;
};

export default fp<AutoLoadPluginOptions>(async (f, opts) => {
	// This loads all plugins defined in plugins
	// those should be support plugins that are reused
	// through your application
	await f.register(AutoLoad, {
		dir: join(__dirname, "plugins"),
		options: opts.autoload,
		ignorePattern: /.*(test|spec).ts/,
	});

	// This loads all plugins defined in routes
	// define your routes in one of these
	await f.register(AutoLoad, {
		dir: join(__dirname, "routes"),
		options: { prefix: ENV.ROUTEPRE, ...opts.autoload },
		ignorePattern: /.*(test|spec).ts/,
	});
	if (ISDEV) f.log.info(f.printRoutes());
});
