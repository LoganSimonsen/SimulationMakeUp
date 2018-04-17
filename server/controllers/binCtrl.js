module.exports = {
  getBin: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .get_bin([params.id])
      .then(bin => res.status(200).json(bin))
      .catch(err => res.status(500).console.log(err));
  },
  //create new bin
  createBin: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;

    dbInstance
      .create_bin([params.id, body.name])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },

  deleteBin: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;
    console.log(params);
    dbInstance
      .delete_bin([params.id])
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  },
  changeName: (req, res, next) => {
    const dbInstance = req.app.get("db");
    // console.log("this", req.user);
    req.user.name = req.body.name;
    const { params, body } = req;
    // console.log(params.id, body);
    dbInstance
      .change_user_name([params.id, body.name])
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  }
};
