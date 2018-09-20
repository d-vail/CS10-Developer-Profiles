const path = require('path');
const seekersRouter = require('../api/routes/Seeker.router');
const employerRouter = require('../api/routes/Employer.router');
const loginRouter = require('../api/routes/login.router');
const registerRouter = require('../api/routes/register.router');

// prettier-ignore
module.exports = {
  public: (server) => {
    server.use('/api/login', loginRouter);
    server.use('/api/register', registerRouter);
    server.get('/api', (req, res) => {
      res.set('Content-Type', 'application/json');
      res.send('{"message":"Developer Profiles API"}');
    });

    // In production build all other requests are handled by the frontend
    if (process.env.NODE_ENV === 'production') {
      server.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/lambda-in/build', 'index.html'));
      });
    }
  },
  private: (server) => {
    // This serve the Seekers (Employees) DB. It allows GET, POST, PUT and DELETE
    server.use('/api/seekers', seekersRouter);

    // This serve the Employers DB. It allows GET, POST, PUT and DELETE
    server.use('/api/employers', employerRouter);
  },
};