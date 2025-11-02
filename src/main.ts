import { Console, Duration, Effect, Random, Schedule } from "effect";
import { Link } from "@/constants.js";
import Env from "@/env.js";
import { BrowserContext } from "@/lib/dom.js";
import { isLoggedIn, login } from "@/lib/reddit.js";
import { collectMissions } from "@/lib/game.js";

const game = Effect.gen(function* () {
 	const { page } = yield* BrowserContext;

  yield* collectMissions.pipe(Effect.tap((missions) => Console.info(missions.length)));
});

const _main = Effect.gen(function* () {
	const { page } = yield* BrowserContext;

	const loggedIn = yield* isLoggedIn;
	if (!loggedIn) {
		yield* Effect.tryPromise(() => page.goto(Link.Reddit.Login));
		yield* login;
		yield* Effect.tryPromise(() => page.goto(Link.Reddit.SwordAndSupperSubreddit));
	}

	yield* game.pipe(Effect.schedule(Schedule.spaced(Duration.seconds(1))));
}).pipe(
	Effect.provide(BrowserContext.Default),
	Effect.provide(Env.Default),

	Effect.withRandom(Random.make("")),

	Effect.runPromise,
);
