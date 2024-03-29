const fs = require('node:fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('dev'));

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

const getAllTours = (req, res) => {
  res.status(200).json({ status: 'success', data: { tours } });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({ status: 'success', data: { tour } });
};

const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id }, req.body);

  tours.push(newTour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(404).json({ status: 'Fail' });
      }

      res.status(201).json({ status: 'success', data: newTour });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Update tour here...>' } });
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res
    .status(204)
    .json({ status: 'success', data: { tour: '<Deleting tour here...>' } });
};

const getAllUsers = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet define' });
};
const createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet define' });
};
const getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet define' });
};
const updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet define' });
};
const deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet define' });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
