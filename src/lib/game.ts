import { Effect } from "effect";
import { BrowserContext } from "@/lib/dom.js";
import { MissionLevels, Selector } from "@/constants.js";
import type { ElementHandle } from "playwright";

const predicateMissionLevel = Effect.fn("@buffet/src/lib/game/predicateMissionLevel")(function* (mission: ElementHandle, levels: MissionLevels[]) {
})

export const collectMissions = Effect.gen(function* () {
	const { page } = yield* BrowserContext;

  const missionPosts = yield* Effect.tryPromise(() => page.$$(Selector.SwordAndSupper.PostContainer))
  const availableMissions = yield* Effect.filter(missionPosts, (post) => Effect.tryPromise(() => post.$(Selector.SwordAndSupper.StartMissionButtonImage)).pipe(
    Effect.fromNullable,
    Effect.isSuccess
  ));

  return availableMissions;
}).pipe(Effect.withSpan("@buffet/src/lib/game/collectMissions"));
