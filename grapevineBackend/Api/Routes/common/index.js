const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { brandDescription, describesYou } = new PrismaClient();
const router = express.Router();
const {
  middleware: { asyncWrapper },
} = require('@utils');

router.get('/branddescriptions', async (req, res) =>
  asyncWrapper(brandDescription.findMany(), res)
);

router.get('/describesyou', async (req, res) =>
  asyncWrapper(describesYou.findMany(), res)
);
module.exports = router;
