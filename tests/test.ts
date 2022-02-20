import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';


chai.use(chaiHttp);
const should = chai.should();

describe('/api/cache/:key', () => {
  it('should return 200 and get data by key', (done) => {
    chai.request(app)
      .get('/api/cache/test')
      .end((err, res) => {
        if (err) throw err;
        res.should.satisfy((res: Response) => res.status === 200 || res.status === 201);
        res.body.data.should.be.a('string');
        done();
      });
  })
})

describe('/api/cache/', () => {
  it('should get all cache entries', (done) => {
    chai.request(app)
      .get('/api/cache/keys')
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        res.body.data.should.be.a('array');
        done();
      })
  })
})

describe('/api/cache/:key', () => {
  it('should create or update cache entry by key', (done) => {
    chai.request(app)
      .post('/api/cache/test2')
      .end((err, res) => {
        if (err) throw err;
        res.should.satisfy((res: Response) => res.status === 200 || res.status === 201);
        res.body.data.should.be.a('string');
        done();
      })
  })
})

describe('/api/cache/:key', () => {
  it('should delete cache entry by key', (done) => {
    chai.request(app)
      .delete('/api/cache/test2')
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        done();
      })
  })
})

describe('/api/cache/', () => {
  it('should delete all keys', (done) => {
    chai.request(app)
      .delete('/api/cache/')
      .end((err, res) => {
        if (err) throw err;
        res.should.have.status(200);
        done();
      })
  })
})