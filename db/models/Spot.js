import mongoose from "mongoose";

const { Schema } = mongoose;

const spotSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  mapURL: { type: String, required: true },
  description: { type: String, required: true },
});

const Spot = mongoose.models.Spot || mongoose.model("Spot", spotSchema);

export default Spot;
