const express = require('express');
const { Client } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

// Render의 환경변수에서 DB 주소를 가져옵니다.
const connectionString = process.env.DATABASE_URL;

const client = new Client({
  connectionString: connectionString,
});

client.connect();

app.get('/', async (req, res) => {
  try {
    // DB에서 name이 '홍길동'인 레코드를 찾아옵니다.
    const result = await client.query('SELECT name FROM test WHERE id = 1');
    const userName = result.rows[0].name;
    
    res.send(`<h1>안녕 ${userName}</h1>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB 연결 오류 발생");
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
