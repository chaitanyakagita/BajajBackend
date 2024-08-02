const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const user_id = "SaiChaitanyaKagita_17042003";
const email = "saichaitanya_kagita@srmap.edu.in"; 
const roll_number = "AP21110011367"; 

// POST route
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      throw new Error('Invalid input format');
    }

    const numbers = [];
    const alphabets = [];
    
    data.forEach(item => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (typeof item === 'string' && item.length === 1 && /^[a-zA-Z]$/.test(item)) {
        alphabets.push(item);
      }
    });

    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.localeCompare(a, 'en', { sensitivity: 'base' }))[0]] : [];

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_alphabet
    });
  } catch (error) {
    res.status(400).json({
      is_success: false,
      message: error.message
    });
  }
});

// GET route
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
