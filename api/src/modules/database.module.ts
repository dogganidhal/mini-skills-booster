import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {getConnectionOptions} from "typeorm";


@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useFactory: async () => ({
				...await getConnectionOptions(),
				autoLoadEntities: true,
			})
		})
	],
	exports: []
})
export class DatabaseModule {}
