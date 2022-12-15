const express = require("express");
const authController = require("../Controller/auth.controller/auth.controller");
const { isAdmin } = require("../Utilis/isAdmin");
const router = express.Router();
const Validator = require('../Utilis/validate.Token');
const findAllController = require('../Controller/auth.Controller/findAll.controller')
const updateController = require('../Controller/auth.Controller/update.controller')
const findByIdController = require('../Controller/auth.Controller/findById.controller')

const ticketController = require('../Controller/ticket.controller/ticket.controller')
const ticketfindByIdController = require('../Controller/ticket.controller/ticket.findById.controller')
const ticketupdateController = require('../Controller/ticket.controller/ticket.update.controller')
const ticketfindAllController = require('../Controller/ticket.controller/ticket.findAll.controller')
const statusOfTicket = require('../Utilis/validateStatus')


router.post("/crm/api/v1/auth/signup", authController.signup);

router.post("/crm/api/v1/auth/login", authController.Login);

// router.get("/crm/api/v1/users", isAdmin, Validator.tokenValidation, findAllController.findAll);
router.get("/crm/api/v1/users", Validator.tokenValidation, findAllController.findAll);

router.get('/crm/api/v1/users/:userId', isAdmin, Validator.tokenValidation, findByIdController.findById);

router.put('/crm/api/v1/users/:userId', isAdmin, Validator.tokenValidation, updateController.update);

//--------------------------------------------TICKETS ROUTES--------------------------------------------------------

router.post("/crm/api/v1/tickets", Validator.tokenValidation, ticketController.createTicket);

router.get('/crm/api/v1/tickets', statusOfTicket.statusValidate, Validator.tokenValidation, ticketfindAllController.findAllTickets);

router.get('/crm/api/v1/tickets/:id', statusOfTicket.statusValidate, Validator.tokenValidation, ticketfindByIdController.ticketFindById);

router.put('/crm/api/v1/tickets/:id', statusOfTicket.statusValidate, Validator.tokenValidation, ticketupdateController.updateTicket);

module.exports = router;