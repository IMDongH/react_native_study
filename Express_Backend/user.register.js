var crypto = require('crypto');
const express = require('express');
const router = express.Router();

//Register
router.post('/', async function (req, res, next) {
  let body = req.body;

  if (!body.userEmail) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  let exUser = await findOne({
    where: {
        userEmail: body.userEmail
    }
  })
  if(exUser){
    res.send({
      message: "duplicate id!",
      status:'duplicate',
  });
    return;
  }

  
  const userInfo = {
    userName: body.userName,
    userPassword: body.userPassword,
    userEmail: body.userEmail,
    userAge: body.userAge,
  }
  var sql = 'INSERT INTO RNTest SET ?';

  db.query(sql, userInfo, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status:'success',
	});
});
});

//Read
router.get('/', function (req, res, next) {
  const id = req.query.id;
  //var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  models.student.findAll()
    .then(data => {
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
});

// Delete
router.delete('/:id', function (req, res, next) {
  const id = req.params.id;

  models.student.destroy({
    where: { stu_sn: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.status(500).send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
});

module.exports = router;