const express = require('express');

const Mthaapp = express();

Mthaapp.get('/student', (req, res) => {
  const studentInfor = {
    name: 'Mthabisi Nyathi',
    age:  23,
    class: 'E-Commerce',

  };

  res.json(studentInfor);
});

const port = 3000;

Mthaapp.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//thank you for the valued lessons