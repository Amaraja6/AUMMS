exports = async function(payload) {
  var body = JSON.parse(payload.body.text());
  const mongodb = context.services.get("mongodb-atlas");
  const AummsDB = mongodb.db("AummsDataBase");
  const mentors = AummsDB.collection("mentors");
  const result =
    (await mentors.count({ Email: body.Email })) +
    (await mentors.count({
      FirstName: body.FirstName,
      LastName: body.LastName,
    }));
  if (result == 0) {
    const hasInserted = await mentors.insertOne(body);
    if (hasInserted) {
      res = "Success";
    } else {
      res = "Failure";
    }
  } else {
    res = "Already";
  }
  return res;
};
