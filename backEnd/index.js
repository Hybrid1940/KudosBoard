
const express = require('express')
const app = express()
const PORT = 3000; 
const projectRoutes = require ('./routes/projectRoutes');
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.use('/tasks', projectRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to my app!')
});