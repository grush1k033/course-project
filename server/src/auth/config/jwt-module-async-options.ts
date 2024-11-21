import {JwtModuleAsyncOptions, JwtModuleOptions} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
    secret: config.get('JWT_SECRET') || "11111111111111111",
    signOptions: {
        expiresIn: config.get('JWT_EXPIRE', '5m')
    }
})
export const options = (): JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => jwtModuleOptions(config)
})