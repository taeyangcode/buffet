import { PlatformConfigProvider } from "@effect/platform";
import { NodeFileSystem } from "@effect/platform-node";
import { Config, Effect, Layer } from "effect";

const ConfigDotEnv = Layer.unwrapEffect(
	PlatformConfigProvider.fromDotEnv(".env.local").pipe(Effect.map(Layer.setConfigProvider)),
);

export default class Env extends Effect.Service<Env>()("@buffet/src/env/Env", {
	effect: Effect.gen(function* () {
		return yield* Config.all({
			RedditUsername: Config.nonEmptyString("REDDIT_USERNAME"),
			RedditPassword: Config.nonEmptyString("REDDIT_PASSWORD"),
		});
	}).pipe(Effect.provide(Layer.provide(ConfigDotEnv, NodeFileSystem.layer))),
}) {}
