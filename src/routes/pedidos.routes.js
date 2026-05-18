const express = require("express");
const router = express.Router();
const {
  getPedidos,
  getPedido,
  createPedido,
  updatePedido,
  deletePedido,
} = require("../controllers/pedidos.controller");

router.get("/", getPedidos);
router.get("/:id", getPedido);
router.post("/", createPedido);
router.put("/:id", updatePedido);
router.delete("/:id", deletePedido);

module.exports = router;
