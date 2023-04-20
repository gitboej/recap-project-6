import dbConnect from "../../../../db/connect";
import Spot from "../../../../db/models/Spot";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const spot = await Spot.findById(id);

    if (!spot) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(spot);
  }

  if (request.method === "PATCH") {
    await Spot.findByIdAndUpdate(id, {
      $set: request.body,
    });
    response.status(200).json({ status: `Place ${id} updated!` });
  }

  if (request.method === "DELETE") {
    await Spot.findByIdAndDelete(id);
    response.status(200).json({ status: `Place ${id} successfully deleted.` });
  }
}
