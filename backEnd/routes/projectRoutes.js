const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient;

router.get('/users', async (req, res) => {
  const boards = await prisma.board.findMany()
  res.json(boards)
})

router.get('/:boardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  console.log(boardId);
  const task = await prisma.board.findUnique({
    where:{id:parseInt(boardId)}
  });
  console.log(task);
  res.json(task);
})
 
router.delete('/:boardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  console.log(boardId);
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(boardId) }
  }); 
  console.log(deletedBoard);
  res.json(deletedBoard);
})

router.post('/users', async (req, res) => {
  const { name, category, Author} = req.body;
  const nBoard = await prisma.board.create({
    data: {
      name,
      category, 
      Author
    }
  });
  res.json(nBoard);
})

module.exports = router