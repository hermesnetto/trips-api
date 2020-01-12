"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../../entity/Event");
var Location_1 = require("../../entity/Location");
var User_1 = require("../../entity/User");
exports.EventMutations = {
    createEvent: function (_root, args, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var input, manager, user, formatResponse, event, _a, _b, e_1, _c, e_2, _d, e_3, e_4;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        input = args.input;
                        manager = ctx.manager, user = ctx.user, formatResponse = ctx.formatResponse;
                        if (!user) {
                            return [2 /*return*/, formatResponse(false, 'User not logged-in!')];
                        }
                        event = new Event_1.Event();
                        event.title = input.title;
                        event.description = input.description;
                        event.maxPeopleCount = input.maxPeopleCount;
                        event.leaveDate = input.leaveDate;
                        event.returnDate = input.returnDate;
                        event.members = [];
                        if (!input.membersIDs) return [3 /*break*/, 2];
                        _a = event;
                        return [4 /*yield*/, manager.findByIds(User_1.User, input.membersIDs)];
                    case 1:
                        _a.members = _e.sent();
                        _e.label = 2;
                    case 2:
                        _e.trys.push([2, 4, , 5]);
                        _b = event;
                        return [4 /*yield*/, manager.findOneOrFail(Location_1.Location, { id: input.meetingPlaceID })];
                    case 3:
                        _b.meetingPlace = _e.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _e.sent();
                        return [2 /*return*/, formatResponse(false, "Could not find Location with (meetingPlaceID: " + input.meetingPlaceID + ")")];
                    case 5:
                        _e.trys.push([5, 7, , 8]);
                        _c = event;
                        return [4 /*yield*/, manager.findOneOrFail(Location_1.Location, { id: input.destinyID })];
                    case 6:
                        _c.destiny = _e.sent();
                        return [3 /*break*/, 8];
                    case 7:
                        e_2 = _e.sent();
                        return [2 /*return*/, formatResponse(false, "Could not find Location with (destinyID: " + input.destinyID + ")")];
                    case 8:
                        _e.trys.push([8, 10, , 11]);
                        _d = event;
                        return [4 /*yield*/, manager.findOneOrFail(User_1.User, { id: user.id })];
                    case 9:
                        _d.user = _e.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        e_3 = _e.sent();
                        return [2 /*return*/, formatResponse(false, "Could not find User with (userID: " + user.id + ")")];
                    case 11:
                        _e.trys.push([11, 13, , 14]);
                        return [4 /*yield*/, manager.save(event)];
                    case 12:
                        _e.sent();
                        return [3 /*break*/, 14];
                    case 13:
                        e_4 = _e.sent();
                        return [2 /*return*/, formatResponse(false, 'Could not save Event!')];
                    case 14: return [2 /*return*/, formatResponse(true, 'Event successfully created!', event)];
                }
            });
        });
    },
};
