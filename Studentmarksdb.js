const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://myAtlasDBUser:Spandana@myatlasclusteredu.lvqottw.mongodb.net/student';

app.get('/students/:student_Id/marks', async (req, res) => {
  const { student_Id } = req.params;
  console.log(student_Id);

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const database = client.db('student');
    const collection = database.collection('studentResults');
    
    const studentResult = await collection.findOne({ student_Id: student_Id });
    
    if (studentResult) {
      res.status(200).json(studentResult);
    } else {
      res.status(404).json({ message: 'Student marks not found' });
    }
  } catch (error) {
    console.error('Error fetching student marks:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await client.close();
  }
});
app.listen(9000, () => {
  console.log(`port 9000`);
});
