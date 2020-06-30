"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.tryCatchWrap = exports.fromError = exports.GenericException = exports.Exception = void 0;
var Exception = /** @class */ (function () {
    function Exception(message, data, err) {
        this.message = message;
        this.data = data;
        this.err = err;
    }
    Object.defineProperty(Exception.prototype, "code", {
        get: function () {
            return this.constructor.name;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Unwrap this Exception into a JavaScript Error object.
     * @returns {Error} error
     */
    Exception.prototype.toError = function () {
        var message = this.formatErrorMessage();
        var err = new Error(message);
        var data = __assign({}, this.data);
        var code = this.code;
        Object.assign(err, { data: data, code: code });
        return err;
    };
    /**
     * Cast Exception object into a new Exception of a different type, inherting this Exception's message, data and err.
     * This is useful for rethrowing an exception carrying the same payload but is intended to be routed and/or handled differently.
     * @param {Function} ExceptionTypeConstructor the new Exception constructor
     * @returns {Exception} the new Exception
     */
    Exception.prototype.as = function (ExceptionTypeConstructor) {
        return new ExceptionTypeConstructor(this.message, this.data, this.err);
    };
    /**
     * Format the error message when mapping to a  JavaScript Error object
     * @returns {string} error message
     */
    Exception.prototype.formatErrorMessage = function () {
        return [this.code, this.message].join(': ');
    };
    return Exception;
}());
exports.Exception = Exception;
/**
 * GenericException
 */
var GenericException = /** @class */ (function (_super) {
    __extends(GenericException, _super);
    function GenericException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GenericException;
}(Exception));
exports.GenericException = GenericException;
/**
 * Wrap a JavaScript error into an GenericException
 * @param {Error} err error
 * @param {string} message message
 * @param {*} data data
 * @returns {Exception} exception
 */
function fromError(err, message, data) {
    if (message === void 0) { message = err.message; }
    return new Exception(message, data, err);
}
exports.fromError = fromError;
/**
 * Perform a try-catch on provided handler,
 * and wrap any thrown errors as
 * @param {Function} handler handler
 * @param {Function} ExceptionTypeConstructor constructor
 * @param {string} message message to associate with the thrown Exception, defaults to caught Error message
 * @param {Object} data data to associate with the thrown Exception
 * @throws {GenericException}
 * @returns {void}
 */
function tryCatchWrap(handler, ExceptionTypeConstructor, message, data) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, handler()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    if (typeof ExceptionTypeConstructor === 'undefined') {
                        throw fromError(err_1, message || err_1.message, data).as(GenericException);
                    }
                    throw fromError(err_1, message || err_1.message, data).as(ExceptionTypeConstructor);
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.tryCatchWrap = tryCatchWrap;
