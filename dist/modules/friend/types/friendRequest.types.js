"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestEnum = void 0;
var FriendRequestEnum;
(function (FriendRequestEnum) {
    FriendRequestEnum[FriendRequestEnum["pending"] = 0] = "pending";
    FriendRequestEnum[FriendRequestEnum["accepted"] = 1] = "accepted";
    FriendRequestEnum[FriendRequestEnum["rejected"] = 2] = "rejected";
    FriendRequestEnum[FriendRequestEnum["canceled"] = 3] = "canceled";
})(FriendRequestEnum || (exports.FriendRequestEnum = FriendRequestEnum = {}));
