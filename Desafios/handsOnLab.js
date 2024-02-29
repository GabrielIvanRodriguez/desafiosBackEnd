class TicketManager{
    constructor(){
        this.events = [];

        this.numberEvents = 0;
    }

    getEvent(){
        return this.events;
    }

    addEvent( eventName, place, price, capacity =50, eventDate){

        price = price + price*0.15;

        let anEvent = {
            id: this.numberEvents +1,
            eventName,
            place,
            price,
            capacity,
            eventDate: typeof eventDate != "undefined" ? eventDate : this.#nowDate(),
            participants : [] 
        };

        this.events.push(anEvent);
        this.numberEvents++;

    }

    #nowDate(){
        const aDate = new Date();
        const day = aDate.getDate().toString().padStart(2,"0");             //le agrega 0 a la izq para que sean 2 digitos
        const month = (aDate.getMonth() +1 ).toString().padStart(2,"0");
        const year = aDate.getFullYear();
        return `${day}/${month}/${year}`;
    }

    addUser(eventID, userID){
        let findedEvent = this.events.find( anEvent => anEvent.id === eventID);
        if (findedEvent){
            let findedUser = findedEvent.participants.find( anUser => anUser.id === userID);
            if(findedUser){
                console.error(`El usuario de ID ${userID} ya se encuentra registrado en el evento`);
                return;
            }else{
                findedEvent.participants.push(userID);
                return;
            }
        }else{
            console.error(`El evento de ID ${eventID} no existe`);
            return;
        }
    }

    putOnTour(eventID, newLocation, newDate){
        let findedEvent = this.events.find( anEvent => anEvent.id === eventID);
        if(findedEvent){
            let newEvent = {
                ...findedEvent,
                id : this.numberEvents +1,
                place : newLocation,
                eventDate : newDate,
                participants : [],
            }
            this.events.push(newEvent);
            this.numberEvents++;
            return;
        }else{
            console.error(`Evento no encontrado`);
            return;
        }
    }
}

    const newListOfEvents = new TicketManager();
    console.log(newListOfEvents.events)

    console.log(newListOfEvents.getEvent());

    newListOfEvents.addEvent("Evento 1", "Lugar 1", 50);
    newListOfEvents.addEvent("Evento 2", "lugar 2", 100,30,"01/03/2024");

    console.log(newListOfEvents.getEvent());

    newListOfEvents.addUser(1,3);
    console.log(newListOfEvents.events)

    newListOfEvents.putOnTour(1,"brasil","27/02/1888");
    console.log(newListOfEvents.events)