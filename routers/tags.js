import express from "express";
const router = express.Router();

import { getTags} from "../controller/tags.js";

router.get("/", getTags);


export default router;
