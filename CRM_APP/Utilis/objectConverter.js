// we dont want to send all data from our db to user so we must do some mapping
// with requested data are return new array with requested data only...


exports.userResponse = (users) => {

    usersResult = [];
    users.forEach(user => {
        usersResult.push({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userTypes: user.userType,
            userStatus: user.userStatus
        });
    });
    return usersResult;

}

exports.ticketConvertor = (ticket) => {
    return {
        title: ticket.title,
        ticketPriority: ticket.ticketPriority,
        description: ticket.description,
        Status: ticket.Status,
        reporter: ticket.reporter,
        assignee: ticket.assignee,
        id: ticket._id,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt
    }
}

exports.ticketListConvertor = (tickets) => {
    let ticketResult = [];
    tickets.forEach(ticket => {
        ticketResult.push({
            title: ticket.title,
            ticketPriority: ticket.ticketPriority,
            description: ticket.description,
            Status: ticket.Status,
            reporter: ticket.reporter,
            assignee: ticket.assignee,
            id: ticket._id,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt
        })
    })
    return ticketResult;
}