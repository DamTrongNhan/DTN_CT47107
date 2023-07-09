import mongoose from "@provider/database";
import ProductDocument from "@interfaces/model/product";

const ProductScheme = new mongoose.Schema<ProductDocument>(
  {
    smallHolderId: { type: mongoose.Schema.Types.ObjectId, ref: "SmallHolder" },
    name: { type: String },
    materials: { type: String },
    price: { type: Number },
    type: { type: String },
    avatar: { type: String },
    photos: [{ type: String }],
    description: { type: String },
    qrCode: { type: String },
  },
  { timestamps: true, collection: "Product" }
);

const ProductModel = mongoose.model("Product", ProductScheme);
export default ProductModel;
