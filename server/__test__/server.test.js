const request = require("supertest");
const app = require('../app');
const { users, musics } = require('../../models');
const server = request(app);
const bcrypt = require('bcryptjs');
const ser = require('http').createServer(app);



describe('Server test', () => {
  beforeEach(async (done) => {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash("123", salt);
    await users.destroy({ where: {}, truncata: true });
    await users.create({
        name: '나무',
        email: 'knu9910@gmail.com',
        password: hashPass
      });
    done();
  });

  afterEach(done => {
    ser.close();
    done();
  });

  describe("signup test", () => {
    test("회원가입이 되지 않은 유저여야 합니다", async done => {
      const res = await server.post("/signup").send({
        name: '나무',
        email: 'knu9910@gmail.com',
        password: "123"
      });  
      expect(res.status).toEqual(409);
      expect(res.text).toEqual('already user');
      done();
    });

    test("회원이 아닌유저는 회원가입이 완료되어야 합니다", async done => {
      const res = await server.post("/signup").send({
        name: "한우",
        email: "hanu@gmail.com",
        password: "7846"
      });
      expect(res.status).toBe(201);
      done();
    });

    test("회원가입이 완료가 되면 token을 받아야 합니다", async done => {
      const res = await server.post("/signup").send({
        name: "페이커",
        email: "faker@gmail.com",
        password: "1111"
      });
      expect(res.header["set-cookie"]).toBeTruthy();
      done();
    });

    // test("회원가입시 사용자의 비밀번호는 해싱되어야 합니다", async done => {
      // await server.post("/singup").send({
        // name: "페이커",
        // email: "faker@gmail.com",
        // password: "1111"
      // });
      // const user = await users.findOne({where : {email: "faker@gmail.com"}});
      // const judge = await bcrypt.compare('1111', user.password);
      // console.log(user);
      // expect(user).toBeTruthy();
      // done();
    // });
  });

  describe("signin test", () => {
    test("회원가입이 완료된 유저여야 합니다", async done => {
      const res = await server.post("/signin").send({
        email: "ani@gmail.com",
        password: "dhejrgn3"
      });
      expect(res.status).toEqual(404);
      expect(res.text).toEqual('Nonexistent user');
      const res2 = await server.post("/signin").send({
        email: 'knu9910@gmail.com',
        password: "123"
      });
      expect(res2.status).toEqual(201);
      done();
    });

    test("로그인에 성공하면 토큰을 받아야합니다", async done => {
      await server.post("/signup").send({
        name: "한우",
        email: "hanu@gmail.com",
        password: "7846"
      });
      
      const res = await server.post("/signin").send({
        email: "hanu@gmail.com",
        password: "7846"
      });
      expect(res.header["set-cookie"]).toBeTruthy();
      done();
    });

    test("비밀번호가 틀리면 로그인이 되면 안됩니다", async done => {
      await server.post("/signup").send({
        name: "한우",
        email: "hanu@gmail.com",
        password: "7846"
      });
      
      const res = await server.post("/signin").send({
        email: "hanu@gmail.com",
        password: "784"
      });
      expect(res.status).toBe(404);
      expect(res.text).toBe("Nonexistent user");
      done();
    });
    
    // test("", async done => {
      // const res = await server.post("/signin").send({
        // email: 'knu9910@gmail.com',
        // password: "123"
      // });
      // console.log(res.body);
      // let token = res.body.token;
      // const res2 = await server.post("/musiclist").set('cookie', {'access-token' :token}).send({
          // thumnail : 'rototoo',
          // title : '아이유 에잇',
          // describetion : '아이유노래입니다',
          // video_url : 'ggjgjgiw2'
      // });
      // expect(res.status).toBe(200);
    // });
  });
});

