import { config } from "dotenv";

config();

export const ENV = {
	PORT: 5000,
	NODE_ENV: "development",
	ROUTEPRE: "/api",
	...process.env,
};

const { NODE_ENV } = ENV;
export const ISDEV = NODE_ENV === "development";
