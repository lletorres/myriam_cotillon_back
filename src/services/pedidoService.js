const Pedido = require("../models/Pedido");

const computeTotals = (productos = [], descuento = 0) => {
  const totalVenta = productos.reduce(
    (sum, item) => sum + (Number(item.qty) || 0) * (Number(item.price) || 0),
    0,
  );
  const totalCosto = productos.reduce(
    (sum, item) => sum + (Number(item.qty) || 0) * (Number(item.cost) || 0),
    0,
  );
  const total = totalVenta - (Number(descuento) || 0);
  const ganancia = total - totalCosto;
  return { total, totalCosto, ganancia };
};

const buildFilter = (search, estado, fecha) => {
  const filter = {};

  if (estado) {
    filter.estado = estado;
  }
  if (fecha) {
    filter.entrega = fecha;
  }
  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { cliente: regex },
      { email: regex },
      { tel: regex },
      { instagram: regex },
    ];
  }

  return filter;
};

exports.getPedidos = async (search, estado, fecha) => {
  const filter = buildFilter(search, estado, fecha);
  const pedidos = await Pedido.find(filter).sort({
    entrega: 1,
    createdAt: -1,
  });
  return pedidos;
};

exports.getPedido = async (id) => {
  const pedido = await Pedido.findById(id);
  return pedido;
};

exports.createPedido = async (data) => {
  const pedidoData = { ...data };
  const { total, totalCosto, ganancia } = computeTotals(
    pedidoData.productos,
    pedidoData.descuento,
  );
  pedidoData.total = total;
  pedidoData.totalCosto = totalCosto;
  pedidoData.ganancia = ganancia;

  if (pedidoData.estado === "completado" && !pedidoData.completadoEn) {
    pedidoData.completadoEn = new Date();
  }

  const pedido = await Pedido.create(pedidoData);
  return pedido;
};

exports.updatePedido = async (id, data) => {
  const pedidoData = { ...data };
  const { total, totalCosto, ganancia } = computeTotals(
    pedidoData.productos,
    pedidoData.descuento,
  );
  pedidoData.total = total;
  pedidoData.totalCosto = totalCosto;
  pedidoData.ganancia = ganancia;

  if (pedidoData.estado === "completado" && !pedidoData.completadoEn) {
    pedidoData.completadoEn = new Date();
  }

  const pedido = await Pedido.findByIdAndUpdate(id, pedidoData, {
    new: true,
  });
  return pedido;
};

exports.deletePedido = async (id) => {
  const pedido = await Pedido.findByIdAndDelete(id);
  return pedido;
};
