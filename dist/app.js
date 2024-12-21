"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// application routes
app.use('/api/', routes_1.default);
// api route
app.get('/', (req, res) => {
    res.json({
        status: true,
        message: 'Welcome to Blog Project API',
    });
});
// app.use(globalErrorHandler);
//Not Found
// app.use(notFound)
exports.default = app;
