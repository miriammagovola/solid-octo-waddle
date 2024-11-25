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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const database_1 = require("./database");
const database_2 = require("./database");
// Load environment variables from .env file
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middleware to parse JSON
app.use(express_1.default.json());
// Route to get all blood pressure readings
app.get('/bloodpressure', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const results = yield ((_a = database_2.collections.bloodpressure) === null || _a === void 0 ? void 0 : _a.find({}).toArray());
        res.status(200).send(results);
    }
    catch (error) {
        res.status(500).send('Error fetching blood pressure readings');
    }
}));
// Route to add a new blood pressure reading
app.post('/bloodpressure', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const newReading = req.body;
        const result = yield ((_a = database_2.collections.bloodpressure) === null || _a === void 0 ? void 0 : _a.insertOne(newReading));
        result
            ? res.status(201).send(`Successfully created a new reading with id ${result.insertedId}`)
            : res.status(500).send('Failed to create a new reading.');
    }
    catch (error) {
        res.status(400).send('Error creating new reading');
    }
}));
// Start the server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, database_1.connectToDatabase)(process.env.MONGODB_URI || '');
        console.log(`Server running at http://localhost:3000`);
    }
    catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
}));
