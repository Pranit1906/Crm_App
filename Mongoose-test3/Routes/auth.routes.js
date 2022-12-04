const express = require("express");
const authController = require("../Controllers/auth.Controller/auth.controller");
const { isAdmin } = require("../Utilis/isAdmin");
const router = express.Router();
const Validator = require('../Utilis/validatingToken');
const findAllController = require('../Controllers/auth.Controller/findAll.controller')
const updateController = require('../Controllers/auth.Controller/update.controller')
const findByIdController = require('../Controllers/auth.Controller/findById.controller')

const ticketController = require('../Controllers/ticket.controller/ticket.controller')
const ticketfindByIdController = require('../Controllers/ticket.controller/ticket.findById.controller')
const ticketupdateController = require('../Controllers/ticket.controller/ticket.update.controller')
const ticketfindAllController = require('../Controllers/ticket.controller/ticket.findAll.controller')
const statusOfTicket = require('../Utilis/validateTicketStatus')


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