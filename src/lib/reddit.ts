import { Effect } from "effect";
import { Selector } from "@/constants.js";
import Env from "@/env.js";
import { BrowserContext, naturalType } from "@/lib/dom.js";

const waitForCaptcha = Effect.gen(function* () {
	const { page } = yield* BrowserContext;
	return yield* Effect.tryPromise(() =>
		page.waitForSelector(Selector.Reddit.CaptchaTitle, { state: "detached", timeout: 0 }),
	);
}).pipe(Effect.withSpan("@buffet/src/lib/reddit/waitForCaptcha"));

export const isLoggedIn = Effect.gen(function* () {
	const { page } = yield* BrowserContext;

	const loggedIn = yield* Effect.tryPromise(() => page.$(Selector.Reddit.LogInButton));
	return loggedIn !== null;
}).pipe(Effect.withSpan("@buffet/src/lib/reddit/isLoggedIn"));

export const login = Effect.gen(function* () {
	const { page } = yield* BrowserContext;

	const usernameInputLocator = page.locator(Selector.Reddit.LoginUsernameInput);
	const passwordInputLocator = page.locator(Selector.Reddit.LoginPasswordInput);
	const loginButtonLocator = page.locator(Selector.Reddit.LoginButton);

	const { RedditUsername, RedditPassword } = yield* Env;

	yield* naturalType(usernameInputLocator, RedditUsername.split(""));
	yield* naturalType(passwordInputLocator, RedditPassword.split(""));

	yield* Effect.tryPromise(() => loginButtonLocator.click());
}).pipe(Effect.withSpan("@buffet/src/lib/reddit/login"));
