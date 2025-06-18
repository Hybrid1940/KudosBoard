const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient;

//CRUD for Boards
//prints all boards
router.get('/boards', async (req, res) => {
  const boards = await prisma.board.findMany()
  res.json(boards)
})
//prints 1 board
router.get('/:boardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  console.log(boardId);
  const task = await prisma.board.findUnique({
    where:{id:parseInt(boardId)}
  });
  console.log(task);
  res.json(task);
})
//deletes board
router.delete('/:boardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(boardId) }
  }); 
  console.log(deletedBoard);
  res.json(deletedBoard);
})
//creates board
router.post('/boards', async (req, res) => {
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
//updates board
router.put('/:boardId', async (req, res) => {
  const id = parseInt(req.params.boardId);
  const { name, category, Author} = req.body;
  const nBoard = await prisma.board.update({
    where: { id: parseInt(id) },
    data: {
      name,
      category, 
      Author
    }
  });
  res.json(nBoard);
})

module.exports = router