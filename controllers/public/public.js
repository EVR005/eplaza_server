export const checkHealth = async (req, res) => {
  try {
    return res.status(200).send({ msg: "Healthy!" });
  } catch (err) {
    return res.status(404).send({ msg: "Health Check Unsuccessful" });
  }
};
