


export interface Credentials {
	readonly token: string;
	readonly refreshToken: string;
	readonly expiresIn: number;
}


export type ExpiryAwareCredentials = Credentials & {
  readonly expiresAt: number;
};
