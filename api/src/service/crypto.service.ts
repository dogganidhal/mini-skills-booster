import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';


@Injectable()
export class CryptoService {

	private static SALT_OR_ROUNDS = 10;

	public async hash(str: string): Promise<string> {
		return bcrypt.hash(str, CryptoService.SALT_OR_ROUNDS);
	}

	public async verify(str: string, hash: string): Promise<boolean> {
		return bcrypt.compare(str, hash);
	}

}
