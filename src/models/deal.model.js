import mongoose from "mongoose"

const dealSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    discount: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["cloud", "design", "marketing", "productivity", "analytics"],
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    whatsIncluded: {
      type: [String],
      default: [],
    },
    eligibilityRequirements: {
      type: [String],
      default: [],
    },
    logo: {
      type: String,
      default: ''
    },
    isLocked: {
      type: Boolean,
      default: false,
      index: true
    },
    validUntil: {
      type: Date,
    },
  },
  { timestamps: true }
)


const Deal = mongoose.model("Deal", dealSchema)

export default Deal
