const pedidoService = require("../services/pedidoService");

exports.getPedidos = async (req, res) => {
  try {
    const { search, estado, fecha } = req.query;
    const pedidos = await pedidoService.getPedidos(search, estado, fecha);
    res.json(pedidos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener pedidos", error: error.message });
  }
};

exports.getPedido = async (req, res) => {
  try {
    const pedido = await pedidoService.getPedido(req.params.id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el pedido", error: error.message });
  }
};

exports.createPedido = async (req, res) => {
  try {
    const pedido = await pedidoService.createPedido(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el pedido", error: error.message });
  }
};

exports.updatePedido = async (req, res) => {
  try {
    const pedido = await pedidoService.updatePedido(req.params.id, req.body);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el pedido", error: error.message });
  }
};

exports.deletePedido = async (req, res) => {
  try {
    const pedido = await pedidoService.deletePedido(req.params.id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el pedido", error: error.message });
  }
};
