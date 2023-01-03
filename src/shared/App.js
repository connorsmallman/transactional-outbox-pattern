"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var user_1 = require("../modules/user");
var organisations_1 = require("../modules/organisations");
var typeorm_1 = require("@nestjs/typeorm");
var event_emitter_1 = require("@nestjs/event-emitter");
var OutboxSubscriber_1 = require("./infrastructure/db/typeorm/subscribers/OutboxSubscriber");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                event_emitter_1.EventEmitterModule.forRoot(),
                // NOTE: TypeORM Subscribers are injected through Nest DI and register themselves with the TypeORM datasource
                typeorm_1.TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'db',
                    port: 5432,
                    username: 'user',
                    password: 'password',
                    database: 'db',
                    entities: [__dirname + '/../**/db/typeorm/entities/*.{ts,js}'],
                    synchronize: true
                }),
                user_1.UsersModule,
                organisations_1.OrganisationsModule,
            ],
            controllers: [],
            providers: [OutboxSubscriber_1.OutboxSubscriber]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
