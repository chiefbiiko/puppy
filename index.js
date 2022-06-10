"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
exports.__esModule = true;
exports.sleep = exports.test = exports.PDOT_EXT_BUILD_DIR = exports.PASSWORD = exports.BASE_MNEMONIC = void 0;
var test_1 = require("@playwright/test");
var path_1 = require("path");
var os_1 = require("os");
var fs_1 = require("fs");
var crypto_1 = require("crypto");
__exportStar(require("@playwright/test"), exports);
///////////////////////////////// CUSTOMIZATION ///////////////////////////////
// https://playwright.dev/docs/chrome-extensions
// https://www.petroskyriakou.com/how-to-load-a-chrome-extension-in-playwright
// https://github.com/ChainSafe/dappeteer
exports.BASE_MNEMONIC = "bottom drive obey lake curtain smoke basket hold race lonely fit walk";
exports.PASSWORD = "sesameopen";
exports.PDOT_EXT_BUILD_DIR = (0, path_1.resolve)('build');
// join(
//   homedir(),
//   ".polkadot.js-extension",
//   "packages",
//   "extension",
//   "build"
// )
if (!(0, fs_1.lstatSync)(exports.PDOT_EXT_BUILD_DIR).isDirectory()) {
    throw Error("not a dir '".concat(exports.PDOT_EXT_BUILD_DIR, "'"));
}
exports.test = test_1.test.extend({
    ctx: function (_a, use) {
        return __awaiter(this, void 0, void 0, function () {
            var cwd, ctx;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        cwd = (0, path_1.join)((0, os_1.tmpdir)(), "puppy-".concat((0, crypto_1.randomBytes)(4).toString("hex")));
                        console.debug("using pdot ext build at ".concat(exports.PDOT_EXT_BUILD_DIR));
                        console.debug("launching persistent browser context in ".concat(cwd));
                        return [4 /*yield*/, test_1.chromium.launchPersistentContext(cwd, {
                                headless: false,
                                args: [
                                    "--disable-extensions-except=".concat(exports.PDOT_EXT_BUILD_DIR),
                                    "--load-extension=".concat(exports.PDOT_EXT_BUILD_DIR),
                                ]
                            })
                            // add a 2nd page 4 pdot ext - page 0 = dapp - page 1 = pdot
                        ];
                    case 1:
                        ctx = _b.sent();
                        // add a 2nd page 4 pdot ext - page 0 = dapp - page 1 = pdot
                        return [4 /*yield*/, ctx.newPage()];
                    case 2:
                        // add a 2nd page 4 pdot ext - page 0 = dapp - page 1 = pdot
                        _b.sent();
                        return [4 /*yield*/, use(ctx)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, ctx.close()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    pdot: function (_a, use) {
        var ctx = _a.ctx;
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        p = getPdotPage(ctx);
                        p.importAccount = importAccount.bind(ctx);
                        p.connectDapp = function connectDapp() {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, p.goto(getExtUrl(ctx))];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, p.click("text=Yes, allow this application access")];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        };
                        p.confirmTransaction = function () {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/];
                                });
                            });
                        };
                        return [4 /*yield*/, passWelcomeScreen(ctx)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Promise.all([
                                importAccount(ctx, "alice", exports.PASSWORD, "".concat(exports.BASE_MNEMONIC, "//Alice"), true),
                                importAccount(ctx, "bob", exports.PASSWORD, "".concat(exports.BASE_MNEMONIC, "//Bob"), true),
                                importAccount(ctx, "charlie", exports.PASSWORD, "".concat(exports.BASE_MNEMONIC, "//Charlie"), true),
                                importAccount(ctx, "dave", exports.PASSWORD, "".concat(exports.BASE_MNEMONIC, "//Dave"), true),
                                importAccount(ctx, "eve", exports.PASSWORD, "".concat(exports.BASE_MNEMONIC, "//Eve"), true),
                                importAccount(ctx, "ferdie", exports.PASSWORD, "".concat(exports.BASE_MNEMONIC, "//Ferdie"), true),
                            ])];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, getDappPage(ctx).bringToFront()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, use(p)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    },
    dapp: function (_a, use) {
        var ctx = _a.ctx, baseURL = _a.baseURL;
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        p = getDappPage(ctx);
                        if (!baseURL) return [3 /*break*/, 2];
                        return [4 /*yield*/, p.goto(baseURL)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, use(p)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
});
///////////////////////////////////// LIB /////////////////////////////////////
function getDappPage(ctx) {
    var pages = ctx.pages();
    if (!pages.length) {
        throw Error("can't find dapp page");
    }
    return pages[0];
}
function getPdotPage(ctx) {
    var pages = ctx.pages();
    if (pages.length !== 2) {
        throw Error("can't find pdot page");
    }
    return pages[1];
}
function getExtId(ctx) {
    var id;
    for (var _i = 0, _a = ctx.backgroundPages(); _i < _a.length; _i++) {
        var bg = _a[_i];
        var url = bg.url();
        console.debug("getExtId bg.url() ".concat(url));
        if (url.includes("chrome-extension")) {
            id = url.replace(/^.+:\/\/([a-zA-Z0-9]+)\/.+$/, "$1");
        }
    }
    if (!id) {
        throw Error("can't derive ext id");
    }
    console.debug("getExtId id ".concat(id));
    return id;
}
function getExtUrl(ctx) {
    return "chrome-extension://".concat(getExtId(ctx), "/index.html");
}
function passWelcomeScreen(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var p;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    p = getPdotPage(ctx);
                    return [4 /*yield*/, p.goto(getExtUrl(ctx))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, p.click("text=Understood, let me continue")];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function importAccount(ctx, name, password, mnemonic, newPage) {
    return __awaiter(this, void 0, void 0, function () {
        var p, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!newPage) return [3 /*break*/, 2];
                    return [4 /*yield*/, ctx.newPage()];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = getPdotPage(ctx);
                    _b.label = 3;
                case 3:
                    p = _a;
                    return [4 /*yield*/, p.goto(getExtUrl(ctx))
                        // popup import via seed btn
                    ];
                case 4:
                    _b.sent();
                    // popup import via seed btn
                    return [4 /*yield*/, p.click("#root > main > div.Header-sc-di0o5f-0.kQUVYa > div > div.popupMenus > div:nth-child(1)")
                        // click import via seed btn
                    ];
                case 5:
                    // popup import via seed btn
                    _b.sent();
                    // click import via seed btn
                    return [4 /*yield*/, p.click("text=Import account from pre-existing seed")
                        // insert mnemonic
                    ];
                case 6:
                    // click import via seed btn
                    _b.sent();
                    // insert mnemonic
                    return [4 /*yield*/, p.type("#root > main > div.SeedAndPath-sc-pwhu7p-0.dGhVGc > div.Label-sc-1m5io7b-0.iRAJWc.seedInput > textarea", mnemonic)
                        // click next
                    ];
                case 7:
                    // insert mnemonic
                    _b.sent();
                    // click next
                    return [4 /*yield*/, p.click("#root > main > div.ButtonArea-sc-1254szc-0.gCQZqr > button")
                        // set account name
                    ];
                case 8:
                    // click next
                    _b.sent();
                    // set account name
                    return [4 /*yield*/, p.type("#root > main > div:nth-child(3) > div > input", name)
                        // set account password
                    ];
                case 9:
                    // set account name
                    _b.sent();
                    // set account password
                    return [4 /*yield*/, p.type("#root > main > div:nth-child(4) > div > input", password)
                        // confirm account password
                    ];
                case 10:
                    // set account password
                    _b.sent();
                    // confirm account password
                    return [4 /*yield*/, p.type("#root > main > div:nth-child(5) > div.Label-sc-1m5io7b-0.iRAJWc.InputWithLabel-sc-15f3f7q-0.elYtUe > input", password)
                        // click add account
                    ];
                case 11:
                    // confirm account password
                    _b.sent();
                    // click add account
                    return [4 /*yield*/, p.click("text=Add the account with the supplied seed")];
                case 12:
                    // click add account
                    _b.sent();
                    if (!newPage) return [3 /*break*/, 14];
                    return [4 /*yield*/, p.close()];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    });
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
exports.sleep = sleep;
