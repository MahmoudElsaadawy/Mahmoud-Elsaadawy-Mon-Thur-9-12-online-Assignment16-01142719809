"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleEnum = exports.ProviderEnum = exports.GenderEnum = void 0;
var GenderEnum;
(function (GenderEnum) {
    GenderEnum[GenderEnum["male"] = 0] = "male";
    GenderEnum[GenderEnum["female"] = 1] = "female";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var ProviderEnum;
(function (ProviderEnum) {
    ProviderEnum[ProviderEnum["system"] = 0] = "system";
    ProviderEnum[ProviderEnum["google"] = 1] = "google";
})(ProviderEnum || (exports.ProviderEnum = ProviderEnum = {}));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum[RoleEnum["user"] = 0] = "user";
    RoleEnum[RoleEnum["admin"] = 1] = "admin";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
