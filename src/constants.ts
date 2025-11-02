import { Schema } from "effect";

export const Link = {
	Reddit: {
		Index: "https://www.reddit.com",
		Login: "https://www.reddit.com/login",
		SwordAndSupperSubreddit: "https://www.reddit.com/r/SwordAndSupperGame/",
	},

	SwordAndSupper: {
		StartMissionButtonImage: "https://i.redd.it/3kg6d3isvyre1.png",
		Level41To60: "https://i.redd.it/pkf67cffi2af1.png",
		Level61To80: "https://i.redd.it/i436regfi2af1.png",
	},
} as const;

export const Selector = {
	Reddit: {
		CaptchaTitle: `h1:has-text("Prove your human")`,

		LogInButton: `span:has-text("Log In")`,

		LoginUsernameInput: `input[aria-labelledby="fp-input-label"][name="username"]`,
		LoginPasswordInput: `input[aria-labelledby="fp-input-label"][name="password"]`,
		LoginButton: `button[class*="login"]:has(span span:has-text("Log In"))`,
	},

	SwordAndSupper: {
		PostContainer: "article.w-full[aria-label]",

		StartMissionButtonImage: `img[src="https://i.redd.it/3kg6d3isvyre1.png"]`
	},
};

export const MissionLevels = Schema.Literal("41-60", "61-80")
export type MissionLevels = typeof MissionLevels.Type;
