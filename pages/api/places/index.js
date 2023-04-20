import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/Spot";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const spots = await Spot.find();
    return response.status(200).json(spots);
  }

  if (request.method === "POST") {
    try {
      const spotData = request.body;
      await Spot.create(spotData);

      return response.status(201).json({ status: "Place created" });
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
