module.exports = {
  getBin: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;
    console.log(params);

    dbInstance
      .get_bin([params.id])
      .then(bin => res.status(200).json(bin))
      .catch(err => res.status(500).console.log(err));
  },
  //create new bin
  createBin: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, body } = req;
    console.log(req.params, req.body);
    dbInstance
      .create_bin([params.id, body.name])
      .then(() => res.status(200).json())
      .catch(() => res.status(500).json());
  },

  deleteBin: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { query } = req;
    console.log("req.queryr", req.query);
    dbInstance
      .delete_bin([req.query.bin_id])
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  },
  changeName: (req, res, next) => {
    const dbInstance = req.app.get("db");
    console.log("this", req.user);
    req.user.name = req.body.name;
    const { params, body } = req;
    console.log(params.id, body);
    dbInstance
      .change_bin_name([params.id, body.name])
      .then(() => res.status(200).json())
      .catch(err => console.log(err));
  }
};
