const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    type: { type: String, default: "Otro" },
    desc: { type: String, default: "" },
    qty: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
  },
  { _id: false },
);

const pedidoSchema = new mongoose.Schema(
  {
    cliente: { type: String, required: true, trim: true },
    tel: { type: String, trim: true },
    email: { type: String, trim: true },
    instagram: { type: String, trim: true },
    fecha: { type: String, required: true },
    entrega: { type: String, trim: true },
    hora: { type: String, trim: true },
    entregaTipo: { type: String, default: "Retira en local" },
    direccion: { type: String, trim: true },
    ocasion: { type: String, default: "Cumpleaños" },
    personas: { type: Number, default: 0 },
    estado: {
      type: String,
      enum: ["pendiente", "preparacion", "listo", "completado", "cancelado"],
      default: "pendiente",
    },
    pago: {
      type: String,
      enum: ["Efectivo", "Transferencia", "Mercado Pago", "Otro"],
      default: "Efectivo",
    },
    sena: { type: Number, default: 0 },
    notas: { type: String, trim: true },
    notasInt: { type: String, trim: true },
    descuento: { type: Number, default: 0 },
    productos: [productSchema],
    total: { type: Number, default: 0 },
    totalCosto: { type: Number, default: 0 },
    ganancia: { type: Number, default: 0 },
    completadoEn: { type: Date },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Pedido", pedidoSchema);
