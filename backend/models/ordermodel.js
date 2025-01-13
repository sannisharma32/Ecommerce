import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    item: { type: Array, required: true }, // Fixed 'require' to 'required'
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, required: true, default:'order placed' },
    PaymentMethod: { type: String, required: true },
    payment: { type: Boolean, required: true,default:false },
    date:{ type: Number, required: true }
});

// Fixed model initialization logic
const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
