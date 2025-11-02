import { Effect, Random } from "effect";
import { chromium, type Locator } from "playwright";

export class BrowserContext extends Effect.Service<BrowserContext>()("@buffet/src/lib/dom/BrowserContext", {
	scoped: Effect.gen(function* () {
		const browser = yield* Effect.acquireRelease(
			Effect.tryPromise(() => chromium.launch({ headless: false })),
			(browser) => Effect.promise(() => browser.close()),
		);

		const context = yield* Effect.acquireRelease(
			Effect.tryPromise(() => browser.newContext()),
			(context) => Effect.promise(() => context.close()),
		);

		const page = yield* Effect.promise(() => context.newPage());

		return { browser, context, page };
	}),
}) {}

export const naturalType = Effect.fn("@buffet/src/lib/dom/naturalType")(function* (
	locator: Locator,
	letters: string[],
) {
	return yield* Effect.forEach(letters, (letter) =>
		Effect.gen(function* () {
			const delay = yield* Random.nextIntBetween(100, 500);
			return yield* Effect.tryPromise(() => locator.pressSequentially(letter, { delay }));
		}),
	);
});
