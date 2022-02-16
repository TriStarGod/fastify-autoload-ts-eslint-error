import Fastify from "fastify";
import app from "./app";
import { ENV, ISDEV } from "./lib/Consts";

// File used to run fastify without fastify-cli (ie fastify start) and for potential ts-node integration
const f = Fastify(
	ISDEV
		? {
				logger: true,
				pluginTimeout: 20000,
				ajv: { customOptions: { coerceTypes: "array" } }, // added to turn GET params into array (ie d=10&d=12 => d=[10,12])
		  }
		: { ajv: { customOptions: { coerceTypes: "array" } } }, // added to turn GET params into array (ie d=10&d=12 => d=[10,12])
);
const { log } = f;
async function StartAsync() {
	try {
		f.register(app);
		const { PORT } = ENV;
		await f.listen(PORT);
		// await fastify.listen(PORT, "192.168.1.2");
		log.info(`fastify listening on ${PORT}`);
	} catch (ex) {
		log.error(ex);
		process.exit(1);
	}
}
process.on("SIGINT", async () => {
	log.info("stopping fastify server");
	await f.close();
	log.info("fastify server stopped");
	process.exit(0);
});

StartAsync();
export default f;
