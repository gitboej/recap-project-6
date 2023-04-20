import dbConnect from "../../../db/connect";
import Spot from "../../../db/models/Spot";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const spots = await Spot.find();
    return response.status(200).json(spots);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
