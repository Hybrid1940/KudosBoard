const express = require('express');
const {PrismaClient} = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient;

//CRUD for Boards
//prints all boards
router.get('/boards', async (req, res) => {
  const {name, category, author} = req.query;
  const filters = {};
  if(name){
    filters.name = {contains: name, mode: 'insensitive'};
  }
  if(category){
    filters.category = category;
  }
  if(author){
    filters.author = author;
  }

  try {
    const boards = await prisma.board.findMany( {
      where: filters
    });
    res.json(boards);
  } catch (error) {
    console.log(error);
  }
})
//prints 1 board
router.get('/:boardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const task = await prisma.board.findUnique({
    where:{id:parseInt(boardId)},
    include: {
        Cards:true,
    }
  });
  res.json(task);
})
//deletes board
router.delete('/:boardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId)
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(boardId) }
  }); 
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


//prints 1 boards cards
router.get('/:boardId/:cardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const cardId = parseInt(req.params.cardId);

  const board = await prisma.board.findUnique({
    where:{id:parseInt(boardId)},
    include: {
        Cards:true,
    }
  });
  const card = board.Cards.find((card) => card.id === cardId);
  res.json(card);
})

//deletes card
router.delete('/:boardId/:cardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const cardId = parseInt(req.params.cardId);

  const card = await prisma.card.delete({
    where:{
        id:parseInt(cardId),
        boardId:parseInt(boardId)
    }})
  res.json(card);
})

//updates card
router.put('/:boardId/:cardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const cardId = parseInt(req.params.cardId);
  const {name, description, likes, gif} = req.body;

  const card = await prisma.card.update({
    where:{
        id:parseInt(cardId),
        boardId:parseInt(boardId)
    },
    data: {
        name,
        description,
        likes,
        gif,
        boardId,
    }
  })
  res.json(card);
})

//post a card
router.post('/:boardId', async (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const {name, description, likes, gif, author} = req.body;

  const card = await prisma.card.create({
    data: {
        name,
        description,
        likes,
        gif,
        author,
        boardId,
    }
  })
  res.json(card);
})

module.exports = router