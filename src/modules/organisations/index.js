"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrganisationsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var OrganisationsController_1 = require("./infrastructure/http/OrganisationsController");
var AddMemberToOrganisationUseCase_1 = require("./usecases/AddMemberToOrganisationUseCase");
var CreateOrganisationUseCase_1 = require("./usecases/CreateOrganisationUseCase");
var OrganisationRepository_1 = require("./domain/OrganisationRepository");
var Organisation_1 = require("./infrastructure/db/typeorm/entities/Organisation");
var Outbox_1 = require("../../shared/infrastructure/db/typeorm/entities/Outbox");
var OrganisationCreatedMessageRelay_1 = require("./subscribers/OrganisationCreatedMessageRelay");
var OrganisationCreatedCommandHandler_1 = require("./infrastructure/rmq/OrganisationCreatedCommandHandler");
var microservices_1 = require("@nestjs/microservices");
var OrganisationsModule = /** @class */ (function () {
    function OrganisationsModule() {
    }
    OrganisationsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                microservices_1.ClientsModule.register([
                    {
                        name: 'ORGANISATION_SERVICE',
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: ['amqp://guest:guest@rabbitmq:5672'],
                            queue: 'organisation_service',
                            noAck: false,
                            queueOptions: {
                                durable: false
                            }
                        }
                    },
                ]),
                typeorm_1.TypeOrmModule.forFeature([Organisation_1.Organisation, Outbox_1.Outbox]),
            ],
            controllers: [OrganisationsController_1.OrganisationsController, OrganisationCreatedCommandHandler_1.OrganisationCreatedCommandHandler],
            providers: [
                OrganisationCreatedCommandHandler_1.OrganisationCreatedCommandHandler,
                OrganisationCreatedMessageRelay_1.OrganisationCreatedMessageRelay,
                OrganisationRepository_1.OrganisationRepository,
                AddMemberToOrganisationUseCase_1.AddMemberToOrganisationUseCase,
                CreateOrganisationUseCase_1.CreateOrganisationUseCase,
            ]
        })
    ], OrganisationsModule);
    return OrganisationsModule;
}());
exports.OrganisationsModule = OrganisationsModule;
