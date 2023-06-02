import {chatt} from "../../models/chatBox.js"

const msg = (req, res) => {
    // if (err)
    //   res.status(500).send(err);
  alert("alo");
    const amessage = new chatt
    ({
        message:req.body.boxx,
        Fuser_id:req.session.user.id,
    })
    amessage.save()
      .then(result => {
        location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  
  };