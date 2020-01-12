"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var location_1 = require("./location");
var event_1 = require("./event");
exports.resolvers = {
    Query: __assign(__assign(__assign({}, user_1.UserQueries), location_1.LocationQueries), event_1.EventQueries),
    Mutation: __assign(__assign(__assign({}, user_1.UserMutations), location_1.LocationMutations), event_1.EventMutations),
    MutationResponse: {
        __resolveType: function () {
            return null;
        },
    },
};
