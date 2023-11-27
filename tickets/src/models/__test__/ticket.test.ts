import { Ticket } from '../ticket';

it('implements optimistic concurrency control, in other words - test version discrepancy', async () => {
    // create an instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 30,
        userId: '1',
    });
    // save the ticket to the db
    await ticket.save();
    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);
    // make two separate changes to the ticket we fetched
    firstInstance!.set({ price: 40 });
    secondInstance!.set({ price: 50 });
    // save the first fetched ticket
    await firstInstance!.save();
    // save the second fetched ticket and expect an error
    try {
        await secondInstance!.save();
    } catch (err) {
        return;
    }
    throw new Error('Should not reach this point');
});

it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 10,
        userId: '2',
    });
    await ticket.save();
    expect(ticket.version).toEqual(0);
    await ticket.save();
    expect(ticket.version).toEqual(1);
    await ticket.save();
    expect(ticket.version).toEqual(2);
});
